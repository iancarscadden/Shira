// src/components/Navbar.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({
  onAccountClick,
  onContactClick, // New prop for Contact Us button
  onSeek, // Added onSeek prop to fix the undefined error
  text,
  navigateTo,
  isLyricsView,
  onPlayPause,
  isPlaying,
  currentTime,
  toggleAutoplay,
  isAutoplay,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/dashboard';
  const isSongView = location.pathname.includes('/song') && !isLyricsView;

  // Format the time counter as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Navbar for LyricsView with media controls and autoplay toggle
  if (isLyricsView) {
    return (
      <div className="navbar">
        <span className="back-link" onClick={() => navigate(navigateTo || '/dashboard')}>
          Back to Dashboard
        </span>
        <div className="nav-controls">
          <span className="time-counter">{formatTime(currentTime)}</span>
          <button className="nav-button" onClick={() => onSeek(-10)}>
            &#8592; 10s
          </button>
          <button className="nav-button" onClick={() => onSeek(-5)}>
            &#8592; 5s
          </button>
          <button className="nav-button" onClick={onPlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="nav-button" onClick={() => onSeek(5)}>
            5s &#8594;
          </button>
          <button className="nav-button" onClick={() => onSeek(10)}>
            10s &#8594;
          </button>
        </div>
      </div>
    );
  }

  // Navbar for SongView
  if (isSongView) {
    return (
      <div className="navbar">
        <span className="back-link" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </span>
      </div>
    );
  }

  // Navbar for Dashboard
  if (isDashboard) {
    return (
      <div className="navbar">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          LinguaBeats
        </div>
        <div className="navbar-buttons">
          <button className="header-button" onClick={onAccountClick}>
            Your Account
          </button>
          <button className="header-button" onClick={onContactClick}>
            Contact Us
          </button>
          <button className="header-button" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button className="header-button" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  // Default Navbar for Landing, Login, and Signup Pages
  const handleBrandClick = () => {
    const { pathname } = location;
    if (pathname === '/login' || pathname === '/signup') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="navbar">
      <span className="navbar-brand" onClick={handleBrandClick}>
        LinguaBeats
      </span>
      {/* Removed Log In and Sign Up buttons from default Navbar */}
      {/* If you need other buttons on the Landing Page Navbar, add them here */}
    </div>
  );
}
