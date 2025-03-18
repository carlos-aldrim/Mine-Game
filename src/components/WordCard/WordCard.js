import React, { useState, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./WordCard.module.css";

function WordCard({ currentWord, animationClass, borderColor }) {
  const [showDescription, setShowDescription] = useState(false);
  const holdTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  let animationClassName = "";
  if (animationClass === "orange") {
    animationClassName = styles.flashOrange;
  } else if (animationClass === "green") {
    animationClassName = styles.flashGreen;
  }

  const handleInfoMouseDown = () => {
    holdTimerRef.current = setTimeout(() => {
      setShowDescription(true);
      hideTimerRef.current = setTimeout(() => {
        setShowDescription(false);
      }, 3000);
    }, 500);
  };

  const handleInfoMouseUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handleInfoTouchStart = handleInfoMouseDown;
  const handleInfoTouchEnd = handleInfoMouseUp;

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
        onMouseDown={handleInfoMouseDown}
        onMouseUp={handleInfoMouseUp}
        onTouchStart={handleInfoTouchStart}
        onTouchEnd={handleInfoTouchEnd}
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
