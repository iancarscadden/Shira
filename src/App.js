// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimerProvider } from './context/TimerContext'; // Import Timer Context
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import SongView from './components/SongView';
import LyricsView from './components/LyricsView';
import SupportUs from './components/SupportUs';

function App() {
  return (
    <TimerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/song/:language" element={<SongView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lyrics/:songId" element={<LyricsView />} />
          <Route path="/support-us" element={<SupportUs />} />
        </Routes>
      </Router>
    </TimerProvider>
  );
}

export default App;
