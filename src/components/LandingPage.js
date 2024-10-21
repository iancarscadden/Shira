// src/components/LandingPage.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './LandingPage.css';

export default function LandingPage() {
  const canvasRef = useRef(null);
  const pageRef = useRef(null); // Ref for the landing-page div
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const page = pageRef.current;

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
      // Calculate the full width and height based on the landing-page's dimensions
      const fullWidth = page.scrollWidth;
      const fullHeight = page.scrollHeight;
      canvas.width = fullWidth;
      canvas.height = fullHeight;
      drawDots(); // Redraw dots after resizing
    };

    window.addEventListener('resize', resizeCanvas);

    // Use ResizeObserver to detect changes in the landing-page's size
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(page);

    resizeCanvas(); // Initial call to set canvas size and draw dots

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="landing-page" ref={pageRef}>
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
          Effortless Conversations Start Here
        </button>
      </div>
    </div>
  );
}
