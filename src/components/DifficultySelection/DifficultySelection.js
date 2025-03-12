import React from "react";
import "./DifficultySelection.css";

function DifficultySelection({ onSelect }) {
  const difficulties = [
    { level: "Fácil", color: "#FFA500", description: "Ideal para iniciantes!" },
    { level: "Média", color: "#FF7500", description: "Um desafio equilibrado." },
    { level: "Difícil", color: "#FF4500", description: "Para os mestres!" },
  ];

  return (
    <div className="difficulty-container">
      <h1 className="title">🌟 Escolha a Dificuldade 🌟</h1>
      <h3 className="subtitle">Selecione um nível para começar o desafio</h3>
      <div className="cards-container">
        {difficulties.map((difficulty) => (
          <div
            key={difficulty.level}
            className="difficulty-card"
            style={{ backgroundColor: difficulty.color }}
            onClick={() => onSelect(difficulty.level)}
          >
            <h2>{difficulty.level}</h2>
            <p>{difficulty.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelection;
