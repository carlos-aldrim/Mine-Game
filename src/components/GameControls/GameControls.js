import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from './GameControls.module.css';

const GameControls = ({ handlePass, handleCorrect }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.passButton} onClick={handlePass}>
        <FaTimesCircle /> Passar
      </button>
      <button className={styles.correctButton} onClick={handleCorrect}>
        <FaCheckCircle /> Correto
      </button>
    </div>
  );
};

export default GameControls;
