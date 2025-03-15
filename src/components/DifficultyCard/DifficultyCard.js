import React from "react";
import styles from "./DifficultyCard.module.css";

const DifficultyCard = ({ level, color, description, onSelect }) => (
  <div
    className={styles.difficultyCard}
    style={{ backgroundColor: color }}
    onClick={() => onSelect(level)}
  >
    <h2>{level}</h2>
    <p>{description}</p>
  </div>
);

export default DifficultyCard;
