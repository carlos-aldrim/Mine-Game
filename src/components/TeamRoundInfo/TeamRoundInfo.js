import React from "react";
import styles from "./TeamRoundInfo.module.css";

function TeamRoundInfo({ currentRound, rounds, currentPlayer }) {
  return (
    <div className={styles.roundInfo}>
      <p>
        Rodada {currentRound} de {rounds}
      </p>
      <p>Vez de: {currentPlayer}</p>
    </div>
  );
}

export default TeamRoundInfo;
