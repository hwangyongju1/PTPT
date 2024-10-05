package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.EntryList;
import com.ssafy.ptpt.db.jpa.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EntryListRepository extends JpaRepository<EntryList, Long> {
    @Modifying
    @Query("DELETE FROM EntryList el WHERE el.studyRoom.studyRoomId = :studyRoomId")
    void deleteByStudyRoomId(Long studyRoomId);

    @Query("SELECT e.studyRoom FROM EntryList e WHERE e.memberId = :memberId")
    StudyRoom findStudyRoomByMemberId(@Param("memberId") Long memberId);
}
