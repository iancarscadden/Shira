// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import SongView from './components/SongView';
import LyricsView from './components/LyricsView';
import SupportUs from './components/SupportUs';
// import { auth } from './firebaseConfig';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/song/:language" element={<SongView />} />
        {/* Dashboard is now accessible without authentication */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lyrics/:songId" element={<LyricsView />} />
        <Route path="/support-us" element={<SupportUs />} />
      </Routes>
    </Router>
  );
}

export default App;
