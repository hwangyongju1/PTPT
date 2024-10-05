package com.ssafy.ptpt.db.jpa.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEntryList is a Querydsl query type for EntryList
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEntryList extends EntityPathBase<EntryList> {

    private static final long serialVersionUID = -1655737175L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEntryList entryList = new QEntryList("entryList");

    public final NumberPath<Long> entryListId = createNumber("entryListId", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final QStudyRoom studyRoom;

    public QEntryList(String variable) {
        this(EntryList.class, forVariable(variable), INITS);
    }

    public QEntryList(Path<? extends EntryList> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEntryList(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEntryList(PathMetadata metadata, PathInits inits) {
        this(EntryList.class, metadata, inits);
    }

    public QEntryList(Class<? extends EntryList> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.studyRoom = inits.isInitialized("studyRoom") ? new QStudyRoom(forProperty("studyRoom")) : null;
    }

}

