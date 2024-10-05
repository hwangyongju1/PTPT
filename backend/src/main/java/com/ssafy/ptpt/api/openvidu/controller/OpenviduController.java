package com.ssafy.ptpt.api.openvidu.controller;
import java.util.Map;

import javax.annotation.PostConstruct;

import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class OpenviduController {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private String OPENVIDU_RECORD_RESOLUTION = "640x480";
    private int OPENVIDU_RECORD_FRAME_RATE = 24;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        RecordingProperties recordingProperties = new RecordingProperties.Builder()
                .outputMode(Recording.OutputMode.COMPOSED)
                .resolution(OPENVIDU_RECORD_RESOLUTION)
                .frameRate(OPENVIDU_RECORD_FRAME_RATE)
                .build();

        SessionProperties properties = SessionProperties
                .fromJson(params)
                .recordingMode(RecordingMode.MANUAL)
                .defaultRecordingProperties(recordingProperties)
                .build();
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
    
    //TODO: 누군가 엔드포인트를 안다면 방 구성원이 아님에도 녹화 시작 및 종료가 가능한 문제가 있음
    
    @PostMapping("/api/recording/start")
    public ResponseEntity<String> startRecording(@RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        RecordingProperties properties = new RecordingProperties.Builder() //session을 만들때 정의한 속성을 여기서 재정의 할 수 있다.
                .hasAudio(true)
                .hasVideo(true)
                .build();
        Recording recording = openvidu.startRecording((String)params.get("session"), properties);
        return new ResponseEntity<>(recording.getId(), HttpStatus.OK);
    }
    
    @PostMapping("/api/recording/stop")
    public ResponseEntity<?> stopRecording(@RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionId = (String)params.get("recording");
        System.out.println(sessionId);

        Recording recording = openvidu.stopRecording(sessionId);

        return new ResponseEntity<>(recording, HttpStatus.OK);
    }

    @GetMapping("/api/recording/get/{recordingId}")
    public ResponseEntity<?> getRecording(@PathVariable(value = "recordingId") String recordingId) throws OpenViduJavaClientException, OpenViduHttpException {
        Recording recording = openvidu.getRecording(recordingId);
        return new ResponseEntity<>(recording, HttpStatus.OK);
    }

}
