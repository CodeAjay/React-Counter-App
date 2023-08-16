import React, { useState, useEffect } from "react";
import { FiGithub } from "react-icons/fi";

import "./style.css";

function Counter() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [countdownActive, setCountdownActive] = useState(false);
  const [styl, setStyl] = useState({ backgroundColor: "#14ebc7" });
  useEffect(() => {
    if (countdownActive && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
        if (remainingTime < 30) {
          setStyl({
            backgroundColor: "red"
          });
        } else if (remainingTime >= 30 && remainingTime < 100) {
          setStyl({
            backgroundColor: "#f9ff00"
          });
        } else if (remainingTime === 0) {
          setStyl({
            backgroundColor: "##14ebc7"
          });
        } else {
          setStyl({
            backgroundColor: "rgb(71 235 20)"
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCountdownActive(false);
    }
  }, [countdownActive, remainingTime]);

  const startCountdown = () => {
    if (days || hours || minutes || seconds) {
      const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
      setRemainingTime(totalSeconds);
      setCountdownActive(true);
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      alert("Please Enter a Valid Input");
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="App" style={styl}>
      <h1>Reverse Countdown Timer</h1>
      <div className="inputs">
        <div>
          <input
            type="number"
            placeholder="Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
          <p>Days</p>
        </div>
        <div>
          <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <p>Hours</p>
        </div>
        <div>
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <p>Minutes</p>
        </div>
        <div>
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
          <p>Seconds</p>
        </div>
      </div>
      <button onClick={startCountdown} disabled={countdownActive}>
        Start Countdown
      </button>
      <div className="countdown">
        {formatTime(Math.floor(remainingTime / 86400))}
        <span className="timer">d</span>{" "}
        {formatTime(Math.floor((remainingTime % 86400) / 3600))}
        <span className="timer">h</span>{" "}
        {formatTime(Math.floor((remainingTime % 3600) / 60))}
        <span className="timer">m</span> {formatTime(remainingTime % 60)}
        <span className="timer">s</span>
      </div>
      <div>
        <h4 className="copyright">
          Made by Ajay{" "}
          <a href="https://github.com/codeajay" target="_blank">
            <FiGithub />
          </a>
          With ❤️
        </h4>
      </div>
    </div>
  );
}

export default Counter;
