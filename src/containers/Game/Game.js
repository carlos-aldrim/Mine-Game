import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { FaPlay, FaTheaterMasks, FaTrophy, FaSadTear } from "react-icons/fa";
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
  const motionCooldownRef = useRef(false);

  const filteredWords = words.filter(
    (word) =>
      word.difficulty === difficulty && categories.includes(word.category)
  );

  useEffect(() => {
    const handleMotion = (event) => {
      if (
        !event.rotationRate ||
        motionCooldownRef.current ||
        !gameStarted ||
        countdown !== 0 ||
        timeLeft <= 0
      )
        return;

      const { beta } = event.rotationRate;
      if (beta > 150) {
        motionCooldownRef.current = true;
        handleCorrect();
        setTimeout(() => {
          motionCooldownRef.current = false;
        }, 1000);
      } else if (beta < -150) {
        motionCooldownRef.current = true;
        handlePass();
        setTimeout(() => {
          motionCooldownRef.current = false;
        }, 1000);
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion);
    }
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [gameStarted, countdown, timeLeft, gameWords]);

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
      if (score > 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  }, [timeLeft, score]);

  const handlePass = () => {
    if (processing) return;
    setProcessing(true);
    setAnimationClass("orange");
    setTimeout(() => {
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  const handleCorrect = () => {
    if (processing) return;
    setProcessing(true);
    setAnimationClass("green");
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
      {showConfetti && score > 0 && <Confetti />}
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

      {gameStarted && timeLeft > 0 && countdown > 0 && (
        <div className={styles.countdown}>{countdown}</div>
      )}

      {gameStarted && countdown === 0 && timeLeft > 0 && currentWord ? (
        <div>
          <Timer timeLeft={timeLeft} blinking={timeLeft <= 15} />
          <WordCard
            currentWord={currentWord}
            animationClass={animationClass}
            borderColor={difficulty.color}
          />
          <GameControls handlePass={handlePass} handleCorrect={handleCorrect} />
        </div>
      ) : null}

      {!gameStarted && timeLeft === 60 && (
        <div>
          <h3 className={styles.subtitle}>Desafie sua criatividade!</h3>
          <p className={styles.description}>
            Use as setas do teclado ou os botões para passar ou acertar a
            palavra.
          </p>
          <button className={styles.startButton} onClick={startGame}>
            <FaPlay /> Iniciar
          </button>
        </div>
      )}

      {!gameStarted && timeLeft < 60 && (
        <EndGame
          onRestart={startGame}
          onHome={() => window.location.reload()}
          title={score === 0 ? "Tente novamente," : "Parabéns!"}
          subtitle={
            score === 0
              ? "Você não acertou nenhuma."
              : "Sua pontuação foi de " + score + " ponto(s)."
          }
        />
      )}
    </div>
  );
}

export default Game;
