// src/components/Dashboard.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { auth, signOut } from '../firebaseConfig';
import './Dashboard.css';

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false); // New state for Contact Us popup
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
    const page = canvas?.parentElement;

    if (!canvas || !ctx || !page) return;

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
    };

    const resizeCanvas = () => {
      // Set canvas size based on the full page dimensions
      canvas.width = page.scrollWidth;
      canvas.height = page.scrollHeight;
      drawDots(); // Redraw dots after resizing
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial call to set canvas size and draw dots

    // Optional: Observe changes in the page size
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(page);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="dashboard-page">
      <canvas ref={canvasRef} className="background-canvas" aria-hidden="true" />
      <Navbar
        onAccountClick={() => setShowPopup(true)}
        onContactClick={() => setShowContactPopup(true)} // New prop for Contact Us button
      />

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
            <button onClick={() => navigate('/song/Korean')} className="language-button">
              <span role="img" aria-label="South Korea Flag">🇰🇷</span> Korean
            </button>
            <button onClick={() => navigate('/song/Portuguese')} className="language-button">
              <span role="img" aria-label="Portugal Flag">🇵🇹</span> Portuguese
            </button>
          </div>
        </div>

        {/* Support Us Section */}
        <div className="support-message">
          <p className="support-text">
            Thank you for testing the first version of LinguaBeats. This project is
            in its early stages, and your support can make a significant difference.
          </p>
          <p className="support-text">
            For <strong>any donation—Even just $1—</strong> you’ll unlock
            <strong> early access to new features</strong> and <strong>pay less than everyone else</strong> for future paid features.
            Help us <strong>become the Duolingo killer</strong> and take the fear out of conversational fluency.
          </p>
          <div className="action-buttons">
            <button className="support-button" onClick={() => navigate('/support-us')}>
              Support Us!
            </button>
            <button
              className="support-button"
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSe0VM_aS5XUP3JBXNYxIkJEpr99DoNZMybt-eGJJIeupMlZjQ/viewform?usp=sf_link',
                  '_blank'
                )
              }
            >
              Leave Feedback Here!
            </button>
            {/* Removed the Contact Us button from here */}
          </div>
        </div>
      </div>

      {/* Proverbs Text */}
      <div className="proverb-text">
        Proverbs 15:4 A wholesome tongue is a tree of life.
      </div>

      {/* Your Account Popup */}
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

      {/* Contact Us Popup */}
      {showContactPopup && (
        <div className="popup-overlay">
          <div className="popup-window">
            <button className="close-button" onClick={() => setShowContactPopup(false)}>
              &times;
            </button>
            <h2>Contact Us</h2>
            <p><strong>Business Inquiries:</strong> egipi18@gmail.com</p>
            <p><strong>Technical Inquiries:</strong> ianmcarscadden@gmail.com</p>
          </div>
        </div>
      )}
    </div>
  );
}
