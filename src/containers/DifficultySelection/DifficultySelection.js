import React from "react";
import "./DifficultySelection.css";
import DifficultyCard from "../../components/DifficultyCard/DifficultyCard";

const difficulties = [
  { level: "Fácil", color: "#FFA500", description: "Ideal para iniciantes!" },
  { level: "Média", color: "#FF7500", description: "Um desafio equilibrado." },
  { level: "Difícil", color: "#FF4500", description: "Para os mestres!" },
];

const DifficultySelection = ({ onSelect }) => (
  <div className="difficulty-container">
    <h1 className="title">🌟 Escolha a Dificuldade 🌟</h1>
    <h3 className="subtitle">Selecione um nível para começar o desafio</h3>
    <div className="cards-container">
      {difficulties.map((difficulty) => (
        <DifficultyCard
          key={difficulty.level}
          {...difficulty}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);

export default DifficultySelection;
