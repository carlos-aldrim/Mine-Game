import React from 'react';
import { FaUser, FaUsers } from 'react-icons/fa';
import styles from './ModeButton.module.css';

const ModeButton = ({ mode, onClick }) => {
  return (
    <button
      className={`${styles.modeButton} ${mode === 'solo' ? styles.solo : styles.team}`}
      onClick={onClick}
    >
      <span className={styles.icon}>
        {mode === 'solo' ? <FaUser /> : <FaUsers />}
      </span>
      {mode === 'solo' ? 'Jogar Sozinho' : 'Jogar em Equipe'}
    </button>
  );
};

export default ModeButton;
