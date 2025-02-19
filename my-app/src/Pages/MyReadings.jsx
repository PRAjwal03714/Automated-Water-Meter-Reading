import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './MyReadings.css'; // Make sure this path is correct

function MyReadings() {
  const [waterReadings, setWaterReadings] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/water-meter-readings'); // Replace with your backend URL
        setWaterReadings(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePaymentClick = () => {
    window.open("https://bwsajala.karnataka.gov.in/bwssb_onlinepg/quickpay.aspx", "_blank");
  };

  return (
    <main>
      <div className="container">
        <div className="form">
          <h2 className="title">YOUR WATER METER READING</h2>
          {waterReadings.map((reading, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={`currentReading_${index}`}>Current Reading:</label>
              <input type="text" id={`currentReading_${index}`} value={reading.Current_Reading} readOnly />

              <label htmlFor={`previousReading_${index}`}>Previous Reading:</label>
              <input type="text" id={`previousReading_${index}`} value={reading.Previous_Reading} readOnly />

              <label htmlFor={`amount_${index}`}>Amount (Rs):</label>
              <input type="text" id={`amount_${index}`} value={reading.Amount} readOnly />

              <label htmlFor={`imageId_${index}`}>Image ID:</label>
              <a href={reading.Image_Id} target="_blank" rel="noopener noreferrer">
                {reading.Image_Id}
              </a>

              <button type="button" onClick={handlePaymentClick} className="payment-button">
                Make Payment
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default MyReadings;
