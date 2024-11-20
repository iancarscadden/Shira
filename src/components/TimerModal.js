// src/components/TimerModal.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TimerContext from '../context/TimerContext';
import './TimerModal.css';

export default function TimerModal() {
  const { timerExpired } = useContext(TimerContext);
  const navigate = useNavigate();

  if (!timerExpired) return null; // Don't render if the timer hasn't expired

  return (
    <div className="timer-modal-overlay" role="dialog" aria-modal="true">
      <div className="timer-modal-window">
        <p className="timer-modal-text">
          Please create an account or log in to continue learning.
        </p>
        <div className="timer-modal-button-group">
          <button
            className="timer-modal-button login-button"
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
          <button
            className="timer-modal-button signup-button"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
