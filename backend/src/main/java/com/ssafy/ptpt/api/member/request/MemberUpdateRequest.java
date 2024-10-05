package com.ssafy.ptpt.api.member.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequest {

    private String oauthId;
    private String nickname;
    private String memberPicture;
}
