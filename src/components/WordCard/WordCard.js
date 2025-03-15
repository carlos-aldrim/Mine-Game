import React from "react";
import styles from "./WordCard.module.css";

function WordCard({ currentWord, animationClass, borderColor }) {
  let animationClassName = "";
  
  if (animationClass === "orange") {
    animationClassName = styles.flashOrange;
  } else if (animationClass === "green") {
    animationClassName = styles.flashGreen;
  }

  return (
    <div
      className={`${styles.wordCard} ${animationClassName}`}
      style={{ borderColor }}
    >
      <h1>{currentWord.word}</h1>
      {currentWord.categoryIcon && (
        <span className={styles.categoryIcon}>{currentWord.categoryIcon}</span>
      )}
    </div>
  );
}

export default WordCard;
