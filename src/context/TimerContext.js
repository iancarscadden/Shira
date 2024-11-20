// src/context/TimerContext.js

import React, { createContext, useState, useEffect, useRef } from 'react';
import { auth } from '../firebaseConfig';

// Create the context
const TimerContext = createContext();

// TimerProvider component
export const TimerProvider = ({ children }) => {
  const [timerExpired, setTimerExpired] = useState(false);
  const timerRef = useRef(null); // To store the timer ID

  // Function to start the timer
  const startTimer = () => {
    // Check if timer is already running or has expired
    if (!timerRef.current && !timerExpired) {
      // Set timer duration (7 minutes = 420,000 ms)
      timerRef.current = setTimeout(() => {
        setTimerExpired(true);
        localStorage.setItem('timerExpired', 'true');
        timerRef.current = null; // Reset the timerRef
      }, 420000); // 7 minutes in milliseconds
    }
  };

  useEffect(() => {
    // Function to handle auth state changes
    const handleAuthStateChange = (user) => {
      if (user) {
        // User is logged in
        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        // Reset timerExpired state
        setTimerExpired(false);
        localStorage.setItem('timerExpired', 'false');
      } else {
        // User is not logged in
        // Check if timer has already expired
        const savedTime = localStorage.getItem('timerExpired');
        if (savedTime === 'true') {
          setTimerExpired(true);
        }
        // Do not start the timer here; it will be started when Dashboard mounts
      }
    };

    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);

    // Check current auth state on mount
    const currentUser = auth.currentUser;
    handleAuthStateChange(currentUser);

    return () => {
      unsubscribe();
      // Clean up the timer on unmount
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timerExpired]);

  return (
    <TimerContext.Provider value={{ timerExpired, setTimerExpired, startTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
