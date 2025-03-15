import React from "react";
import { FaGamepad } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import ModeButton from "../../components/ModeButton/ModeButton";
import styles from "./GameModeSelection.module.css";

function GameModeSelection({ onSelect }) {
  return (
    <div className={styles.modeSelection}>
      <h1 className={styles.title}>
        <FaGamepad /> Escolha o Modo de Jogo <FaGamepad />
      </h1>
      <h3 className={styles.subtitle}>
        <FiUsers /> Selecione o modo de jogar para iniciar a diversão!
      </h3>
      <div className={styles.buttonsContainer}>
        <ModeButton
          mode="solo"
          onClick={() => onSelect("solo")}
        />
        <ModeButton
          mode="team"
          onClick={() => onSelect("team")}
        />
      </div>
    </div>
  );
}

export default GameModeSelection;
