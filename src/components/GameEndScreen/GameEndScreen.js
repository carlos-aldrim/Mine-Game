import React from "react";
import styles from "./GameEndScreen.module.css";

function GameEndScreen({ score, onRestart, onHome }) {
  return (
    <div className={styles.endGame}>
      <h3>{score > 0 ? "Parabéns!" : "Tente novamente,"}</h3>
      <p>
        {score > 0
          ? `Sua pontuação foi de ${score} ponto(s).`
          : "Você não acertou nenhuma."}
      </p>
      <div className={styles.endGameButtons}>
        <button className={styles.restartButton} onClick={onRestart}>
          Reiniciar
        </button>
        <button className={styles.homeButton} onClick={onHome}>
          Voltar para Início
        </button>
      </div>
    </div>
  );
}

export default GameEndScreen;
