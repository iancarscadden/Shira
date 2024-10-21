// src/components/JumpToLessonModal.js

import React from 'react';
import './JumpToLessonModal.css'; // Ensure this CSS file exists and styles the modal appropriately

export default function JumpToLessonModal({ lessons, onClose, onSelectLesson }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Jump to Lesson</h2>
        <div className="lessons-list">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <button
                key={lesson.lesson_id}
                className="lesson-button"
                onClick={() => onSelectLesson(lesson)}
              >
                {/* Display only the lesson number */}
                Lesson {index + 1}
              </button>
            ))
          ) : (
            <p>No lessons available.</p>
          )}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
