import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';
import RandomNumberBox from './components/RandomNumberBox';
import TwitterFeed from './components/TwitterFeed';
import TwitterButton from './components/TwitterButton';
import axios from 'axios';
import './App.css';
import moment from 'moment-timezone';

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [correctNumbers, setCorrectNumbers] = useState([]);
  const [isRevealTime, setIsRevealTime] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const checkRevealTime = () => {
    const now = moment().tz('Asia/Kolkata');
    const currentTime = now.valueOf();
  
    const revealStart = moment().tz('Asia/Kolkata').set({
      hour: 8,
      minute: 20,
      second: 0,
      millisecond: 0,
    });
  
    const revealEnd = moment().tz('Asia/Kolkata').set({
      hour: 8,
      minute: 25,
      second: 0,
      millisecond: 0,
    });
  
    if (now.isBetween(revealStart, revealEnd)) {
      setIsRevealTime(true);
      setTimeRemaining(null);
    } else {
      setIsRevealTime(false);
  
      let nextRevealStart = moment(revealStart);
      if (now.isAfter(revealEnd)) {
        // If past today's reveal window, set next reveal to tomorrow
        nextRevealStart.add(1, 'day');
      }
  
      const timeUntilNextReveal = nextRevealStart.valueOf() - currentTime;
      setTimeRemaining(timeUntilNextReveal);
    }
  };
  
  useEffect(() => {
    checkRevealTime(); // Initial check

    const timer = setInterval(() => {
      checkRevealTime();
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchCorrectNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/correct-numbers');
        setCorrectNumbers(response.data.correctNumbers);
      } catch (error) {
        console.error('Error fetching correct numbers:', error);
      }
    };

    if (isRevealTime) {
      fetchCorrectNumbers();
    } else {
      setCorrectNumbers([]); // Clear correct numbers outside reveal time
    }
  }, [isRevealTime]);

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return '00:00:00';

    let totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    totalSeconds %= 3600;
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="app">
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <header>
        <img src="/logo.png" alt="Company Logo" className="logo" />
        <button className="info-button" onClick={() => setShowPopup(true)}>
          &#9432;
        </button>
      </header>
      <RandomNumberBox isRevealTime={isRevealTime} />
      {isRevealTime ? (
        correctNumbers.length > 0 && (
          <footer>
            <p>
              Today's correct numbers: <strong>{correctNumbers.join(', ')}</strong>
            </p>
          </footer>
        )
      ) : (
        <footer>
          <p>
            Next reveal in: <strong>{formatTime(timeRemaining)}</strong>
          </p>
        </footer>
      )}
      <TwitterButton />
      <TwitterFeed />
    </div>
  );
}

export default App;
