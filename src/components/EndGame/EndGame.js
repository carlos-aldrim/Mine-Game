import React from 'react';
import styles from './EndGame.module.css';

const EndGame = ({ onRestart, onHome, title, subtitle }) => {
  return (
    <div className={styles.endGame}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
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
