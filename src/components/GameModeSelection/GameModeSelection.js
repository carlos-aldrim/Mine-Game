import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import "./GameModeSelection.css";

function GameModeSelection({ onSelect }) {
  return (
    <div className="mode-selection">
      <h1 className="title">🎮 Escolha o Modo de Jogo 🎮</h1>
      <h3 className="subtitle">
        Selecione o modo de jogar para iniciar a diversão!
      </h3>
      <div className="buttons-container">
        <button className="mode-button solo" onClick={() => onSelect("solo")}>
          <FaUser className="icon" />
          Jogar Sozinho
        </button>
        <button className="mode-button team" onClick={() => onSelect("team")}>
          <FaUsers className="icon" />
          Jogar em Equipe
        </button>
      </div>
    </div>
  );
}

export default GameModeSelection;
