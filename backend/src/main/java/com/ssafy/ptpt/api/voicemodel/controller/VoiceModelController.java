package com.ssafy.ptpt.api.voicemodel.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.ptpt.api.voicemodel.service.VoiceModelService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/voiceModel")
@RequiredArgsConstructor
public class VoiceModelController {

    @Value("${external.api.train}")
    private String externalApiTrain;

    // 추후 설정파일로 이동 및 경로 변경 필!
    @Value("${audioFile.path}")
    private String UPLOAD_PATH;
    private final VoiceModelService voiceModelService;

    @Value("${audioFile.preTrain}")
    private String PRETRAIN_UPLOAD_PATH;

    @PostMapping("/audio")
    @Operation(summary = "음성 변환")
    public Mono<ResponseEntity<String>> getTtsVoice(
            @RequestPart(name = "audio") MultipartFile audio,
            @RequestPart(name = "fileName") String fileName
    )throws IOException {
        if (audio.isEmpty()) {
            return Mono.just(ResponseEntity.badRequest().body("파일이 비어있습니다."));
        }

        // 업로드 폴더 설정
        String today = new SimpleDateFormat("yyMMdd").format(new Date());
        String saveFolder = UPLOAD_PATH + File.separator + today;
        File folder = new File(saveFolder);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // 파일 저장
        String originalFileName = audio.getOriginalFilename();
        String saveFileName = UUID.randomUUID() + originalFileName.substring(originalFileName.lastIndexOf('.'));
        String ttsPath = saveFolder + File.separator + saveFileName;
        audio.transferTo(new File(folder, saveFileName));

        // 비동기 처리 및 체이닝된 메서드 호출
        System.out.println(ttsPath);
        return voiceModelService.processVoiceConversion(fileName, ttsPath)
                .map(response -> {
                    System.out.println("base64 응답 성공!");
                    System.out.println(response);
                    return ResponseEntity.ok(response); // response가 일케 옴
                })
                .onErrorResume(error -> {
                    System.err.println("오류: " + error.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다."));
                });
    }

    @PostMapping("/train")
    @Operation(summary = "음성모델 생성", description = "음성모델을 학습하여 생성합니다. 학습 전 데이터 저장 경로: src\\preTrain\\ [OauthId], 생성된 음성모델 저장 경로: RVC1006Nvidia\\assets\\weights\\vm[OauthId].pth")
    public Mono<ResponseEntity<String>> voiceModelTrain(@RequestPart(name="audio") MultipartFile audio, @RequestPart(name="oauthId") String oauthId) throws IOException {
        if (audio.isEmpty()) {
            return Mono.just(ResponseEntity.badRequest().body("파일이 비어있습니다."));
        }

        // 1. 원본 파일 (PRETRAIN DATA) 저장
        String saveFolder = PRETRAIN_UPLOAD_PATH + File.separator + oauthId;
        File folder = new File(saveFolder);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String saveFileName = "preTrainAudio.mp3";
        File originalFile = new File(folder, saveFileName);
        String voicePath = saveFolder + File.separator + saveFileName;
        audio.transferTo(originalFile);
        System.out.println(voicePath);

        return voiceModelService.processTraining("vm" + oauthId, voicePath)
                .map(response -> {
                    System.out.println("음성모델 생성!");
                    System.out.println(response);
                    voiceModelService.updateVoiceModelCreated(oauthId);
                    return ResponseEntity.ok(response);
                })
                .onErrorResume(error -> {
                    System.err.println("오류: " + error.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다."));
                });
    }
}
