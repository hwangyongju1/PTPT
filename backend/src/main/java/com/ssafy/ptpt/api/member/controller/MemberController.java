package com.ssafy.ptpt.api.member.controller;

import com.ssafy.ptpt.api.member.request.MemberNicknameRequest;
import com.ssafy.ptpt.api.member.request.MemberOauthIdRequest;
import com.ssafy.ptpt.api.member.request.MemberUpdateRequest;
import com.ssafy.ptpt.api.member.response.MemberInfoResponse;
import com.ssafy.ptpt.api.member.response.MemberProfileResponse;
import com.ssafy.ptpt.api.member.response.MemberStatisticResponse;
import com.ssafy.ptpt.api.member.service.MemberService;
import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.oauth2.dto.CustomOAuth2User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @Value("${imageFile.path}")
    private String IMAGE_UPLOAD_PATH;

    // TODO : 테스팅 해보기
    @GetMapping("/signout")
    public ResponseEntity<Void> getUserInfo(HttpServletResponse response) {
        Cookie cookie = new Cookie("Authorization", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/kakao")
    public ResponseEntity<?> kakaoAuthVerify() {
        System.out.println("");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증이 되어 있지 않거나 인증 객체가 null인 경우
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 인증된 사용자 정보 가져오기
        Object principal = authentication.getPrincipal();
        MemberInfoResponse userInfoResponse;

        UserDetails userDetails = null;
        if (principal instanceof UserDetails) {
            userDetails = (UserDetails) principal;
            // UserDetails에서 사용자 정보를 가져와서 Response 객체에 담기
            userInfoResponse = new MemberInfoResponse(userDetails.getUsername());
        } else {
            // 인증된 사용자 정보가 UserDetails 타입이 아닌 경우 처리
            userInfoResponse = new MemberInfoResponse(userDetails.getUsername());
        }

        return ResponseEntity.ok(userInfoResponse);
    }



    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @DeleteMapping("/withdraw")
    @Operation(summary = "회원 탈퇴")
    public ResponseEntity<Void> withdrawMember(@RequestBody @Valid MemberOauthIdRequest memberOauthIdRequest){
        int complete = memberService.withdrawMember(memberOauthIdRequest);
        return complete == 1 ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PutMapping("/modify")
    @Operation(
            summary = "회원 정보 수정",
            description = "이미지 파일은 API주소/member_picture 에 맵핑됩니다.",
            responses = {
                    @ApiResponse(responseCode = "200",
                            description = "수정 성공"),
                    @ApiResponse(responseCode = "401",
                            description = "수정 실패")
            })
    public ResponseEntity<MemberUpdateRequest> modifyMemberInfo(@RequestPart(name = "memberUpdateRequest") MemberUpdateRequest memberUpdateRequest,
                                                                @RequestPart(name = "image", required = false) MultipartFile image) throws IOException {

//        String oauthId = "";
//        // 현재 인증된 사용자 정보 가져오기
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() instanceof CustomOAuth2User) {
//            CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//            String currentUsername = customOAuth2User.getUsername();
//            System.out.println("현재 사용자: " + currentUsername);
//            oauthId = customOAuth2User.getOauthId();
//            memberUpdateRequest.setOauthId(oauthId);
//
//            Member member = memberRepository.findByOauthId(oauthId);
//            member.setOauthId(oauthId);
//            member.setNickname(memberUpdateRequest.getNickname());
//            member.setMemberPicture(memberUpdateRequest.getMemberPicture());
//
//        } else {
//            System.out.println("인증 정보가 없습니다.");
//            return ResponseEntity.badRequest().build();
//        }


        // 이미지파일 입력이 있을 경우 이미지를 서버에 저장
        if(image != null && !image.isEmpty()){
            String saveFolder = IMAGE_UPLOAD_PATH;
            File folder = new File(saveFolder);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            String originalFileName = image.getOriginalFilename();
            String saveFileName = memberUpdateRequest.getOauthId() + originalFileName.substring(originalFileName.lastIndexOf('.'));
            File originalFile = new File(folder, saveFileName);
            image.transferTo(originalFile);

            // 웹 서버에서 접근할 수 있는 경로를 memberUpdateRequest에 저장
            String imageUrl = "/profileImage/" + saveFileName;
            memberUpdateRequest.setMemberPicture(imageUrl);
        }



        int complete = memberService.modifyMemberInfo(memberUpdateRequest);
        return complete == 1 ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }


    // 프로필 조회
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/profile")
    @Operation(summary = "프로필 조회")
    public ResponseEntity<MemberProfileResponse> findUserProfile(@RequestBody @Valid MemberOauthIdRequest memberOauthIdRequest) {
        MemberProfileResponse memberProfile = memberService.findMemberProfile(memberOauthIdRequest.getOauthId());
        return ResponseEntity.ok().body(memberProfile);
    }


    /**
     * 사용자 신고기능
     * 사용작의 정보를 조회하여
     * 신고횟수 확인 후
     * 3회 일시 정지
     * else 신고횟수 누적++
     *
     */
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/report")
    @Operation(summary = "유저 신고")
    public ResponseEntity<Void> memberReport(@RequestBody @Valid MemberNicknameRequest memberNicknameRequest) {
        memberService.memberReport(memberNicknameRequest);
        return ResponseEntity.ok().build();
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @GetMapping("/{nickname}")
    @Operation(summary = "닉네임 중복 체크")
    public ResponseEntity<String> nicknameDuplicateCheck(@PathVariable("nickname") String nickname) {
        return (memberService.nicknameDuplicateCheck(nickname) == null)
                ? ResponseEntity.ok().body("입력한 닉네임 사용 가능.")
                : ResponseEntity.badRequest().body("입력한 닉네임이 이미 사용 중입니다.");
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/statistic")
    @Operation(summary = "프로필 화면에서 통계를 조회할수 있습니다")
    public ResponseEntity<MemberStatisticResponse> findMemberStatistic(@RequestBody @Valid MemberOauthIdRequest memberOauthIdRequest) {
        MemberStatisticResponse memberStatisticResponse = memberService.findMemberStatistic(memberOauthIdRequest);
        return ResponseEntity.ok().body(memberStatisticResponse);
    }

}
