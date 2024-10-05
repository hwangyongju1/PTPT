package com.ssafy.ptpt.db.jpa.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyRoom is a Querydsl query type for StudyRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyRoom extends EntityPathBase<StudyRoom> {

    private static final long serialVersionUID = 1163511485L;

    public static final QStudyRoom studyRoom = new QStudyRoom("studyRoom");

    public final NumberPath<Integer> anonymity = createNumber("anonymity", Integer.class);

    public final StringPath description = createString("description");

    public final ListPath<EntryList, QEntryList> entryList = this.<EntryList, QEntryList>createList("entryList", EntryList.class, QEntryList.class, PathInits.DIRECT2);

    public final ListPath<Evaluation, QEvaluation> Evaluation = this.<Evaluation, QEvaluation>createList("Evaluation", Evaluation.class, QEvaluation.class, PathInits.DIRECT2);

    public final NumberPath<Integer> isCompleted = createNumber("isCompleted", Integer.class);

    public final NumberPath<Integer> isPublic = createNumber("isPublic", Integer.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final NumberPath<Long> presentationHost = createNumber("presentationHost", Long.class);

    public final StringPath presentationTime = createString("presentationTime");

    public final StringPath studyRoomCode = createString("studyRoomCode");

    public final NumberPath<Long> studyRoomId = createNumber("studyRoomId", Long.class);

    public final StringPath studyRoomPw = createString("studyRoomPw");

    public final StringPath studyRoomTitle = createString("studyRoomTitle");

    public final StringPath subject = createString("subject");

    public QStudyRoom(String variable) {
        super(StudyRoom.class, forVariable(variable));
    }

    public QStudyRoom(Path<? extends StudyRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStudyRoom(PathMetadata metadata) {
        super(StudyRoom.class, metadata);
    }

}

