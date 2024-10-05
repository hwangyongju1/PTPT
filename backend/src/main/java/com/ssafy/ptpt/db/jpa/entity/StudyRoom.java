package com.ssafy.ptpt.db.jpa.entity;

import com.ssafy.ptpt.api.studyroom.request.StudyRoomUpdateRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudyRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "study_room_id")
    private Long studyRoomId;

    private String studyRoomTitle;

    @OneToMany(mappedBy = "studyRoom")
    private List<Evaluation> Evaluation;

    @OneToMany(mappedBy = "studyRoom")
    private List<EntryList> entryList;

    private String studyRoomCode;

    private String studyRoomPw;

    private Long memberId;

    // 발표자
    private Long presentationHost;

    // 방 공개 여부
    private int isPublic;

    // 발표 시간
    private String presentationTime;

    // 주제
    private String subject;

    // 설명
    private String description;

    // 익명여부
    private int anonymity;

    // 스터디룸 종료 여부
    private int isCompleted;

    // 방 수정하기 - jpa 변경감지를 통해 entity 값 update
    public void updateStudyRoom(StudyRoomUpdateRequest studyRoomUpdateRequest){
        this.studyRoomTitle = studyRoomUpdateRequest.getStudyRoomTitle();
        this.isPublic = studyRoomUpdateRequest.getIsPublic();
        this.studyRoomPw = studyRoomUpdateRequest.getStudyRoomPw();
        this.presentationTime = studyRoomUpdateRequest.getPresentationTime();
        this.subject = studyRoomUpdateRequest.getSubject();
        this.description = studyRoomUpdateRequest.getDescription();
        this.anonymity = studyRoomUpdateRequest.getAnonymity();
    }

    public StudyRoom(String studyRoomTitle, int isPublic, String studyRoomPw, String presentationTime, String subject, String description, int anonymity, Long memberId, String studyRoomCode, Long presentationHost) {
        this.studyRoomTitle = studyRoomTitle;
        this.isPublic = isPublic;
        this.studyRoomPw = studyRoomPw;
        this.presentationTime = presentationTime;
        this.subject = subject;
        this.description = description;
        this.anonymity = anonymity;
        this.memberId = memberId;
        this.studyRoomCode = studyRoomCode;
        this.presentationHost = presentationHost;
    }
}
