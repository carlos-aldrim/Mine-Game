import React from "react";
import Countdown from "../Countdown/Countdown";
import styles from "./TeamGamePlay.module.css";

function TeamGamePlay({ countdown, timeLeft, children }) {
  return (
    <div className={styles.playContainer}>
      {countdown > 0 ? (
        <Countdown value={countdown} />
      ) : (
        timeLeft > 0 && <div className={styles.gameContainer}>{children}</div>
      )}
    </div>
  );
}

export default TeamGamePlay;