package com.ssafy.ptpt.api.member.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponse {

    private Long memberId;
    private Long studyRoomId;
    private String nickName;
    private String memberPicture;
    private String oauthProvider;
    private String oauthId;
    private LocalDateTime registerTime;
    private String isWithDraw;
    private String withDrawTime;


    public MemberInfoResponse(String username) {
    }
}
