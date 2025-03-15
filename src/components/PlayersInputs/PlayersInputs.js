import React from "react";
import styles from "./PlayersInputs.module.css";

function PlayersInputs({ players, onPlayerChange }) {
  return (
    <div className={styles.playersInputs}>
      {players.map((player, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Nome da Equipe ${index + 1}`}
          value={player}
          onChange={(e) => onPlayerChange(index, e.target.value)}
          maxLength={25}
        />
      ))}
    </div>
  );
}

export default PlayersInputs;
