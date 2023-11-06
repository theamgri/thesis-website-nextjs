import React from 'react';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale );

const DataFilters = () => {
  // Define your chart data
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        label: 'Sample Data',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define the chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Data Filters Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DataFilters;