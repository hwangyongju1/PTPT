//package com.ssafy.ptpt;
//
//import com.ssafy.ptpt.api.evaluation.request.EvaluationCreateRequest;
//import com.ssafy.ptpt.api.evaluation.service.EvaluationService;
//import com.ssafy.ptpt.api.studyroom.request.StudyRoomCreateEntryRequest;
//import com.ssafy.ptpt.api.studyroom.request.StudyRoomCreateRequest;
//import com.ssafy.ptpt.api.studyroom.service.StudyRoomService;
//import com.ssafy.ptpt.db.jpa.entity.Member;
//import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
//import com.ssafy.ptpt.db.jpa.repository.EntryListRepository;
//import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
//import com.ssafy.ptpt.db.jpa.repository.StatisticRepository;
//import com.ssafy.ptpt.db.jpa.repository.StudyRoomRepository;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//
//import java.sql.Timestamp;
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//public class DataInitializer {
//
//    private final EvaluationService evaluationService;
//    private final MemberRepository memberRepository;
//    private final StudyRoomService studyRoomService;
//    private final StudyRoomRepository studyRoomRepository;
//
//    @PostConstruct
//    public void init() {
//        Timestamp time = new Timestamp(System.currentTimeMillis());
//
//        // Member 저장
//        Member member = new Member(
//                "testMember",
//                "test",
//                "Google",
//                "G123",
//                "test@gmail.com",
//                time,
//                0,
//                time
//        );
//
//        Member member2 = new Member(
//                "testMember2",
//                "test2",
//                "Google2",
//                "G1234",
//                "test2@gmail.com",
//                time,
//                0,
//                time
//        );
//
//        memberRepository.save(member);
//        memberRepository.save(member2);
//
////         StudyRoom 저장
//        StudyRoomCreateRequest studyRoomCreateRequest = new StudyRoomCreateRequest(
//                "testStudyRoom",
//                1,
//                "123",
//                "15:00",
//                "테스트",
//                "test",
//                1,
//                member.getOauthId()
//        );
//
//        Long studyRoomId = studyRoomService.createStudyRoom(studyRoomCreateRequest);
//        StudyRoom studyRoom = studyRoomRepository.findByStudyRoomId(studyRoomId);
////
////        // entryList 저장
//        List<String> entryList = new ArrayList<>();
//        entryList.add(member.getNickname());
//        entryList.add(member2.getNickname());
//        StudyRoomCreateEntryRequest saveEntryRequest = new StudyRoomCreateEntryRequest(studyRoom.getStudyRoomId()
//                                                                                ,entryList);
//        studyRoomService.studyRoomEntryRegister(saveEntryRequest);
//
//        EvaluationCreateRequest evaluationCreateRequest1 = new EvaluationCreateRequest(
//                studyRoom.getStudyRoomId(),
//                100,
//                100,
//                100,
//                100,
//                100,
//                member.getNickname(),
//                member2.getNickname(),
//                "DataInitializer season2",
//                0
//        );
//
//        EvaluationCreateRequest evaluationCreateRequest2 = new EvaluationCreateRequest(
//                studyRoom.getStudyRoomId(),
//                90,
//                90,
//                90,
//                90,
//                90,
//                member2.getNickname(),
//                member.getNickname(),
//                "DataInitializer season2",
//                0
//        );
//
//        evaluationService.createEvaluation(evaluationCreateRequest1);
//        evaluationService.createEvaluation(evaluationCreateRequest2);
//    }
//}
