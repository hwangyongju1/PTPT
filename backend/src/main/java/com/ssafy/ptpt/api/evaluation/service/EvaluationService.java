package com.ssafy.ptpt.api.evaluation.service;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
import com.ssafy.ptpt.api.evaluation.request.FeedBackSearchRequest;
import com.ssafy.ptpt.api.evaluation.response.FeedBackInfoResponse;
import com.ssafy.ptpt.db.jpa.entity.*;
import com.ssafy.ptpt.db.jpa.repository.*;
import com.ssafy.ptpt.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EvaluationService {
    private final EvaluationRepository evaluationRepository;
    private final StatisticRepository statisticRepository;
    private final EntryListRepository entryListRepository;
    private final JPAQueryFactory jpaQueryFactory;
    //test
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    // 평가 등록
    @Transactional
    public Long createEvaluation(EvaluationCreateRequest evaluationCreateRequest) {
        // 발표한 사람의 정보를 알아야함
        Member slave = memberRepository.findByNickname(evaluationCreateRequest.getSlave());
        Statistic slaveStatistic = slave.getProfile().getStatistic();

        // 현재 사용자가 참가중인 스터디 방을 알아야지 어떻게? 참가자 리스트를 확인해서
        // 스터디 룸이 종료가 된다면 참가자 리스트를 관리하기 때문에 참여한 멤버는 1명만 조회될 예정
        StudyRoom studyRoom = entryListRepository.findStudyRoomByMemberId(slave.getMemberId());

        System.out.println(studyRoom.toString());
        // 발표한 사람의 평가를 입력하는 로직
        Evaluation evaluation = new Evaluation(
                studyRoom,
                evaluationCreateRequest.getDelivery(),
                evaluationCreateRequest.getExpression(),
                evaluationCreateRequest.getPreparation(),
                evaluationCreateRequest.getLogic(),
                evaluationCreateRequest.getSuitability(),
                slave.getNickname(),
                slave,
                slaveStatistic);

        evaluationRepository.save(evaluation);

        // 코멘트 등록 로직
        // 평가하는 사람의 값이 필요함
        Member master = memberRepository.findByNickname(evaluationCreateRequest.getMaster());
        Comment comment = new Comment(evaluation,
                master.getNickname(),
                evaluationCreateRequest.getCommentContent(),
                evaluationCreateRequest.getAnonymity());

        commentRepository.save(comment);

        Optional<Statistic> optionalStatistic = statisticRepository.findById(slave.getMemberId());

        if (optionalStatistic.isPresent()) {
            // 데이터가 있다면 업데이트 처리
            Statistic statistic = optionalStatistic.get();
            statistic.updateStatistic(evaluation);
            // 통계값 업데이트 처리
            statisticRepository.save(statistic);

        } else {
            // 데이터가 없다면 통계 테이블에 값 삽입 
            // 멤버 식별자로 값을 조회하여 넣어주자
            Statistic newStatistic = new Statistic();
            newStatistic.createStatistic(evaluation);
            // 평가 등록 처리
            statisticRepository.save(newStatistic);
        }

        return evaluation.getEvaluationId();
    }

    // 평가 전체 조회
    // 스터디룸과 사용자 식별값을 통해 평가와 코멘트를 전부 가져옴
    /**
     * querydsl 을 사용하여 평가와 코멘트를 조인하여 반환합니다.
     * 1개의 평가는 1개의 코멘트랑 매칭되도록 구성
     * 내정보 화면과 스터디룸 내부에서 사용
     */
    // 스터디룸 내부 사용자 평가 조회
    // 코멘트도 가져와야 하자너
    @Transactional
    public List<FeedBackInfoResponse> findFeedBackByStudyRoomIdAndOauthId(FeedBackSearchRequest feedBackSearchRequest) {
        Member member = memberRepository.findByOauthId(feedBackSearchRequest.getOauthId());
        QEvaluation evaluation = QEvaluation.evaluation;
        QComment comment = QComment.comment;

        return getFeedBackInfoResponses(feedBackSearchRequest, evaluation, comment, member);
    }

    private List<FeedBackInfoResponse> getFeedBackInfoResponses(FeedBackSearchRequest feedBackSearchRequest, QEvaluation evaluation, QComment comment, Member member) {
        System.out.println("feedBackSearchRequest: " + feedBackSearchRequest);
        System.out.println(feedBackSearchRequest.getStudyRoomId());
        return jpaQueryFactory.select(
                        Projections.bean(
                                FeedBackInfoResponse.class,
                                evaluation.evaluationId,
                                evaluation.studyRoom.studyRoomId,
                                evaluation.member.nickname,
                                evaluation.delivery,
                                evaluation.expression,
                                evaluation.preparation,
                                evaluation.logic,
                                evaluation.suitability,
                                comment.commentContent,
                                comment.nickname,
                                comment.anonymity
                        )
                ).from(evaluation)
                .innerJoin(comment)
                .on(evaluation.evaluationId.eq(comment.evaluation.evaluationId))
                .where(evaluation.member.nickname.eq(member.getNickname()).and(evaluation.studyRoom.studyRoomId.eq(feedBackSearchRequest.getStudyRoomId())))
                .fetch();
    }

    // 평가 삭제
    @Transactional
    public void deleteEvaluation(Long evaluationId) {
        evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.EVALUATION_NOT_FOUND));

        evaluationRepository.deleteById(evaluationId);
    }

}
