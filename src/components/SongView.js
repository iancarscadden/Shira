// src/components/SongView.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songsData from '../songs.json';
import Navbar from './Navbar';
import './SongView.css';

export default function SongView() {
  const { language } = useParams();
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Filter songs based on the selected language
  useEffect(() => {
    const filteredSongs = songsData.filter(song => song.language === language);
    setSongs(filteredSongs);
  }, [language]);

  // Set up the background canvas with dots
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

  // Handle navigation to the lyrics view for a specific song
  const handleSongClick = (songId) => {
    navigate(`/lyrics/${songId}`);
  };

  return (
    <div className="song-view-page">
      <canvas ref={canvasRef} className="background-canvas" />
      <Navbar text="Back to Dashboard" navigateTo="/dashboard" />
      <div className="content-container">
        <div className="back-arrow" onClick={() => navigate('/dashboard')}>
          &#8592;
        </div>
        <h1>{language}</h1>
        <p>Choose your song:</p>
        <div className="song-buttons">
          {songs.map((song, index) => (
            <button
              key={index}
              className="song-button"
              onClick={() => handleSongClick(song.youtube_id)} // Pass song ID to navigate
            >
              {song.song} - {song.artist}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
