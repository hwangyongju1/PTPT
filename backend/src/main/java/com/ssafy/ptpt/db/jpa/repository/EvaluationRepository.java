package com.ssafy.ptpt.db.jpa.repository;

import com.ssafy.ptpt.db.jpa.entity.Evaluation;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

    @Query("SELECT DISTINCT e.studyRoom.studyRoomId FROM Evaluation e WHERE e.member.memberId = :memberId ORDER BY e.studyRoom.studyRoomId ASC")
    List<Long> findByMemberId(@Param("memberId") Long memberId);

}