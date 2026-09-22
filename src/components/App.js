import './../styles/App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  // Time in centiseconds
  const [time, setTime] = useState(0);
  // Array of lap times (in centiseconds)
  const [laps, setLaps] = useState([]);
  // Whether the timer is running
  const [isRunning, setIsRunning] = useState(false);
  // Mutable reference to the interval timer
  const intervalRef = useRef(null);

  // Start / stop the interval based on isRunning
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // 1 centisecond = 10ms
    }

    // Cleanup: clear interval on stop or unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // Pad a number to 2 digits
  const pad = (num) => String(num).padStart(2, '0');

  // Format centiseconds -> MM:SS:CS
  const formatTime = (cs) => {
    const minutes = Math.floor(cs / 6000);
    const seconds = Math.floor((cs % 6000) / 100);
    const centis = cs % 100;
    return `${pad(minutes)}:${pad(seconds)}:${pad(centis)}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleLap = () => {
    setLaps((prev) => [...prev, time]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Timer display */}
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>
        {formatTime(time)}
      </div>

      {/* Control buttons */}
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleLap}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Lap list */}
      <ul style={{ marginTop: '16px', paddingLeft: '24px' }}>
        {laps.map((lap, index) => (
          <li key={index} style={{ fontFamily: 'monospace', marginBottom: '4px' }}>
            {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;