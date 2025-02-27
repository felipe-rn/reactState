import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);

  const getCurrentTimeString = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const convertTimeStringToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    return (
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10)
    );
  };

  const createTimeString = (timeInSeconds) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
      2,
      '0'
    );
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const initializeTime = () => {
    const currentTimeString = getCurrentTimeString();
    const currentTimeInSeconds = convertTimeStringToSeconds(currentTimeString);
    setTime(currentTimeInSeconds);
    setInitialTime(currentTimeInSeconds);
  };

  const startTicking = () => {
    return setInterval(() => {
      setTime((prev) => (prev + 1) % 86400);
    }, 1000);
  };

  const resetTime = () => {
    setTime(initialTime);
  };

  const addMinutes = (minutes = 5) => {
    setTime((prev) => (prev + minutes * 60) % 86400);
  };

  const addSeconds = (seconds = 5) => {
    setTime((prev) => (prev + seconds) % 86400);
  };

  const removeMinutes = (minutes = 5) => {
    setTime((prev) => (prev - minutes * 60 + 86400) % 86400);
  };

  const removeSeconds = (seconds = 5) => {
    setTime((prev) => (prev - seconds + 86400) % 86400);
  };

  useEffect(() => {
    initializeTime();
    const intervalId = startTicking();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='container'>
        <div className='counter'>{createTimeString(time)}</div>
        <div className='buttonsList'>
          <button onClick={resetTime}>Reset</button>
          <button onClick={() => addMinutes(10)}>Add 10 mins</button>
          <button onClick={() => addSeconds(30)}>Add 30 seconds</button>
          <button onClick={() => removeMinutes(10)}>Remove 10 mins</button>
          <button onClick={() => removeSeconds(30)}>Remove 30 seconds</button>
        </div>
      </div>
    </>
  );
};

export default App;
