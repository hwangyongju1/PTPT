package com.ssafy.ptpt.oauth2.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final MemberDto memberDto;

    public CustomOAuth2User(MemberDto memberDto) {

        this.memberDto = memberDto;
    }

    @Override
    public Map<String, Object> getAttributes() {

        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add((GrantedAuthority) memberDto::getRole);

        return collection;
    }

    @Override
    public String getName() {

        return memberDto.getName();
    }

    public String getUsername() {

        return memberDto.getUsername();
    }

    public String getOauthId(){
        return memberDto.getOauthId();
    }
}