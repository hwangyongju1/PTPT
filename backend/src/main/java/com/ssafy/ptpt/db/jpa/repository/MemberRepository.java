package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByOauthId(String oauthId);
    int deleteMemberByOauthId(String oauthId);
    Member findByNickname(String nickname);

    @Modifying
    @Query("UPDATE Member m SET m.nickname = :nickname, m.memberPicture = :memberPicture  WHERE m.oauthId = :oauthId")
    int modifyMemberInfo(@Param("oauthId") String oauthId, @Param("nickname") String nickname, @Param("memberPicture") String memberPicture);

}