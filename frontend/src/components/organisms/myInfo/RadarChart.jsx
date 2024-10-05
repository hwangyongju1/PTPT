import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
8;

const RadarChart = ({ data }) => {
  const chartData = {
    labels: ['전달력', '표현력', '논리력', '준비성', '적합성'],
    datasets: [
      {
        label: '평균 점수',
        data: [
          data.totalDelivery / data.evaluateQuantity,
          data.totalExpression / data.evaluateQuantity,
          data.totalLogic / data.evaluateQuantity,
          data.totalPreparation / data.evaluateQuantity,
          data.totalSuitability / data.evaluateQuantity,
        ],
        backgroundColor: 'rgba(34, 202, 236, .2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100, // 최대값을 100으로 설정합니다.
        ticks: {
          stepSize: 20,
        },
        pointLabels: {
          fontSize: 14,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false, // 추가된 부분
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
