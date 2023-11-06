import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
const OffensiveLanguageAnalysis = () => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0); // Added totalItems state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await firebase.firestore().collection('sentiment').get();
        const offensiveData = [];

        snapshot.forEach((doc) => {
          offensiveData.push(doc.data());
        });

        // Set the data in the component's state
        setData(offensiveData);

        // Count the total number of items
        const count = snapshot.size;
        setTotalItems(count);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Offensive Language Analysis</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>An error occurred while fetching data.</p>
      ) : (
        <div>
          <p>Total items: {totalItems}</p> {/* Display the total count */}
          <ul>
            {data.map((entry, index) => (
              <li key={index}>
                <strong>Text:</strong> {entry.text}<br />
                <strong>Category:</strong> {entry.CATEGORY}<br />
                <strong>Toxicity Score:</strong> {entry.TOXCITY_SCORE}<br />
                <strong>Polarity:</strong> {entry.polarity}<br />
                <strong>Sentiment:</strong> {entry.sentiment}<br />
                <strong>Subjectivity:</strong> {entry.subjectivity}<br />
                {/* Add any other fields you want to display */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OffensiveLanguageAnalysis;
