package com.ssafy.ptpt.oauth2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private String role;
    private String name;
    private String username;
    private String oauthId;
    private String nickname;

    public MemberDto(String oauthId, String username, String name, String role) {
        this.oauthId = oauthId;
        this.username = username;
        this.name = name;
        this.role = role;
    }

}
