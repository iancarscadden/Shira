// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this points to App.js
import './index.css'; // If you have global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
