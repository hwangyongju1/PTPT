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

const MultiRadarChart = ({ data }) => {
  console.log(data);
  console.log(data.number);
  const chartData = {
    labels: ['발표력', '표현력', '논리력', '준비성', '적합성'],
    datasets: [
      {
        label: '평균 점수',
        data: [
          data.delivery,
          data.expression,
          data.logic,
          data.preparation,
          data.suitability,
        ],
        backgroundColor: 'rgba(34, 202, 236, .2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
    ],
  };
  console.log(chartData.datasets);
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

export default MultiRadarChart;
