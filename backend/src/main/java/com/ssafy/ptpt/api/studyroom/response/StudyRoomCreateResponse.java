package com.ssafy.ptpt.api.studyroom.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoomCreateResponse {

    // 방 고유 번호
    private Long StudyRoomId;

    // 참가자
    private Long memberId;
}
