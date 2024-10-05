package com.ssafy.ptpt.api.studyroom.controller;

import com.ssafy.ptpt.api.evaluation.request.FeedBackSearchRequest;
import com.ssafy.ptpt.api.evaluation.response.FeedBackInfoResponse;
import com.ssafy.ptpt.api.evaluation.service.EvaluationService;
import com.ssafy.ptpt.api.member.request.MemberOauthIdRequest;
import com.ssafy.ptpt.api.studyroom.request.*;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomInfoResponse;
import com.ssafy.ptpt.api.studyroom.response.StudyRoomListResponse;
import com.ssafy.ptpt.api.studyroom.service.StudyRoomService;
import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import com.ssafy.ptpt.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studyRoom")
@RequiredArgsConstructor
public class StudyRoomController {

    private final StudyRoomService studyRoomService;
    private final MemberRepository memberRepository;
    private final EvaluationService evaluationService;

    //방 생성
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping
    @Operation(summary = "스터디룸 등록")
    public ResponseEntity<Long> createRoom(@RequestBody @Valid StudyRoomCreateRequest studyRoomCreateRequest) {
        Long studyRoomId = studyRoomService.createStudyRoom(studyRoomCreateRequest);
        return ResponseEntity.ok().body(studyRoomId);
    }

    //스터디룸 검색
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/search/{studyRoomTitle}")
    @Operation(summary = "스터디룸 검색", description = "대기실 화면에서 스터디룸을 검색 할수 있습니다.")
    public ResponseEntity<Page<StudyRoomInfoResponse>> findByRoomTitle(@PathVariable("studyRoomTitle") String studyRoomTitle, Pageable pageable) {
        Page<StudyRoomInfoResponse> studyRoomInfoResponse = studyRoomService.findByStudyRoomTitle(studyRoomTitle, pageable);
        return ResponseEntity.ok().body(studyRoomInfoResponse);
    }

    //스터디룸 사용자로 조회
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/search")
    @Operation(summary = "사용자 스터디룸 조회", description = "프로필에서 사용자의 스터디룸을 확인할수 있습니다.")
    public ResponseEntity<Page<StudyRoomInfoResponse>> findByOauthId(@RequestBody MemberOauthIdRequest memberOauthIdRequest, Pageable pageable) {
        Member member = memberRepository.findByOauthId(memberOauthIdRequest.getOauthId());

        Page<StudyRoomInfoResponse> studyRoomInfoResponse = studyRoomService.findByMemberId(member.getMemberId(), pageable);

        return ResponseEntity.ok().body(studyRoomInfoResponse);
    }

    //스터디룸 수정
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PutMapping("/{studyRoomId}")
    @Operation(summary = "스터디룸 수정", description = "방 내부에서 스터디룸 관련 설정을 수정할수 있습니다.")
    public ResponseEntity<Void> updateRoom(
                                           @PathVariable("studyRoomId") Long studyRoomId,
                                           @RequestBody @Valid StudyRoomUpdateRequest studyRoomUpdateRequest) {
        studyRoomService.updateStudyRoom(studyRoomId, studyRoomUpdateRequest);
        return ResponseEntity.ok().build();
    }


    //스터디룸 리스트 전체 조회
    @GetMapping
    @Operation(summary = "스터디룸 전체 조회", description = "대기실 화면에 있는 스터디룸의 리스트를 확인할수 있습니다.")
    public ResponseEntity<Page<StudyRoomListResponse>> findBySearchRequest(Pageable pageable){
        Page<StudyRoomListResponse> studyRoom = studyRoomService.findBySearchRequest(null, null, pageable);
        return ResponseEntity.ok(studyRoom);
    }

    // 스터디룸 비밀번호 확인
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/pwCheck")
    @Operation(summary = "스터디룸 비밀번호 체크", description = "스터디룸의 비밀번호 체크")
    public ResponseEntity<Void> findById(@RequestBody @Valid StudyRoomConnectRequest studyRoomConnectRequest) {
        studyRoomService.studyRoomPwCheck(studyRoomConnectRequest);
        return ResponseEntity.ok().build();
    }

