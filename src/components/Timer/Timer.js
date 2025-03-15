import React from "react";
import { FaClock } from "react-icons/fa";
import styles from "./Timer.module.css";

function Timer({ timeLeft, blinking }) {
  return (
    <div className={styles.timerContainer}>
      <div
        className={`${styles.timerBar} ${blinking ? styles.barBlinking : ""}`}
        style={{ width: `${(timeLeft / 60) * 100}%` }}
      ></div>
      <div className={`${styles.timer} ${blinking ? styles.blinking : ""}`}>
        <FaClock /> {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </div>
    </div>
  );
}

export default Timer;
