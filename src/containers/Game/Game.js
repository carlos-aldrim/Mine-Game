import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import GameStartScreen from "../../components/GameStartScreen/GameStartScreen";
import GamePlay from "../../components/GamePlay/GamePlay";
import GameEndScreen from "../../components/GameEndScreen/GameEndScreen";
import styles from "./Game.module.css";
import Timer from "../../components/Timer/Timer";
import WordCard from "../../components/WordCard/WordCard";
import GameControls from "../../components/GameControls/GameControls";
import { FaSadTear, FaTheaterMasks, FaTrophy } from "react-icons/fa";
import useGame from "../../hooks/useGame";

function Game({ difficulty, categories, words }) {
  const { width, height } = useWindowSize();

  const {
    gameStarted,
    timeLeft,
    score,
    countdown,
    showConfetti,
    gameWords,
    animationClass,
    startGame,
    handlePass,
    handleCorrect,
  } = useGame(difficulty, categories, words);

  const currentWord = gameWords.length > 0 ? gameWords[0] : null;

  return (
    <div className={styles.game}>
      {showConfetti && score > 0 && <Confetti width={width} height={height} />}
      <h2 className={styles.title}>
        {!gameStarted && timeLeft < 60 && score > 0 ? (
          <FaTrophy />
        ) : score === 0 && !gameStarted && timeLeft < 60 ? (
          <FaSadTear />
        ) : (
          <FaTheaterMasks />
        )}{" "}
        Jogo de Mímica
        {!gameStarted && timeLeft < 60 && score > 0 ? (
          <FaTrophy />
        ) : score === 0 && !gameStarted && timeLeft < 60 ? (
          <FaSadTear />
        ) : (
          <FaTheaterMasks />
        )}{" "}
      </h2>
      {!gameStarted && timeLeft === 60 ? (
        <GameStartScreen onStart={startGame} />
      ) : gameStarted && timeLeft > 0 ? (
        <GamePlay countdown={countdown} timeLeft={timeLeft}>
          <Timer timeLeft={timeLeft} blinking={timeLeft <= 15} />
          <WordCard
            currentWord={currentWord}
            borderColor={difficulty.color}
            animationClass={animationClass}
          />
          <GameControls handlePass={handlePass} handleCorrect={handleCorrect} />
        </GamePlay>
      ) : (
        <GameEndScreen
          score={score}
          onRestart={startGame}
          onHome={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default Game;