    /**
     스터디룸 발표자 지정
     호스트가 권한을 줌

     동작
     스터디 룸 Id 값을 얻어온 뒤,
     선택된 참가자의 식별값(oauthId)을 통해
     검색된 스터디룸의 발표자를 사용자의 식별값으로 변경
     변경 뒤 발표자의 id 값을 반환해서 프론트에 넘겨주자
     **/
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/assignation")
    @Operation(summary = "발표자 지정", description = "호스트가 참가한 사용자에 대해 발표권한을 부여합니다.")
    public ResponseEntity<Long> presentatorAssignation(@RequestBody @Valid StudyRoomStatusRequest studyRoomStatusRequest) {
        int complete = studyRoomService.presentatorAssignation(studyRoomStatusRequest);
        return complete == 1 ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }



    /**      스터디 룸 입장 관리
     *      발표 시작 전 참가자의 현황을 관리하지 않고, 시작이 된다면 entryList 테이블에 스터디룸 번호와 함께 참가자 목록 저장
     *      현재 스터디 룸에 들어와 있는 사용자의 session 값을 얻어와서 사용자 식별 후 참가자 테이블에 업데이트
     *      -> 발표가 시작하기 전까지는 스터디룸에 여러 사용자가 입 퇴장 할 수 있다.
     *      오픈비두 에서 접속한 사용자에 대한 세션값을 리스트로 관리해줌 ex) sessionId, nickname 이 있는데 설정가능
     *      리스트<닉네임>을 얻어와서 닉네임을 통한 유저의 oauthId를 조회 후 이 값들을 entryList 에 일괄 저장
     */
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/entry")
    @Operation(summary = "입장 인원 등록", description = "스터디룸에 입장한 사용자들의 리스트를 참가자 데이터베이스에 저장해줍니다.")
    public ResponseEntity<Void> studyRoomEntry(@RequestBody @Valid StudyRoomCreateEntryRequest studyRoomCreateEntryRequest) {
        studyRoomService.studyRoomEntryRegister(studyRoomCreateEntryRequest);
        return ResponseEntity.ok().build();
    }


    /**
     *      스터디 룸 퇴장 관리
     *      나가기 버튼을 누른 사용자에 대해 참가자 테이블 업데이트
     */
    // TODO : 스터디룸 테이블에서 발표자인 사용자가 나갈 경우에 대한 처리에 대해 생각 후 반영 필요
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @DeleteMapping("/exit")
    @Operation(summary = "스터디룸 퇴장", description = "사용자가 스터디룸에서 퇴장합니다.")
    public ResponseEntity<Void> studyRoomExit(@RequestBody @Valid StudyRoomStatusRequest studyRoomStatusRequest) {
        int complete = studyRoomService.studyRoomExit(studyRoomStatusRequest);
        return complete == 1 ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    //    clearEntryList

    /**
     * 스터디룸 발표가 종료되었을때 (사용자가 전부 나갔을때)
     * 스터디룸의 status 를 변경해주며 (1일때 종료된 스터디룸)
     * 해당 스터디룸의 참가한 사용자들의 목록을 clear 합니다
     *
     */
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
    })
    @PostMapping("/clear")
    @Operation(summary = "스터디룸 종료처리", description = "스터디룸의 종료 처리와 참가자 리스트의 삭제를 진행합니다")
    public ResponseEntity<Void> clearEntryList(@RequestBody @Valid StudyRoomClearRequest studyRoomClearRequest) {
        studyRoomService.clearEntryList(studyRoomClearRequest);
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/feedBack")
//    @Operation(summary = "사용자 평가 조회")
//    public ResponseEntity<List<FeedBackInfoResponse>> findStudyRoomMemberEvaluationByOauthId(@RequestBody @Valid FeedBackSearchRequest feedBackSearchRequest){
//        List<FeedBackInfoResponse> feedBackInfoResponses = evaluationService.findFeedBackByStudyRoomIdAndOauthId(feedBackSearchRequest);
//        return ResponseEntity.ok().body(feedBackInfoResponses);
//    }
}
