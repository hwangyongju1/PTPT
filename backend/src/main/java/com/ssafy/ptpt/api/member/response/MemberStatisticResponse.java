package com.ssafy.ptpt.api.member.response;

import com.ssafy.ptpt.db.jpa.entity.Statistic;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberStatisticResponse {
    private Long statisticId;
    private int totalDelivery;
    private int totalExpression;
    private int totalPreparation;
    private int totalLogic;
    private int totalSuitability;
    private int evaluateQuantity;

    public static MemberStatisticResponse from(Statistic statistic) {
        MemberStatisticResponse memberStatisticResponse = new MemberStatisticResponse();
        memberStatisticResponse.statisticId = statistic.getStatisticId();
        memberStatisticResponse.totalDelivery = statistic.getTotalDelivery();
        memberStatisticResponse.totalExpression = statistic.getTotalExpression();
        memberStatisticResponse.totalPreparation = statistic.getTotalPreparation();
        memberStatisticResponse.totalLogic = statistic.getTotalLogic();
        memberStatisticResponse.totalSuitability = statistic.getTotalSuitability();
        memberStatisticResponse.evaluateQuantity = statistic.getEvaluateQuantity();

        return memberStatisticResponse;

    }

}
