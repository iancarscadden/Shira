// src/components/LandingPage.js

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './LandingPage.css';

export default function LandingPage() {
  const canvasRef = useRef(null);
  const pageRef = useRef(null); // Ref for the landing-page div
  const navigate = useNavigate();

  // State to manage dropdown visibility
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false);
  const [isOurMissionOpen, setIsOurMissionOpen] = useState(false);

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

  // Handlers to toggle dropdowns
  const toggleWhoWeAre = () => {
    setIsWhoWeAreOpen((prev) => !prev);
  };

  const toggleWhatWeDo = () => {
    setIsWhatWeDoOpen((prev) => !prev);
  };

  const toggleOurMission = () => {
    setIsOurMissionOpen((prev) => !prev);
  };

  return (
    <div className="landingPage-container" ref={pageRef}>
      <canvas ref={canvasRef} className="landingPage-backgroundCanvas" />
      <Navbar /> {/* Include Navbar */}
      <div className="landingPage-mainContent">
        {/* Left Side: Text Content */}
        <div className="landingPage-leftContent">
          <h1>Shira</h1>
          <div className="landingPage-textSection">
            <section className="landingPage-dropdownSection">
              <h2 onClick={toggleWhoWeAre} className="landingPage-dropdownHeader">
                Who we are
                <span className={`landingPage-arrow ${isWhoWeAreOpen ? 'landingPage-arrowUp' : 'landingPage-arrowDown'}`}></span>
              </h2>
              {isWhoWeAreOpen && (
                <p className="landingPage-dropdownContent">
                  We’re two college students passionate about discovering and designing fun,
                  engaging ways to make language learning more effective and enjoyable.
                </p>
              )}
            </section>
            <section className="landingPage-dropdownSection">
              <h2 onClick={toggleWhatWeDo} className="landingPage-dropdownHeader">
                What we do
                <span className={`landingPage-arrow ${isWhatWeDoOpen ? 'landingPage-arrowUp' : 'landingPage-arrowDown'}`}></span>
              </h2>
              {isWhatWeDoOpen && (
                <p className="landingPage-dropdownContent">
                  We focus on helping learners achieve conversational fluency that can be
                  applied confidently in real-life situations.
                </p>
              )}
            </section>
            <section className="landingPage-dropdownSection">
              <h2 onClick={toggleOurMission} className="landingPage-dropdownHeader">
                Our Mission
                <span className={`landingPage-arrow ${isOurMissionOpen ? 'landingPage-arrowUp' : 'landingPage-arrowDown'}`}></span>
              </h2>
              {isOurMissionOpen && (
                <p className="landingPage-dropdownContent">
                  Using music to bridge the gap between traditional language learning methods
                  and verbal confidence, focusing on conversational fluency, contextualization,
                  and cultural immersion.
                </p>
              )}
            </section>
          </div>
          <button className="landingPage-startButton" onClick={() => navigate('/dashboard')}>
            Effortless Conversations Start Here
          </button>
        </div>
        {/* Right Side: Embedded Video */}
        <div className="landingPage-rightContent">
          <div className="landingPage-videoContainer">
            <iframe
              src="https://www.youtube.com/embed/SbkBVIgY5Q8"
              title="Shira Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
