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
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "evaluation_id")
    private Evaluation evaluation;

    // 평가를 당한사람
    private String nickname;

    private String commentContent;

    private int anonymity;

    public Comment(Evaluation evaluation, String nickname, String commentContent, int anonymity) {
        this.evaluation = evaluation;
        this.nickname = nickname;
        this.commentContent = commentContent;
        this.anonymity = anonymity;
    }

    public Comment(Evaluation evaluation) {
        this.evaluation = evaluation;
    }
}
