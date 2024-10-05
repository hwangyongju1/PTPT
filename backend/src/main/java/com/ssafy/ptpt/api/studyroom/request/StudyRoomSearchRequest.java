package com.ssafy.ptpt.api.studyroom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomSearchRequest {

    // 방제목 검색
    private String StudyRoomName;
}
