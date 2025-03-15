import React from "react";
import "./DifficultyCard.css";

const DifficultyCard = ({ level, color, description, onSelect }) => (
  <div
    className="difficulty-card"
    style={{ backgroundColor: color }}
    onClick={() => onSelect(level)}
  >
    <h2>{level}</h2>
    <p>{description}</p>
  </div>
);

export default DifficultyCard;
