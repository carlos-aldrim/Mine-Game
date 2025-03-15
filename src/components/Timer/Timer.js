import React from "react";
import { FaClock } from "react-icons/fa";
import "./Timer.css";

function Timer({ timeLeft, blinking }) {
  return (
    <div className="timer-container">
      <div
        className={`timer-bar ${blinking ? "barBlinking" : ""}`}
        style={{ width: `${(timeLeft / 60) * 100}%` }}
      ></div>
      <div className={`timer ${blinking ? "blinking" : ""}`}>
        <FaClock /> {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </div>
    </div>
  );
}

export default Timer;
