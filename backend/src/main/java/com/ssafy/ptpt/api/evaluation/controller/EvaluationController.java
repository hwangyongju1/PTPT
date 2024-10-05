package com.ssafy.ptpt.api.evaluation.controller;

import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
import com.ssafy.ptpt.api.evaluation.request.FeedBackSearchRequest;
import com.ssafy.ptpt.api.evaluation.response.FeedBackInfoResponse;
import com.ssafy.ptpt.api.evaluation.service.EvaluationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evaluation")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    // 평가 등록 될때 통계 업데이트
    //평가가 등록될때 코멘트도 값이 등록이 되어야 한다
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),})
    @PostMapping
    @Operation(summary = "평가 등록")
    public ResponseEntity<Long> createEvaluation(@RequestBody @Valid EvaluationCreateRequest evaluationCreateRequest){
        Long evaluationId = evaluationService.createEvaluation(evaluationCreateRequest);
        return ResponseEntity.ok().body(evaluationId);
    }


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @DeleteMapping("/{evaluationId}")
    @Operation(summary = "평가 삭제")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable("evaluationId") Long evaluationId){
        evaluationService.deleteEvaluation(evaluationId);
        return ResponseEntity.ok().build();
    }

    // 프로필 화면에서 조회한 사용자의 스터디룸을 클릭했을때 평가를 조회
    /**
     * 프로필 화면에서의 평가를 클릭했을때
     * 평가 내용과 코멘트를 조회
     * 하나의 사용자에게 다른 참가자들이 등록한 n개의 평가와 코멘트가 있는데
     * 스터디룸 방의 정보와 사용자의 식별값을 통해 평가전체와 코멘트를 가져옵니다.
     */
    @PostMapping("/feedBack")
    @Operation(summary = "사용자 평가 조회")
    public ResponseEntity<List<FeedBackInfoResponse>> findStudyRoomMemberEvaluationByOauthId(@RequestBody @Valid FeedBackSearchRequest feedBackSearchRequest){
        List<FeedBackInfoResponse> feedBackInfoResponses = evaluationService.findFeedBackByStudyRoomIdAndOauthId(feedBackSearchRequest);
        return ResponseEntity.ok().body(feedBackInfoResponses);
    }
}
