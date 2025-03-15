import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import ModeButton from "../../components/ModeButton/ModeButton";
import "./GameModeSelection.css";

function GameModeSelection({ onSelect }) {
  return (
    <div className="mode-selection">
      <h1 className="title">🎮 Escolha o Modo de Jogo 🎮</h1>
      <h3 className="subtitle">
        Selecione o modo de jogar para iniciar a diversão!
      </h3>
      <div className="buttons-container">
        <ModeButton
          mode="solo"
          icon={FaUser}
          label="Jogar Sozinho"
          onClick={() => onSelect("solo")}
        />
        <ModeButton
          mode="team"
          icon={FaUsers}
          label="Jogar em Equipe"
          onClick={() => onSelect("team")}
        />
      </div>
    </div>
  );
}

export default GameModeSelection;
