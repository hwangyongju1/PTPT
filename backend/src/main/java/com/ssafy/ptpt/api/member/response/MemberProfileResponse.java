package com.ssafy.ptpt.api.member.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponse {

    private String nickname;
    private String memberPicture;
    private Long profileId;
    private Long memberId;
    private Long statisticId;
    private Long presetId;
    private int voiceModelCreated;
}
