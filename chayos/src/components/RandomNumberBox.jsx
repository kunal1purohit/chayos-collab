import React, { useState } from 'react';
import './RandomNumberBox.css';
import axios from 'axios';

const RandomNumberBox = ({ isRevealTime }) => {
  const [digits, setDigits] = useState(['-', '-', '-']);
  const [isSpinning, setIsSpinning] = useState(false);

  const generateNumber = async () => {
    setIsSpinning(true);

    try {
      const response = await axios.post('http://localhost:5000/generate-number');
      const number = response.data.number;
      const numStr = String(number).padStart(3, '0'); // Ensure it's 3 digits

      startSpinning(numStr);
    } catch (error) {
      console.error('Error fetching number from backend:', error);
      setIsSpinning(false);
      // Optionally, display an error message to the user
    }
  };

  const startSpinning = (finalNumber) => {
    const finalDigits = finalNumber.split('');
    const totalDuration = 5000; // Total duration in milliseconds

    finalDigits.forEach((digit, index) => {
      const segmentStartTime = Date.now();
      const segmentDuration = totalDuration - index * 1500; // Each segment stops earlier

      const spin = () => {
        const elapsed = Date.now() - segmentStartTime;
        const progress = elapsed / segmentDuration;
        const easedProgress = Math.min(progress, 1);

        setDigits((prevDigits) => {
          const newDigits = [...prevDigits];
          newDigits[index] = Math.floor(Math.random() * 10).toString();
          return newDigits;
        });

        if (easedProgress < 1) {
          const interval = 50 + 150 * easedProgress; // Gradually increase interval
          setTimeout(spin, interval);
        } else {
          setDigits((prevDigits) => {
            const newDigits = [...prevDigits];
            newDigits[index] = finalDigits[index];
            return newDigits;
          });

          // If all segments have stopped
          if (index === 2) {
            setIsSpinning(false);
          }
        }
      };

      spin();
    });
  };

  return (
    <div className="random-number-box">
      <div className="digit-container">
        {digits.map((digit, index) => (
          <div key={index} className="digit-segment">
            {digit}
          </div>
        ))}
      </div>
      <button
        onClick={generateNumber}
        disabled={isRevealTime || isSpinning}
        className={isRevealTime || isSpinning ? 'disabled-button' : ''}
      >
        Generate Random Number
      </button>
      {(isRevealTime || isSpinning) && (
        <p className="disabled-message">
          {isRevealTime
            ? 'Number generation is disabled during the answer reveal time.'
            : 'Please wait...'}
        </p>
      )}
    </div>
  );
};

export default RandomNumberBox;
