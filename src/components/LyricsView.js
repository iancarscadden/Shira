// src/components/LyricsView.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songsData from '../songs.json';
import Navbar from './Navbar';
import './LyricsView.css';

export default function LyricsView() {
  const { songId } = useParams();
  const [song, setSong] = useState(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const navigate = useNavigate();
  const intervalRef = useRef(null); // Track interval for cleanup

  // Fetch the song based on the songId
  useEffect(() => {
    const foundSong = songsData.find((s) => s.youtube_id === songId);
    if (foundSong) setSong(foundSong);
  }, [songId]);

  // Load and initialize the YouTube player
  useEffect(() => {
    if (!song) return;

    const loadYouTubePlayer = () => {
      const player = new window.YT.Player(playerRef.current, {
        videoId: song.youtube_id,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onReady: () => console.log('YouTube player ready'),
          onStateChange: handleStateChange,
        },
      });

      playerRef.current.player = player;
    };

    if (window.YT) {
      loadYouTubePlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = loadYouTubePlayer;
      document.body.appendChild(tag);
    }

    // Cleanup YouTube player when navigating away
    return () => {
      if (playerRef.current?.player) {
        playerRef.current.player.destroy();
      }
      clearInterval(intervalRef.current);
    };
  }, [song]);

  // Handle the state change of the YouTube player
  const handleStateChange = (event) => {
    const playerState = event.data;
    if (playerState === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        const time = Math.floor(playerRef.current.player.getCurrentTime());
        setCurrentTime(time);
      }, 1000);
    } else {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  };

  const handlePlayPause = () => {
    const player = playerRef.current.player;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleSeek = (seconds) => {
    const player = playerRef.current.player;
    const newTime = Math.max(0, currentTime + seconds);
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  if (!song) return <div>Loading...</div>;

  return (
    <div className="lyrics-view">
      <Navbar
        isLyricsView={true}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        isPlaying={isPlaying}
        currentTime={currentTime}
      />
      <div className="content-container">
        <div className="back-arrow" onClick={() => navigate(-1)}>
          &#8592; {/* Back arrow */}
        </div>
        <div className="video-container">
          <div ref={playerRef} className="youtube-player"></div>
        </div>
        <div className="lyrics-container">
          <div className="lyrics-left">
            <h2>English Lyrics</h2>
            <p className="lyrics-text">{song.lyrics_english}</p>
          </div>
          <div className="lyrics-right">
            <h2>{song.language} Lyrics</h2>
            <p className="lyrics-text">{song.lyrics}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
