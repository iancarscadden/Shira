// src/components/SignUp.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
  const canvasRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });

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

    const dotSize = 4;
    const spacing = 30;
    const dots = [];

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        dots.push({
          x,
          y,
          radius: dotSize / 2,
          originalRadius: dotSize / 2,
        });
      }
    }

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        const distance = Math.sqrt(
          Math.pow(dot.x - cursorRef.current.x, 2) +
            Math.pow(dot.y - cursorRef.current.y, 2)
        );
        const maxDistance = 100;
        const scale = Math.max(0, 1 - distance / maxDistance);
        dot.radius = dot.originalRadius + dot.originalRadius * scale;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${0.3 + scale * 0.7})`;
        ctx.fill();
      });

      requestAnimationFrame(drawDots);
    };

    drawDots();

    const handleMouseMove = (event) => {
      cursorRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="signup-page">
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Header: Log In / Sign Up Buttons */}
      <div className="header">
        <div className="buttons">
          <Link
            to="/login"
            className="header-button"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="header-button"
          >
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

          <button type="submit" className="submit-button">Create Account</button>
        </form>
      </div>
    </div>
  );
}
