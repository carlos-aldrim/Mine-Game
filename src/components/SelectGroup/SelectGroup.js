import React from "react";
import styles from "./SelectGroup.module.css";

function SelectGroup({ numPlayers, numRounds, onPlayersChange, onRoundsChange }) {
  return (
    <div className={styles.selectGroup}>
      <div>
        <label>Nº de Equipe:</label>
        <select
          value={numPlayers}
          onChange={(e) => onPlayersChange(parseInt(e.target.value, 10))}
        >
          {[2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Nº de Rodadas:</label>
        <select
          value={numRounds}
          onChange={(e) => onRoundsChange(parseInt(e.target.value, 10))}
        >
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectGroup;
