import React from "react";
import "./TeamRoundInfo.css";

function TeamRoundInfo({ currentRound, rounds, currentPlayer }) {
  return (
    <div className="round-info">
      <p>
        Rodada {currentRound} de {rounds}
      </p>
      <p>Vez de: {currentPlayer}</p>
    </div>
  );
}

export default TeamRoundInfo;
