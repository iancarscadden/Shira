// src/components/InstructionsModal.js

import React from 'react';
import './InstructionsModal.css';

export default function InstructionsModal({ onClose }) {
  return (
    <div className="instructions-modal-overlay" onClick={onClose}>
      <div className="instructions-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="instructions-modal-close-button"
          onClick={onClose}
          aria-label="Close Instructions Modal"
        >
          &times;
        </button>
        <div className="instructions-modal-body">
          <h2>
            You’re Ready to Learn!{' '}
            <span role="img" aria-label="musical notes">
              🎶
            </span>
          </h2>
          <p>
            Now that you’ve picked your song, here’s how to get the most out of it:
          </p>
          <h3>Listen and Watch the Lyrics</h3>
          <p>
            The song will start playing at the top, and you’ll see the lyrics in both English and the
            native language right below. Let the music guide you—immerse yourself in the sounds and
            meaning as you follow along.
          </p>
          <h3>Interactive Lessons Pop-Up</h3>
          <p>
            As key phrases play, lessons will pop up automatically. Each lesson is designed to help
            you understand, practice, and use the phrase.
          </p>
          <p>
            <strong>Cultural Context:</strong> Get insights into the meaning and cultural
            significance behind the phrase.
          </p>
          <p>
            <strong>Conversational Fluency:</strong> Practice how to use this phrase in real-life
            situations.
          </p>
          <p>
            <strong>Contextualization:</strong> Apply the phrase in a specific context to deepen
            your understanding.
          </p>
          <h3>Engage with the Activities</h3>
          <p>
            Each lesson comes with 3 short activities to make the phrase stick. Complete these and
            see your conversational skills grow!
          </p>
          <h3>Keep Going!</h3>
          <p>
            Once you finish a lesson, the song will continue. Stay engaged—the more you listen, the
            better you’ll learn. New lessons will keep popping up!
          </p>
        </div>
      </div>
    </div>
  );
}
