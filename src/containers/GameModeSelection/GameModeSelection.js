import React from "react";
import { FaGamepad, FaChevronRight } from "react-icons/fa";
import ModeButton from "../../components/ModeButton/ModeButton";
import styles from "./GameModeSelection.module.css";

function GameModeSelection({ onSelect }) {
  return (
    <div className={styles.modeSelection}>
      <div className={styles.titleContainer}>
        <FaGamepad className={styles.icon} />
        <h1 className={styles.title}>Escolha o Modo de Jogo</h1>
        <FaGamepad className={styles.icon} />
      </div>
      <div className={styles.subtitleContainer}>
        <FaChevronRight className={styles.iconLeft} />
        <h3 className={styles.subtitle}>Selecione o modo de jogar para iniciar a diversão!</h3>
      </div>
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
