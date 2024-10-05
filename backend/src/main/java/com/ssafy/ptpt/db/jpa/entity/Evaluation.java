package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evaluation_id")
    private Long evaluationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_room_id")
    private StudyRoom studyRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statistic_id")
    private Statistic statistic;

    @OneToOne(mappedBy = "evaluation", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;

    // 평가를 받은사람
    private String nickname;

    public Evaluation(StudyRoom studyRoom, int delivery, int expression, int preparation, int logic, int suitability, String nickname, Member member, Statistic statistic) {
        this.studyRoom = studyRoom;
        this.delivery = delivery;
        this.expression = expression;
        this.preparation = preparation;
        this.logic = logic;
        this.suitability = suitability;
        this.nickname = nickname;
        this.member = member;
        this.statistic = statistic;
    }

    public Evaluation(StudyRoom studyRoom, Statistic statistic, Member member, int delivery, int expression, int preparation, int logic, int suitability, String nickname) {
        this.studyRoom = studyRoom;
        this.statistic = statistic;
        this.member = member;
        this.delivery = delivery;
        this.expression = expression;
        this.preparation = preparation;
        this.logic = logic;
        this.suitability = suitability;
        this.nickname = nickname;
        this.comment = new Comment(this);
    }
}
