package com.ssafy.ptpt.api.studyroom.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomCreateEntryRequest {
    private Long studyRoomId;
    private List<String> nicknameList;
}
