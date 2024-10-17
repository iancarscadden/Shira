// src/components/Dashboard.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { auth, signOut } from '../firebaseConfig';
import './Dashboard.css';

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false); // Pop-up state
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 30;

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 191, 255, 0.5)';
          ctx.fill();
        }
      }
      requestAnimationFrame(drawDots);
    };

    drawDots();
  }, []);

  return (
    <div className="dashboard-page">
      <canvas ref={canvasRef} className="background-canvas" />
      <Navbar onAccountClick={() => setShowPopup(true)} />

      <div className="content-container">
        <h1>Welcome To Your Dashboard</h1>
        <p className="small-text">Thank you for testing our product.</p>
        <div className="language-selection">
          <p>Pick your language to learn:</p>
          <div className="language-buttons">
            <button onClick={() => navigate('/song/Spanish')} className="language-button">
              <span role="img" aria-label="Spanish Flag">🇪🇸</span> Spanish
            </button>
            <button onClick={() => navigate('/song/French')} className="language-button">
              <span role="img" aria-label="French Flag">🇫🇷</span> French
            </button>
            <button onClick={() => navigate('/song/Arabic')} className="language-button">
              <span role="img" aria-label="Arabic Flag">🇸🇦</span> Arabic
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-window">
            <button className="close-button" onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <h2>Your Account</h2>
            <p>{auth.currentUser?.email}</p>
            <button onClick={handleSignOut} className="popup-signout-button">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
