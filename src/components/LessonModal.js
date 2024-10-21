// src/components/LessonModal.js

import React, { useState, useEffect } from 'react';
import './LessonModal.css'; // Ensure this CSS file exists and is correctly imported

export default function LessonModal({ lesson, onClose }) {
  const [isTranslated, setIsTranslated] = useState(false);
  const [fillInBlankAnswer, setFillInBlankAnswer] = useState('');
  const [scenarioAnswer, setScenarioAnswer] = useState('');
  const [fillInBlankFeedback, setFillInBlankFeedback] = useState(null);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);
  const [shuffledFillInBlankOptions, setShuffledFillInBlankOptions] = useState([]);
  const [shuffledScenarioOptions, setShuffledScenarioOptions] = useState([]);

  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   */
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  /**
   * Toggles the translation state.
   */
  const toggleTranslation = () => {
    setIsTranslated((prev) => !prev);
  };

  /**
   * Handles answer selection for Fill in the Blank.
   */
  const handleFillInBlankSelection = (option) => {
    setFillInBlankAnswer(option);
    if (option === lesson.correct_answer) {
      setFillInBlankFeedback('Correct!');
    } else {
      setFillInBlankFeedback('Incorrect. Please try again.');
    }
  };

  /**
   * Handles answer selection for Scenario Question.
   */
  const handleScenarioSelection = (option) => {
    setScenarioAnswer(option);
    if (option === lesson.correct_option) {
      setScenarioFeedback('Correct!');
    } else {
      setScenarioFeedback('Incorrect. Please try again.');
    }
  };

  /**
   * Resets the lesson feedback and answers.
   */
  const resetLesson = () => {
    setFillInBlankAnswer('');
    setScenarioAnswer('');
    setFillInBlankFeedback(null);
    setScenarioFeedback(null);
  };

  /**
   * Handles closing the modal and resetting lesson state.
   */
  const handleClose = () => {
    resetLesson();
    onClose();
  };

  /**
   * Determines if both questions have been answered correctly.
   */
  const isContinueEnabled = () => {
    return fillInBlankFeedback === 'Correct!' && scenarioFeedback === 'Correct!';
  };

  /**
   * Determines if at least one question has been answered.
   */
  const hasAnsweredAny = () => {
    return fillInBlankFeedback !== null || scenarioFeedback !== null;
  };

  /**
   * Handles clicking the Continue button.
   */
  const handleContinue = () => {
    if (isContinueEnabled()) {
      handleClose();
    }
  };

  /**
   * Shuffles options whenever the lesson or translation state changes.
   */
  useEffect(() => {
    const nativeFillOptions = lesson.options_native || [];
    const translatedFillOptions = lesson.options_translation || [];
    const shuffledNativeFill = shuffleArray(nativeFillOptions);
    const shuffledTranslatedFill = shuffleArray(translatedFillOptions);
    setShuffledFillInBlankOptions(isTranslated ? shuffledTranslatedFill : shuffledNativeFill);

    const nativeScenarioOptions = lesson.scenario_options_native || [];
    const translatedScenarioOptions = lesson.scenario_options_translation || [];
    const shuffledNativeScenario = shuffleArray(nativeScenarioOptions);
    const shuffledTranslatedScenario = shuffleArray(translatedScenarioOptions);
    setShuffledScenarioOptions(isTranslated ? shuffledTranslatedScenario : shuffledNativeScenario);
  }, [lesson, isTranslated]);

  return (
    <div className="lesson-modal-overlay" onClick={handleClose}>
      <div className="lesson-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Bar with Close and Translate Buttons */}
        <div className="modal-top-bar">
          <button className="close-button" onClick={handleClose} aria-label="Close Lesson Modal">
            &times;
          </button>
          <button className="translate-button" onClick={toggleTranslation}>
            {isTranslated ? 'Show Original' : 'Translate'}
          </button>
        </div>

        {/* Phrase Display */}
        <div className="phrase-container">
          <p className="phrase-text">
            "{isTranslated ? lesson.phrase_translation : lesson.phrase_native}"
          </p>
          <p className="phrase-label">Phrase</p>
        </div>

        {/* Context Section */}
        <div className="lesson-section">
          <h3>Context</h3>
          <p>{isTranslated ? lesson.context_translation || lesson.context : lesson.context}</p>
        </div>

        {/* Fill in the Blank Section */}
        <div className="lesson-section">
          <h3>Fill in the Blank</h3>
          <p>{isTranslated ? lesson.fill_in_blank_translation : lesson.fill_in_blank}</p>
          <div className="options-container">
            {shuffledFillInBlankOptions.map((option, index) => (
              <button
                key={index}
                className={`option-button ${fillInBlankAnswer === option ? 'selected' : ''}`}
                onClick={() => handleFillInBlankSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {fillInBlankFeedback && (
            <p className={`feedback ${fillInBlankFeedback === 'Correct!' ? 'correct' : 'incorrect'}`}>
              {fillInBlankFeedback}
            </p>
          )}
        </div>

        {/* Scenario Question Section */}
        <div className="lesson-section">
          <h3>Scenario Question</h3>
          <p>{isTranslated ? lesson.scenario_question_translation : lesson.scenario_question_native}</p>
          <div className="options-container">
            {shuffledScenarioOptions.map((option, index) => (
              <button
                key={index}
                className={`option-button ${scenarioAnswer === option ? 'selected' : ''}`}
                onClick={() => handleScenarioSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {scenarioFeedback && (
            <p className={`feedback ${scenarioFeedback === 'Correct!' ? 'correct' : 'incorrect'}`}>
              {scenarioFeedback}
            </p>
          )}
        </div>

        {/* Buttons at the Bottom */}
        <div className="lesson-buttons">
          {/* Reset Answers Button - Only visible if at least one question has been answered */}
          {hasAnsweredAny() && (
            <button className="lesson-button" onClick={resetLesson}>
              Reset Answers
            </button>
          )}

          {/* Continue Button */}
          <button
            className={`continue-button ${isContinueEnabled() ? 'enabled' : 'disabled'}`}
            onClick={handleContinue}
            disabled={!isContinueEnabled()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
