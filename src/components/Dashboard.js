import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { auth, signOut } from '../firebaseConfig';
import './Dashboard.css';
import { FaRegHeart, FaRegComment } from 'react-icons/fa'; // Importing minimalistic icons

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to Landing Page after sign out
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
      canvas.width = page.scrollWidth;
      canvas.height = page.scrollHeight;
      drawDots();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

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
        onContactClick={() => setShowContactPopup(true)}
      />

      <div className="content-container">
        <h1>Welcome To Your Dashboard</h1>

        <div className="dashboard-section">
          {/* Left Box: Language Selection */}
          <div className="left-box">
            <p className="section-title">Pick your language to learn:</p>
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

          {/* Right Box: Support Us */}
          <div className="right-box">
            <p className="section-title">Support Us</p>
            <ul className="support-list">
              <li>Just $1 unlocks early access</li>
              <li>Enjoy future discounts</li>
              <li>Help build the 'Duolingo killer'</li>
            </ul>
            <button className="donate-button" onClick={() => navigate('/support-us')}>
              <FaRegHeart className="button-icon" /> Donate $1
            </button>
            <button
              className="feedback-button"
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSe0VM_aS5XUP3JBXNYxIkJEpr99DoNZMybt-eGJJIeupMlZjQ/viewform?usp=sf_link',
                  '_blank'
                )
              }
            >
              <FaRegComment className="button-icon" /> Give Feedback
            </button>
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
            <p><strong>Business Inquiries:</strong> edglobal18@gmail.com</p>
            <p><strong>Technical Inquiries:</strong> iancarscadden2@gmail.com</p>
          </div>
        </div>
      )}
    </div>
  );
}
