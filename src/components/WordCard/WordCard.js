import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./WordCard.module.css";

function WordCard({ currentWord, animationClass, borderColor }) {
  const [showDescription, setShowDescription] = useState(false);

  let animationClassName = "";
  if (animationClass === "orange") {
    animationClassName = styles.flashOrange;
  } else if (animationClass === "green") {
    animationClassName = styles.flashGreen;
  }

  const toggleDescription = () => {
    setShowDescription(true);

    setTimeout(() => {
      setShowDescription(false);
    }, 3000);
  };

  return (
    <div
      className={`${styles.wordCard} ${animationClassName}`}
      style={{ borderColor, position: "relative" }}
    >
      <h1>{currentWord.word}</h1>
      {currentWord.categoryIcon && (
        <span className={styles.categoryIcon}>{currentWord.categoryIcon}</span>
      )}

      <FaInfoCircle
        className={styles.infoIcon}
        onClick={toggleDescription}
      />

      {showDescription && (
        <div className={styles.tooltip}>
          {currentWord.description}
        </div>
      )}
    </div>
  );
}

export default WordCard;
