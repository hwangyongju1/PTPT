package com.ssafy.ptpt.oauth2.service;

import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.oauth2.dto.*;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    public CustomOAuth2UserService(MemberRepository memberRepository) {

        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("oAuth2User = " + oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        System.out.println("registrationId = " + registrationId);
        OAuth2Response oAuth2Response;
        Map<String, String> profile = Map.of();
        if (registrationId.equals("kakao")) {
            System.out.println("카카오 로그인 요청");
            profile = new KakaoResponse(oAuth2User.getAttributes()).getProfile();
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());

            System.out.println("profile = " + profile);
            System.out.println("oAuth2Response = " + oAuth2Response);
        }
        else if (registrationId.equals("google")) {

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
            System.out.println("google oAuth2Response = " + oAuth2Response);
        }
        else {
            return null;
        }

        String oauthId = "";
        String provider, providerId, name;

        if(registrationId.equals("kakao")){
            provider = "kakao";
            providerId = oAuth2User.getName();
            name = profile.get("nickname");
        }else{
            provider = oAuth2Response.getProvider();
            providerId = oAuth2Response.getProviderId();
            name = oAuth2Response.getName();
        }

        oauthId = switch (registrationId) {
            case "google" -> "G";
            case "kakao" -> "K";
            default -> throw new IllegalArgumentException("지원하지 않는 제공자입니다: " + provider);
        };

        oauthId += providerId ;
        String username = provider +" "+ providerId;
        System.out.println("oauthId = " + oauthId);

        Member existData = memberRepository.findByOauthId(oauthId);
        if (existData == null) {
            System.out.println("신규 회원");
            Member member = new Member(oauthId, username, name, "ROLE_USER");
            memberRepository.save(member);

            MemberDto memberDto = new MemberDto(oauthId, username, name, "ROLE_USER");

            return new CustomOAuth2User(memberDto);
        }
        else {
            System.out.println("기존 회원");
//            existData.setOauthEmail(oAuth2Response.getEmail());

            memberRepository.save(existData);

            MemberDto memberDto = new MemberDto(oauthId, username, name, "ROLE_USER");

            return new CustomOAuth2User(memberDto);
        }
    }
}