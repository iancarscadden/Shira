// src/components/SupportUs.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SupportUs.css';
import venmoImage from '../assets/venmo.jpg';

export default function SupportUs() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

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
    <div className="support-us-page">
      <canvas ref={canvasRef} className="background-canvas" />
      <div className="content-container">
        <h1>Support Us</h1>
        <p>
          Your donation, no matter how small, helps us grow. Just $1 unlocks
          early access to new features and discount pricing when we launch!
        </p>
        <div className="venmo-container">
          <img src={venmoImage} alt="Venmo QR Code" className="venmo-image" />
          <p>
            Please include the email associated with your account and mention how you heard
            about us in the Venmo description.
          </p>
        </div>
        <button className="return-button" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
