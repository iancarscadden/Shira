// src/components/InstructionsModal.js

import React, { useState } from 'react';
import './InstructionsModal.css';

export default function InstructionsModal({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "You’re Ready to Learn! 🎶",
      content: `Listen and Watch the Lyrics
The song will start playing at the top, and you’ll see the lyrics in both English and the native language right below. Let the music guide you—immerse yourself in the sounds and meaning as you follow along.`
    },
    {
      title: "Interactive Lessons Pop-Up",
      content: `As key phrases play, lessons will pop up automatically. Each lesson is designed to help you understand, practice, and use the phrase.

Cultural Context: Get insights into the meaning and cultural significance behind the phrase.

Conversational Fluency: Practice how to use this phrase in real-life situations.

Contextualization: Apply the phrase in a specific context to deepen your understanding.`
    },
    {
      title: "Engage with the Activities",
      content: `Each lesson comes with 3 short activities to make the phrase stick. Complete these and see your conversational skills grow!

Keep Going!
Once you finish a lesson, the song will continue. Stay engaged—the more you listen, the better you’ll learn. New lessons will keep popping up!`
    }
  ];

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleReady = () => {
    onClose();
  };

  const renderParagraph = (para, idx) => {
    if (para.trim() === '') return null;

    if (para.includes(': ')) {
      const [boldPart, ...rest] = para.split(': ');
      return (
        <p key={idx} className="instructions-modal-paragraph">
          <strong>{boldPart}:</strong> {rest.join(': ')}
        </p>
      );
    } else {
      return (
        <p key={idx} className="instructions-modal-paragraph">
          <strong>{para}</strong>
        </p>
      );
    }
  };

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
          <h2 className="instructions-modal-title">
            {slides[currentSlide].title}
          </h2>
          {slides[currentSlide].content.split('\n').map((para, idx) => renderParagraph(para, idx))}
        </div>
        {currentSlide > 0 && (
          <button
            className="instructions-modal-nav-button left"
            onClick={goToPrevSlide}
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
        )}
        {currentSlide < slides.length - 1 && (
          <button
            className="instructions-modal-nav-button right"
            onClick={goToNextSlide}
            aria-label="Next Slide"
          >
            &#10095;
          </button>
        )}
        {currentSlide === slides.length - 1 && (
          <button className="instructions-modal-ready-button" onClick={handleReady}>
            I'm Ready
          </button>
        )}
        <div className="instructions-modal-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`instructions-modal-dot ${currentSlide === idx ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
