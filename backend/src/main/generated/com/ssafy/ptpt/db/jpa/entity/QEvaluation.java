package com.ssafy.ptpt.db.jpa.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEvaluation is a Querydsl query type for Evaluation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEvaluation extends EntityPathBase<Evaluation> {

    private static final long serialVersionUID = -1241496093L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEvaluation evaluation = new QEvaluation("evaluation");

    public final QComment comment;

    public final NumberPath<Integer> delivery = createNumber("delivery", Integer.class);

    public final NumberPath<Long> evaluationId = createNumber("evaluationId", Long.class);

    public final NumberPath<Integer> expression = createNumber("expression", Integer.class);

    public final NumberPath<Integer> logic = createNumber("logic", Integer.class);

    public final QMember member;

    public final StringPath nickname = createString("nickname");

    public final NumberPath<Integer> preparation = createNumber("preparation", Integer.class);

    public final QStatistic statistic;

    public final QStudyRoom studyRoom;

    public final NumberPath<Integer> suitability = createNumber("suitability", Integer.class);

    public QEvaluation(String variable) {
        this(Evaluation.class, forVariable(variable), INITS);
    }

    public QEvaluation(Path<? extends Evaluation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEvaluation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEvaluation(PathMetadata metadata, PathInits inits) {
        this(Evaluation.class, metadata, inits);
    }

    public QEvaluation(Class<? extends Evaluation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.comment = inits.isInitialized("comment") ? new QComment(forProperty("comment"), inits.get("comment")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.statistic = inits.isInitialized("statistic") ? new QStatistic(forProperty("statistic"), inits.get("statistic")) : null;
        this.studyRoom = inits.isInitialized("studyRoom") ? new QStudyRoom(forProperty("studyRoom")) : null;
    }

}

