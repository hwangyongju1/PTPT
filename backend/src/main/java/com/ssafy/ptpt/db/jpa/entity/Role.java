//package com.ssafy.ptpt.db.jpa.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.springframework.boot.autoconfigure.domain.EntityScan;
//
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@EntityScan
//public class Role {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long roleId;
//
//    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "member_id")
//    private Member member;
//
//    private String roleType = "common";
//
//    public Role(Member member) {
//        this.member = member;
//    }
//}
