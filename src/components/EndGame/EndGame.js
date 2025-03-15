import React from 'react';
import styles from './EndGame.module.css';

const EndGame = ({ score, onRestart, onHome }) => {
  return (
    <div className={styles.endGame}>
      <h3>Parabéns!</h3>
      <p>Sua pontuação foi de {score} pontos</p>
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
};

export default EndGame;
