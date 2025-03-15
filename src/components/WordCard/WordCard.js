import React from "react";
import "./WordCard.css";

function WordCard({ currentWord, animationClass, borderColor }) {
  return (
    <div className={`word-card ${animationClass}`} style={{ borderColor }}>
      <h1>{currentWord.word}</h1>
      {currentWord.categoryIcon && (
        <span className="category-icon">{currentWord.categoryIcon}</span>
      )}
    </div>
  );
}

export default WordCard;
