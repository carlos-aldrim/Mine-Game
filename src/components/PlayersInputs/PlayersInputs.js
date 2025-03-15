import React, { useState } from 'react';
import styles from './PlayersInputs.module.css';

const PlayersInputs = ({ onSubmit }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSubmit = () => {
    onSubmit({ player1, player2 });
  };

  return (
    <div className={styles.playersInputs}>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Jogador 1</label>
        <input
          className={styles.inputField}
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Jogador 2</label>
        <input
          className={styles.inputField}
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Começar Jogo</button>
    </div>
  );
};

export default PlayersInputs;
