import React from "react";
import styles from "./WordCard.module.css";

function WordCard({ currentWord, animationClass, borderColor }) {
  return (
    <div className={`${styles.wordCard} ${animationClass}`} style={{ borderColor }}>
      <h1>{currentWord.word}</h1>
      {currentWord.categoryIcon && (
        <span className={styles.categoryIcon}>{currentWord.categoryIcon}</span>
      )}
    </div>
  );
}

export default WordCard;
