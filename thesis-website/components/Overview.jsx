import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Doughnut } from 'react-chartjs-2';

const HateSpeechOverview = () => {
  const [hateSpeechData, setHateSpeechData] = useState([]);
  const [totalContent, setTotalContent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let totalHateSpeech = 0;

  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, 'drafts'));
      const hateSpeechData = [];

      querySnapshot.forEach((doc) => {
        const entry = doc.data();
        hateSpeechData.push(entry);

        if (entry.isHateSpeech) {
          totalHateSpeech += 1;
        }
      });

      setHateSpeechData(hateSpeechData);
      setTotalContent(querySnapshot.size);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: ['Non-Hate Speech', 'Hate Speech'],
    datasets: [
      {
        data: [totalContent - totalHateSpeech, totalHateSpeech],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  return (
    <div>
      <h2>Hate Speech Overview</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>An error occurred while fetching data: {error.message}</p>
      ) : (
        <div>
          <Doughnut data={data} />
          <p>Total Content: {totalContent}</p>
          <p>Total Hate Speech Incidents: {totalHateSpeech}</p>
          <p>Hate Speech Percentage: {((totalHateSpeech / totalContent) * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default HateSpeechOverview;
