import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { FaPlay } from "react-icons/fa";
import styles from "./Game.module.css";
import Timer from "../../components/Timer/Timer";
import WordCard from "../../components/WordCard/WordCard";
import GameControls from "../../components/GameControls/GameControls";
import EndGame from "../../components/EndGame/EndGame";

function Game({ difficulty, categories, words }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [gameWords, setGameWords] = useState([]);
  const [processing, setProcessing] = useState(false);

  const filteredWords = words.filter(
    (word) => word.difficulty === difficulty && categories.includes(word.category)
  );

  const startGame = () => {
    if (filteredWords.length === 0) {
      alert("Nenhuma palavra disponível para este filtro!");
      return;
    }
    const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
    setGameWords(shuffled);
    setGameStarted(true);
    setCountdown(3);
    setTimeLeft(60);
    setScore(0);
  };

  useEffect(() => {
    if (!gameStarted) return;
    if (countdown > 0) {
      const timerId = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [gameStarted, countdown]);

  useEffect(() => {
    if (gameStarted && countdown === 0 && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [gameStarted, countdown, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameStarted(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [timeLeft]);

  const handlePass = () => {
    if (processing) return;
    setProcessing(true);
    setAnimationClass(styles.flashOrange);
    setTimeout(() => {
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  const handleCorrect = () => {
    if (processing) return;
    setProcessing(true);
    setAnimationClass(styles.flashGreen);
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  const currentWord = gameWords.length > 0 ? gameWords[0] : null;

  return (
    <div className={styles.game}>
      {showConfetti && <Confetti />}
      <h2 className={styles.title}>
        {(!gameStarted && timeLeft < 60 && score > 0) ? "🎊" : "🎭"} Jogo de Mímica{" "}
        {(!gameStarted && timeLeft < 60 && score > 0) ? "🎊" : "🎭"}
      </h2>

      {gameStarted && timeLeft > 0 && countdown > 0 && (
        <div className={styles.countdown}>{countdown}</div>
      )}

      {gameStarted && countdown === 0 && timeLeft > 0 && currentWord ? (
        <div className={styles.gameContainer}>
          <Timer timeLeft={timeLeft} blinking={timeLeft <= 15} />
          <WordCard currentWord={currentWord} animationClass={animationClass} borderColor={difficulty.color} />
          <GameControls handlePass={handlePass} handleCorrect={handleCorrect} disabled={timeLeft <= 0} />
        </div>
      ) : null}

      {!gameStarted && timeLeft === 60 && (
        <div>
          <h3 className={styles.subtitle}>Desafie sua criatividade!</h3>
          <p className={styles.description}>
            Use as setas do teclado ou os botões para passar ou acertar a palavra.
          </p>
          <button className={styles.startButton} onClick={startGame}>
            <FaPlay /> Iniciar
          </button>
        </div>
      )}

      {!gameStarted && timeLeft < 60 && (
        <EndGame score={score} restartGame={startGame} homeAction={() => window.location.reload()} />
      )}
    </div>
  );
}

export default Game;
