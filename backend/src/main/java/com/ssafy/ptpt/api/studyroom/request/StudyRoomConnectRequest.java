package com.ssafy.ptpt.api.studyroom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomConnectRequest {
    private Long studyRoomId;
    private String studyRoomPw;
}
