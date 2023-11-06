import React from 'react';
import { Bar } from 'react-chartjs-2';

const SentimentAnalysis = () => {
  // Sample data for the chart
  const data = {
    labels: ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5'],
    datasets: [
      {
        label: 'Positive Sentiment',
        data: [10, 15, 5, 20, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        stack: 'stack1', // Assign a stack value to group datasets together
      },
      {
        label: 'Neutral Sentiment',
        data: [5, 10, 15, 5, 10],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        stack: 'stack1',
      },
      {
        label: 'Negative Sentiment',
        data: [5, 10, 5, 5, 15],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        stack: 'stack1',
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SentimentAnalysis;
