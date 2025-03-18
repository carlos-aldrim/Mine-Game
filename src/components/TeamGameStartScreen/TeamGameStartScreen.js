import React from "react";
import { FaPlay } from "react-icons/fa";
import styles from "./TeamGameStartScreen.module.css";

function TeamGameStartScreen({ onStart }) {
  return (
    <div className={styles.startScreen}>
      <h3 className={styles.subtitle}>Desafie sua criatividade!</h3>
      <p className={styles.description}>
        Use as setas do teclado, os botões ou movimente a tela para passar ou
        acertar a palavra. Se estiver usando um smartphone, posicione o
        dispositivo na testa para jogar.
      </p>
      <button className={styles.startButton} onClick={onStart}>
        <FaPlay /> Iniciar
      </button>
    </div>
  );
}

export default TeamGameStartScreen;
