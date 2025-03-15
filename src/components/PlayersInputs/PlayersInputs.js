import React from "react";
import "./PlayersInputs.css";

function PlayersInputs({ players, onPlayerChange }) {
  return (
    <div className="players-inputs">
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
