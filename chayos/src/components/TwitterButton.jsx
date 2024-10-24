import React from 'react';
import './TwitterButton.css';

const TwitterButton = () => {
  const handleClick = () => {
    window.open('https://x.com/akaispacexyz', '_blank');
  };

  return (
    <button className="twitter-button" onClick={handleClick}>
      <i className="fab fa-twitter"></i> @Akaispacexyz
    </button>
  );
};

export default TwitterButton;


