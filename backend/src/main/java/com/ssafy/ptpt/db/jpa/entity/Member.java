package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    private String nickname;
    private String memberPicture;
    private String oauthProvider;

    private String name;
    private String username;
    @Column(name = "oauth_id", nullable = false, unique = true)
    private String oauthId;
    private String oauthEmail;
    private Timestamp registerTime;
    private int isWithdraw;
    private Timestamp withdrawTime;

    private int memberReportCount;

    private int voiceModelCreated;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Profile profile;

//    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Role role;
    private String role;

    @OneToMany(mappedBy = "member")
    private List<Evaluation> evaluation;

    public Member(String oauthId) {
        this.oauthId = oauthId;
        this.profile = new Profile(this);
    }

    public Member(String nickname, String memberPicture, String oauthProvider, String oauthId, String oauthEmail, Timestamp registerTime, int isWithdraw, Timestamp withdrawTime) {
        this.nickname = nickname;
        this.memberPicture = memberPicture;
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.oauthEmail = oauthEmail;
        this.registerTime = registerTime;
        this.isWithdraw = isWithdraw;
        this.withdrawTime = withdrawTime;
        this.profile = new Profile(this);
    }

    public Member(String oauthId, String username, String name, String roleType) {
        this.oauthId = oauthId;
        this.username = username;
        this.name = name;
        this.role = roleType;
        this.profile = new Profile(this);
    }

    // 탈퇴여부가 1이면 정지회원
    // 0이면 일반 회원
    // 사용자 탈퇴여부 변경 로직
    public void memberReport() {
        this.isWithdraw = (this.isWithdraw + 1)%2;
        this.memberReportCount = 0;
    }

    public void memberReportCount(int memberReportCount) {
        this.memberReportCount = ++memberReportCount;
    }
}
