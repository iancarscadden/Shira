// src/components/SongView.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songsData from '../data/songs.json';
import Navbar from './Navbar';
import './SongView.css';

export default function SongView() {
  const { language } = useParams();
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  /**
   * Filter songs based on the selected language (case-insensitive).
   */
  useEffect(() => {
    const filteredSongs = songsData.filter(
      song => song.language.toLowerCase() === language.toLowerCase()
    );
    console.log(`Filtered songs for language "${language}":`, filteredSongs);
    setSongs(filteredSongs);
  }, [language]);

  /**
   * Set up the background canvas with animated dots.
   */
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

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  /**
   * Handle navigation to the LyricsView for a specific song.
   * Passes the song title as the songId parameter.
   */
  const handleSongClick = (songTitle) => {
    console.log(`Navigating to lyrics view for song: ${songTitle}`);
    navigate(`/lyrics/${songTitle}`);
  };

  return (
    <div className="song-view-page">
      <canvas ref={canvasRef} className="background-canvas" />
      <Navbar text="Back to Dashboard" navigateTo="/dashboard" />
      <div className="content-container">
        <div className="back-arrow" onClick={() => navigate('/dashboard')}>
          &#8592; {/* Back arrow */}
        </div>
        <h1>{language}</h1>
        <p>Choose your song:</p>
        <div className="song-buttons">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <button
                key={index}
                className="song-button"
                onClick={() => handleSongClick(song.song)} // Pass song title to navigate
              >
                {song.song} - {song.artist}
              </button>
            ))
          ) : (
            <p>No songs available for the selected language.</p>
          )}
        </div>
      </div>
    </div>
  );
}
