import React from "react";
import { FaStar, FaChevronRight } from "react-icons/fa";
import styles from "./DifficultySelection.module.css";
import DifficultyCard from "../../components/DifficultyCard/DifficultyCard";

const difficulties = [
  { level: "Fácil", color: "#FFA500", description: "Ideal para iniciantes!" },
  { level: "Média", color: "#FF7500", description: "Um desafio equilibrado." },
  { level: "Difícil", color: "#FF4500", description: "Para os mestres!" },
];

const DifficultySelection = ({ onSelect }) => (
  <div className={styles.difficultyContainer}>
    <div className={styles.titleContainer}>
      <FaStar className={styles.icon} />
      <h1 className={styles.title}>Escolha a Dificuldade</h1>
      <FaStar className={styles.icon} />
    </div>
    <div className={styles.subtitleContainer}>
    <FaChevronRight className={styles.iconLeft} />
      <h3 className={styles.subtitle}>
        Selecione um nível para começar o desafio
      </h3>
    </div>
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
