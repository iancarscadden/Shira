// src/components/LyricsView.js

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import LessonModal from './LessonModal';
import JumpToLessonModal from './JumpToLessonModal';
import './LyricsView.css';
import songsData from '../data/songs.json';
import lessonsData from '../data';

export default function LyricsView() {
  const { songId } = useParams(); // e.g., 'Cántalo'
  const navigate = useNavigate();
  const canvasRef = useRef(null); // Reference to the background canvas
  const playerRef = useRef(null); // Reference to YouTube player

  // State variables
  const [song, setSong] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [timestampMapping, setTimestampMapping] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isAutoplay, setIsAutoplay] = useState(false); // Default to Off
  const [isJumpModalOpen, setIsJumpModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // YouTube Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Interval and triggered lessons tracking
  const intervalRef = useRef(null);
  const triggeredLessonsRef = useRef(new Set());

  /**
   * Fetch the song data from songs.json based on the song title.
   */
  useEffect(() => {
    const fetchSong = () => {
      console.log(`Fetching song data for songId: "${songId}"`);
      const songData = songsData.find(
        songItem => songItem.song.toLowerCase() === songId.toLowerCase()
      );
      if (songData) {
        console.log('Song found:', songData);
        setSong(songData);
      } else {
        console.error(`Song with title "${songId}" not found in songs.json`);
        setError(`Song "${songId}" not found.`);
        setIsLoading(false);
      }
    };
    fetchSong();
  }, [songId]);

  /**
   * Fetch lessons and timestamp mappings from local JSON file.
   */
  useEffect(() => {
    const fetchLessonsFromJSON = () => {
      if (!songId) {
        console.warn('No songId provided.');
        setIsLoading(false);
        return;
      }

      try {
        console.log(`Fetching lessons for songId: "${songId}"`);
        const songLessonsData = lessonsData[songId];

        if (songLessonsData) {
          const fetchedLessons = songLessonsData.lessons || [];
          const fetchedTimestampMapping = songLessonsData.timestamp_mapping || {};

          setLessons(fetchedLessons);
          setTimestampMapping(fetchedTimestampMapping);
          console.log('Lessons set:', fetchedLessons);
          console.log('Timestamp mapping set:', fetchedTimestampMapping);
        } else {
          console.warn(`No lessons found for song "${songId}" in JSON.`);
          setLessons([]);
          setTimestampMapping({});
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching lessons from JSON:', err);
        setError('Failed to load lessons.');
        setIsLoading(false);
      }
    };

    fetchLessonsFromJSON();
  }, [songId]);

  /**
   * Initialize the YouTube player and handle state changes.
   */
  useEffect(() => {
    if (!song) {
      console.warn('Song data not available yet.');
      return;
    }

    let player;
    const currentPlayerRef = playerRef.current; // Capture the current ref

    const handleStateChange = event => {
      const playerState = event.data;
      if (playerState === window.YT.PlayerState.PLAYING) {
        console.log('Video started playing');
        setIsPlaying(true);

        // Clear any existing interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        // Start interval to monitor current time
        intervalRef.current = setInterval(() => {
          if (player && player.getCurrentTime) {
            const time = Math.floor(player.getCurrentTime());
            setCurrentTime(time);

            // Check if a lesson should be triggered
            if (
              isAutoplay &&
              timestampMapping[time] &&
              !triggeredLessonsRef.current.has(time)
            ) {
              const lessonId = timestampMapping[time];
              const lesson = lessons.find(l => l.lesson_id === lessonId);
              if (lesson) {
                console.log(`Triggering lesson at time ${time}:`, lesson);
                setCurrentLesson(lesson);
                triggeredLessonsRef.current.add(time);
                player.pauseVideo(); // Pause the video when lesson is triggered
              }
            }
          }
        }, 1000);
      } else {
        console.log('Video paused or ended');
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    const loadYouTubePlayer = () => {
      player = new window.YT.Player(currentPlayerRef, {
        videoId: song.youtube_id, // Ensure 'youtube_id' is present in song data
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onReady: () => {
            console.log('YouTube player ready');
            // Optionally, autoplay the video
            // player.playVideo();
          },
          onStateChange: handleStateChange,
        },
      });

      // Assign the player instance to playerRef.current.player
      currentPlayerRef.player = player;
    };

    // Load YouTube IFrame API if not already loaded
    if (window.YT && window.YT.Player) {
      loadYouTubePlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = loadYouTubePlayer;
      document.body.appendChild(tag);
    }

    // Cleanup function to destroy the player and clear intervals
    return () => {
      if (currentPlayerRef && currentPlayerRef.player) {
        currentPlayerRef.player.destroy();
        console.log('YouTube player destroyed');
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log('Interval cleared');
      }
    };
  }, [song, isAutoplay, timestampMapping, lessons]);

  /**
   * Handles play/pause functionality of the YouTube player.
   */
  const handlePlayPause = () => {
    const player = playerRef.current.player;
    if (player && typeof player.playVideo === 'function') {
      if (isPlaying) {
        player.pauseVideo();
        console.log('Pausing video');
      } else {
        player.playVideo();
        console.log('Playing video');
      }
    } else {
      console.warn('Player not ready to play/pause');
    }
  };

  /**
   * Handles seeking the YouTube video by a specified number of seconds.
   */
  const handleSeek = seconds => {
    const player = playerRef.current.player;
    if (player && typeof player.seekTo === 'function') {
      const newTime = Math.max(0, currentTime + seconds);
      player.seekTo(newTime, true);
      setCurrentTime(newTime);
      console.log(`Seeking to time ${newTime} seconds`);
    } else {
      console.warn('Player not ready to seek');
    }
  };

  /**
   * Toggles the autoplay functionality via the button.
   */
  const toggleAutoplayButton = () => {
    setIsAutoplay(prev => !prev);
    console.log(`Autoplay set to ${!isAutoplay}`);
  };

  /**
   * Opens the "Jump to Lesson" modal.
   */
  const openJumpModal = () => {
    console.log('Opening JumpToLessonModal');
    setIsJumpModalOpen(true);
  };

  /**
   * Closes the "Jump to Lesson" modal.
   */
  const closeJumpModal = () => {
    console.log('Closing JumpToLessonModal');
    setIsJumpModalOpen(false);
  };

  /**
   * Handles selecting a lesson from the modal.
   * Seeks the video to the lesson's timestamp and pauses the video.
   */
  const handleSelectLesson = lesson => {
    console.log('Selected lesson:', lesson);
    const player = playerRef.current.player;
    // Find the timestamp for the selected lesson
    const timestampEntries = Object.entries(timestampMapping);
    const matchingEntry = timestampEntries.find(([time, id]) => id === lesson.lesson_id);
    if (matchingEntry) {
      const [timeStr] = matchingEntry;
      const time = parseInt(timeStr, 10);
      if (player && typeof player.seekTo === 'function') {
        player.seekTo(time, true);
        setCurrentTime(time);
        setCurrentLesson(lesson);
        triggeredLessonsRef.current.add(time);
        console.log(`Selected lesson '${lesson.lesson_id}' at time ${time}`);
        player.pauseVideo(); // Pause the video when a lesson is selected
        closeJumpModal();
      } else {
        console.warn('Player not ready to seek');
      }
    } else {
      console.warn(`No timestamp found for lesson ID "${lesson.lesson_id}"`);
    }
  };

  /**
   * Handles closing the LessonModal and resumes video playback.
   */
  const handleCloseLessonModal = () => {
    setCurrentLesson(null);
    const player = playerRef.current.player;
    if (player && typeof player.playVideo === 'function') {
      player.playVideo();
      console.log('Resuming video playback');
    }
  };

  /**
   * Draw Dot Effect on the Background Canvas
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const lyricsView = canvas?.parentElement;

    if (!canvas || !ctx || !lyricsView) {
      console.warn('Background canvas not found or context not available.');
      return; // Exit if the canvas is not found or context unavailable
    }

    // Define dot properties
    const dotColor = 'rgba(0, 191, 255, 0.5)'; // Semi-transparent blue
    const dotRadius = 2;
    const dotSpacing = 30; // Distance between dots

    // Function to draw dots
    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = dotColor;

      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = lyricsView.scrollWidth;
      canvas.height = lyricsView.scrollHeight;
      drawDots(); // Redraw dots after resizing
    };

    // Initial resize
    resizeCanvas();

    // Use ResizeObserver to watch for changes in the lyrics-view's size
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(lyricsView);

    // Cleanup
    return () => {
      resizeObserver.unobserve(lyricsView);
    };
  }, []);

  /**
   * Conditional rendering based on the availability of song data.
   */
  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (error) {
    return <div className="error-screen">{error}</div>;
  }

  return (
    <div className="lyrics-view">
      {/* Background Canvas for Dot Effect */}
      <canvas ref={canvasRef} className="background-canvas" aria-hidden="true"></canvas>

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
          {/* Button Group Positioned to the Right of the Video */}
          <div className="button-group">
            <button className="button button-oval" onClick={openJumpModal}>
              Jump to Lesson
            </button>
            <button
              className="button button-oval autoplay-button"
              onClick={toggleAutoplayButton}
            >
              Lessons Autoplay: {isAutoplay ? 'On' : 'Off'}
            </button>
          </div>
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

      {/* Lesson Modal */}
      {currentLesson && (
        <LessonModal
          lesson={currentLesson}
          onClose={handleCloseLessonModal} // Use the new handler to resume playback
        />
      )}

      {/* Jump to Lesson Modal */}
      {isJumpModalOpen && (
        <JumpToLessonModal
          lessons={lessons}
          onClose={closeJumpModal}
          onSelectLesson={handleSelectLesson}
        />
      )}
    </div>
  );
}
