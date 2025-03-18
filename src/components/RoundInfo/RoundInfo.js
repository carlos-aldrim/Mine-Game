import React from "react";
import styles from "./RoundInfo.module.css";

function RoundInfo({ currentRound, totalRounds, currentPlayer }) {
  return (
    <div className={styles.roundInfo}>
      <p>
        Rodada {currentRound} de {totalRounds}
      </p>
      <p>Vez de: {currentPlayer}</p>
    </div>
  );
}

export default RoundInfo;
