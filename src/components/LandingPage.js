// src/components/LandingPage.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './LandingPage.css';

export default function LandingPage() {
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
    <div className="landing-page">
      <canvas ref={canvasRef} className="background-canvas" />
      <Navbar /> {/* Include Navbar */}
      <div className="main-content">
        <h1>LinguaBeats</h1>
        <div className="text-section">
          <section>
            <h2>Who we are</h2>
            <p>
              We’re two college students passionate about discovering and designing fun,
              engaging ways to make language learning more effective and enjoyable.
            </p>
          </section>
          <section>
            <h2>What we do</h2>
            <p>
              We focus on helping learners achieve conversational fluency that can be
              applied confidently in real-life situations.
            </p>
          </section>
          <section>
            <h2>Our Mission</h2>
            <p>
              Using music to bridge the gap between traditional language learning methods
              and verbal confidence, focusing on conversational fluency, contextualization,
              and cultural immersion.
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
