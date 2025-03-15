import React from "react";
import styles from "./DifficultySelection.module.css";
import DifficultyCard from "../../components/DifficultyCard/DifficultyCard";

const difficulties = [
  { level: "Fácil", color: "#FFA500", description: "Ideal para iniciantes!" },
  { level: "Média", color: "#FF7500", description: "Um desafio equilibrado." },
  { level: "Difícil", color: "#FF4500", description: "Para os mestres!" },
];

const DifficultySelection = ({ onSelect }) => (
  <div className={styles.difficultyContainer}>
    <h1 className={styles.title}>🌟 Escolha a Dificuldade 🌟</h1>
    <h3 className={styles.subtitle}>
      Selecione um nível para começar o desafio
    </h3>
    <div className={styles.cardsContainer}>
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
