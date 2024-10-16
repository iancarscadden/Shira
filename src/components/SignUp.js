// src/components/SignUp.js
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

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
    <div className="signup-page">
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Navbar */}
      <div className="navbar">
        <Link to="/" className="navbar-brand">
          LinguaBeats
        </Link>
        <div className="buttons">
          <Link to="/login" className="header-button">
            Log In
          </Link>
          <Link to="/signup" className="header-button">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="form-container">
        <h1>Create Account</h1>
        <form className="signup-form">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Create Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
