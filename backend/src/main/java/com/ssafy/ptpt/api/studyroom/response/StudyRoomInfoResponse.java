package com.ssafy.ptpt.api.studyroom.response;

import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomInfoResponse {
    private Long studyRoomId;
    private String studyRoomTitle;
    private String subject;

    // 호스트 닉네임
    private String hostNickname;

    private String presentationTime;

    public static StudyRoomInfoResponse from(StudyRoom studyRoom, String hostNickname){
        StudyRoomInfoResponse studyRoomInfoResponse = new StudyRoomInfoResponse();
        studyRoomInfoResponse.studyRoomId = studyRoom.getStudyRoomId();
        studyRoomInfoResponse.studyRoomTitle = studyRoom.getStudyRoomTitle();
        studyRoomInfoResponse.subject = studyRoom.getSubject();
        studyRoomInfoResponse.hostNickname = hostNickname;
        studyRoomInfoResponse.presentationTime = studyRoom.getPresentationTime();

        return studyRoomInfoResponse;
    }
}
