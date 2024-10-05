package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.api.studyroom.request.StudyRoomClearRequest;
import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {

    Page<StudyRoom> findByStudyRoomTitleContainingAndIsCompleted(String studyRoomTitle, int isCompleted, Pageable pageable);
    StudyRoom findByStudyRoomId(Long studyRoomId);
    Page<StudyRoom> findByMemberId(Long memberId, Pageable pageable);
    StudyRoom findByStudyRoomIdAndMemberId(Long studyRoomId, Long memberId);
    Page<StudyRoom> findByIsCompleted(int isCompleted, Pageable pageable);

    @Modifying
    @Query("UPDATE StudyRoom s SET s.presentationHost = :memberId WHERE s.studyRoomId = :studyRoomId AND s.isCompleted = 0")
    int updatePresentatorAssignation(@Param("memberId") Long memberId, @Param("studyRoomId") Long studyRoomId);

    @Modifying
    @Query("DELETE FROM EntryList el WHERE el.studyRoom.studyRoomId = :studyRoomId AND el.memberId = :memberId")
    int deleteByStudyRoomIdAndOauthId(@Param("studyRoomId") Long studyRoomId, @Param("memberId") Long memberId);

    @Modifying
    @Query("UPDATE StudyRoom s Set s.isCompleted = 1 WHERE s.studyRoomId =:studyRoomId")
    void studyRoomStatusChange(@Param("studyRoomId") Long studyRoomId);
}
