package com.ssafy.ptpt.db.jpa.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStatistic is a Querydsl query type for Statistic
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStatistic extends EntityPathBase<Statistic> {

    private static final long serialVersionUID = 1037584841L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStatistic statistic = new QStatistic("statistic");

    public final NumberPath<Integer> evaluateQuantity = createNumber("evaluateQuantity", Integer.class);

    public final ListPath<Evaluation, QEvaluation> evaluation = this.<Evaluation, QEvaluation>createList("evaluation", Evaluation.class, QEvaluation.class, PathInits.DIRECT2);

    public final QProfile profile;

    public final NumberPath<Long> statisticId = createNumber("statisticId", Long.class);

    public final NumberPath<Integer> totalDelivery = createNumber("totalDelivery", Integer.class);

    public final NumberPath<Integer> totalExpression = createNumber("totalExpression", Integer.class);

    public final NumberPath<Integer> totalLogic = createNumber("totalLogic", Integer.class);

    public final NumberPath<Integer> totalPreparation = createNumber("totalPreparation", Integer.class);

    public final NumberPath<Integer> totalSuitability = createNumber("totalSuitability", Integer.class);

    public QStatistic(String variable) {
        this(Statistic.class, forVariable(variable), INITS);
    }

    public QStatistic(Path<? extends Statistic> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStatistic(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStatistic(PathMetadata metadata, PathInits inits) {
        this(Statistic.class, metadata, inits);
    }

    public QStatistic(Class<? extends Statistic> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.profile = inits.isInitialized("profile") ? new QProfile(forProperty("profile"), inits.get("profile")) : null;
    }

}

