package com.ssafy.ptpt.api.evaluation.response;

import com.ssafy.ptpt.db.jpa.entity.Comment;
import com.ssafy.ptpt.db.jpa.entity.Evaluation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedBackInfoResponse {

    private Long evaluationId;
    private Long studyRoomId;
    private String oauthId;
    private int delivery;
    private int expression;
    private int preparation;
    private int logic;
    private int suitability;
    private String commentContent;
    private String nickname;
    private int anonymity;

    public static FeedBackInfoResponse from(Evaluation evaluation, Comment comment) {
        FeedBackInfoResponse feedBackInfoResponse = new FeedBackInfoResponse();
        feedBackInfoResponse.evaluationId = evaluation.getEvaluationId();
        feedBackInfoResponse.studyRoomId = evaluation.getStudyRoom().getStudyRoomId();
        feedBackInfoResponse.oauthId = evaluation.getMember().getOauthId();
        feedBackInfoResponse.delivery = evaluation.getDelivery();
        feedBackInfoResponse.expression = evaluation.getExpression();
        feedBackInfoResponse.preparation = evaluation.getPreparation();
        feedBackInfoResponse.logic = evaluation.getLogic();
        feedBackInfoResponse.suitability = evaluation.getSuitability();
        feedBackInfoResponse.commentContent = comment.getCommentContent();
        feedBackInfoResponse.nickname = comment.getEvaluation().getMember().getNickname();
        feedBackInfoResponse.anonymity = comment.getAnonymity();

        return feedBackInfoResponse;
    }
}
