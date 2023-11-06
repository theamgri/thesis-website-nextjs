import React from 'react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement,} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
import { Line } from 'react-chartjs-2';
const DailyWeekendTrends = () => {
  // Define your chart data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [30, 40, 25, 50, 45],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  // Define the chart options
  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Daily Weekend Trends Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyWeekendTrends;
