import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Chart from 'chart.js/auto';

const OffensiveLanguageAnalysis = () => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commonOffensiveWords, setCommonOffensiveWords] = useState([]);
  const chartRef = useRef(null);

  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, 'drafts'));
      const offensiveData = [];
      let totalCount = 0;
      let wordFrequency = {};

      querySnapshot.forEach((doc) => {
        const entry = doc.data();
        offensiveData.push(entry);

        if (entry.text) {
          totalCount += 1;

          const words = entry.text.split(/\s+/);
          words.forEach((word) => {
            word = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
            if (word && word.length > 1) {
              wordFrequency[word] = (wordFrequency[word] || 0) + 1;
            }
          });
        }
      });

      setData(offensiveData);
      setTotalItems(totalCount);

      const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
      setCommonOffensiveWords(sortedWords.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
      .then(() => console.log('Data fetched successfully'))
      .catch((error) => console.error('Data fetch error:', error));
  }, []);

  useEffect(() => {
    if (commonOffensiveWords.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Items', ...commonOffensiveWords.map(([word]) => word)],
          datasets: [{
            label: 'Occurrences',
            data: [totalItems, ...commonOffensiveWords.map(([_, frequency]) => frequency)],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Red for Total Items
              ...Array(commonOffensiveWords.length).fill('rgba(75, 192, 192, 0.2)'), // Green for Common Words
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              ...Array(commonOffensiveWords.length).fill('rgba(75, 192, 192, 1)'),
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [commonOffensiveWords, totalItems]);

  return (
    <div>
      <h2>Offensive Language Analysis</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>An error occurred while fetching data: {error.message}</p> 
      ) : (
        <div>
          <p>Total items with "text" field: {totalItems}</p> 
          <ul>
            {data.map((entry, index) => (
              <li key={index}>
                {/* Display data */}
              </li>
            ))}
          </ul>
          <h3>Most Common Offensive Words:</h3>
          <ul>
            {commonOffensiveWords.map(([word, frequency], index) => (
              <li key={index}>{word}: {frequency} occurrences</li>
            ))}
          </ul>
          <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
      )}
    </div>
  );
};

export default OffensiveLanguageAnalysis;
