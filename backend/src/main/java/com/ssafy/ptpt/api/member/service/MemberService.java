package com.ssafy.ptpt.api.member.service;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ptpt.api.member.request.MemberNicknameRequest;
import com.ssafy.ptpt.api.member.request.MemberOauthIdRequest;
import com.ssafy.ptpt.api.member.request.MemberUpdateRequest;
import com.ssafy.ptpt.api.member.response.MemberProfileResponse;
import com.ssafy.ptpt.api.member.response.MemberStatisticResponse;
import com.ssafy.ptpt.db.jpa.entity.*;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.db.jpa.repository.StatisticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final JPAQueryFactory jpaQueryFactory;
    private final StatisticRepository statisticRepository;

    public Member saveMember(String oauthId){
        Member member = memberRepository.findByOauthId(oauthId);
        if (member == null) {
            member = new Member(oauthId);
            return memberRepository.save(member);
        }
        return member;
    }

//    public void saveProfile(Member member){
//        Profile profile = new Profile(member);
//        profileRepository.save(profile);
//    }

    // 보이스 모델 ID를 추가해야 하는 로직
    public MemberProfileResponse findMemberProfile(String oauthId) {
        QMember qmember = QMember.member;
        QProfile profile = QProfile.profile;
        Member member = memberRepository.findByOauthId(oauthId);
        return jpaQueryFactory.select(
                        Projections.bean(
                                MemberProfileResponse.class,
                                qmember.nickname,
                                qmember.memberPicture,
                                qmember.profile.profileId,
                                profile.member.memberId,
                                profile.statistic.statisticId,
                                qmember.voiceModelCreated))
                .from(qmember)
                .leftJoin(qmember.profile, profile)
                .where(qmember.memberId.eq(member.getMemberId()))
                .fetchOne();
    }

    // 사용자 탈퇴 기능
    public int withdrawMember(MemberOauthIdRequest memberOauthIdRequest) {
        return memberRepository.deleteMemberByOauthId(memberOauthIdRequest.getOauthId());
    }

    // 사용자 정보 수정 기능
    public int modifyMemberInfo(MemberUpdateRequest memberUpdateRequest) {

        System.out.println(memberUpdateRequest.getMemberPicture());
        System.out.println(memberUpdateRequest.getNickname());
        System.out.println(memberUpdateRequest.getOauthId());
        System.out.println("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
        Member existingMember = memberRepository.findByOauthId(memberUpdateRequest.getOauthId());

        System.out.println(existingMember);
        if (memberUpdateRequest.getNickname() != null) {
            existingMember.setNickname(memberUpdateRequest.getNickname());
        }

        if (memberUpdateRequest.getMemberPicture() != null) {
            existingMember.setMemberPicture(memberUpdateRequest.getMemberPicture());
        }

        return memberRepository.modifyMemberInfo(existingMember.getOauthId(),
                existingMember.getNickname(),
                existingMember.getMemberPicture());
    }

    // 사용자 신고횟수 조회 로직 추가
    public void memberReport(MemberNicknameRequest memberNicknameRequest) {
        Member member = memberRepository.findByNickname(memberNicknameRequest.getNickname());
        int memberReportCount = member.getMemberReportCount();
        if (memberReportCount == 2) {
            // 사용자 정지기능 추가
            member.memberReport();
        }else{
            member.memberReportCount(memberReportCount);
        }
    }

    public Member nicknameDuplicateCheck(String nickname) {
        return memberRepository.findByNickname(nickname);
    }

    public MemberStatisticResponse findMemberStatistic(MemberOauthIdRequest MemberOauthIdRequest) {
        Statistic statistic = statisticRepository.findByOauthId(MemberOauthIdRequest.getOauthId());
        if (statistic == null) {
            throw new RuntimeException("Statistic not found for oauthId: " + MemberOauthIdRequest.getOauthId());
        }
        return MemberStatisticResponse.from(statistic);
    }

}
