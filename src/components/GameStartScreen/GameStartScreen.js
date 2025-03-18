import React from "react";
import { FaPlay } from "react-icons/fa";
import styles from "./GameStartScreen.module.css";

function GameStartScreen({ onStart }) {
  return (
    <div className={styles.startScreen}>
      <h3 className={styles.subtitle}>Desafie sua criatividade!</h3>
      <p className={styles.description}>
        Prepare-se para se mover, se divertir e liberar toda a sua criatividade!
        O jogo está prestes a começar, então posicione seu dispositivo como
        preferir e boa sorte!
      </p>
      <button className={styles.startButton} onClick={onStart}>
        <FaPlay /> Iniciar
      </button>
    </div>
  );
}

export default GameStartScreen;
