import React from 'react';
import './Popup.css';

const Popup = ({ onClose }) => (
  <div className="popup">
    <div className="popup-inner">
      <p className="instructions">
        Generate a number and grab a free chai! Show it to the cashier between <strong>12-2 AM</strong>. Be the first one to grab it!
      </p>
      <button className="close-button" onClick={onClose}>
        Got it!
      </button>
    </div>
  </div>
);

export default Popup;
