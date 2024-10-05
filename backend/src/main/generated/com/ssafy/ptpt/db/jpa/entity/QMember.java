package com.ssafy.ptpt.db.jpa.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 1716925633L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final ListPath<Evaluation, QEvaluation> evaluation = this.<Evaluation, QEvaluation>createList("evaluation", Evaluation.class, QEvaluation.class, PathInits.DIRECT2);

    public final NumberPath<Integer> isWithdraw = createNumber("isWithdraw", Integer.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final StringPath memberPicture = createString("memberPicture");

    public final NumberPath<Integer> memberReportCount = createNumber("memberReportCount", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath oauthEmail = createString("oauthEmail");

    public final StringPath oauthId = createString("oauthId");

    public final StringPath oauthProvider = createString("oauthProvider");

    public final QProfile profile;

    public final DateTimePath<java.sql.Timestamp> registerTime = createDateTime("registerTime", java.sql.Timestamp.class);

    public final StringPath role = createString("role");

    public final StringPath username = createString("username");

    public final NumberPath<Integer> voiceModelCreated = createNumber("voiceModelCreated", Integer.class);

    public final DateTimePath<java.sql.Timestamp> withdrawTime = createDateTime("withdrawTime", java.sql.Timestamp.class);

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.profile = inits.isInitialized("profile") ? new QProfile(forProperty("profile"), inits.get("profile")) : null;
    }

}

