// src/components/LandingPage.js
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const canvasRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 }); // Fixed: Properly defined cursorRef
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

    const dotSize = 4;
    const spacing = 30;
    const dots = [];

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        dots.push({ x, y, radius: dotSize / 2, originalRadius: dotSize / 2 });
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

    window.addEventListener('mousemove', (event) => {
      cursorRef.current = { x: event.clientX, y: event.clientY }; // Using cursorRef correctly
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <div className="landing-page">
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Navbar */}
      <div className="navbar">
        <div></div> {/* Empty div to maintain alignment */}
        <div className="navbar-buttons">
          <Link to="/login" className="header-button">Log In</Link>
          <Link to="/signup" className="header-button">Sign Up</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>LinguaBeats</h1>
        <div className="text-section">
          <section>
            <h2>Who we are</h2>
            <p>
              We’re two college students passionate about discovering and designing fun, engaging ways to make language learning more effective and enjoyable.
            </p>
          </section>
          <section>
            <h2>What we do</h2>
            <p>
              We focus on helping learners achieve conversational fluency that can be applied confidently in real-life situations.
            </p>
          </section>
          <section>
            <h2>Our Mission</h2>
            <p>
              Using music to bridge the gap between traditional language learning methods and verbal confidence, focusing on conversational fluency, contextualization, and cultural immersion.
            </p>
          </section>
        </div>
        <button className="start-button" onClick={() => navigate('/signup')}>
          Start Learning Now
        </button>
      </div>
    </div>
  );
}
