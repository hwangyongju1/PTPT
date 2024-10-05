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
public class EntryList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_list_id")
    private Long entryListId;

//    private Long studyRoomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_room_id", referencedColumnName = "study_room_id")
    private StudyRoom studyRoom;

    private Long memberId;

    public EntryList(StudyRoom studyRoom, Long memberId) {
        this.studyRoom = studyRoom;
        this.memberId = memberId;
    }
}
