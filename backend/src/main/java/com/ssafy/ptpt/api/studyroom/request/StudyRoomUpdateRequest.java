package com.ssafy.ptpt.api.studyroom.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomUpdateRequest {

    // 방 이름
    @NotBlank(message = "이름은 필수")
    private String studyRoomTitle;

    private int isPublic;

    private String studyRoomPw;
    private String presentationTime;
    private String subject;
    private String description;

    // 익명여부
    private int anonymity;


}
