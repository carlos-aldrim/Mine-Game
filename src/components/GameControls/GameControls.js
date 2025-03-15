import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from './GameControls.module.css';

const GameControls = ({ onPass, onCorrect }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.passButton} onClick={onPass}>
        <FaTimesCircle /> Passar
      </button>
      <button className={styles.correctButton} onClick={onCorrect}>
        <FaCheckCircle /> Correto
      </button>
    </div>
  );
};

export default GameControls;
