package com.ssafy.ptpt.db.jpa.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "statistic_id")
    private Long statisticId;

    @OneToMany(mappedBy = "statistic")
    private List<Evaluation> evaluation;

    @OneToOne(mappedBy = "statistic", fetch = FetchType.LAZY)
    private Profile profile;

    private int totalDelivery;
    private int totalExpression;
    private int totalPreparation;
    private int totalLogic;
    private int totalSuitability;
    private int evaluateQuantity;

    public Statistic(Profile profile) {
        this.profile = profile;
    }

    public void createStatistic(Evaluation evaluation) {
        this.totalDelivery = evaluation.getDelivery();
        this.totalExpression = evaluation.getExpression();
        this.totalPreparation = evaluation.getPreparation();
        this.totalLogic = evaluation.getLogic();
        this.totalSuitability = evaluation.getSuitability();
        this.evaluateQuantity++;

    }

    public void updateStatistic(Evaluation evaluation){
        this.totalDelivery += evaluation.getDelivery();
        this.totalExpression += evaluation.getExpression();
        this.totalPreparation += evaluation.getPreparation();
        this.totalLogic += evaluation.getLogic();
        this.totalSuitability += evaluation.getSuitability();
        this.evaluateQuantity++;
    }

}
