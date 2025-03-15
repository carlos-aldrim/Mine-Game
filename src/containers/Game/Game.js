import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { FaPlay } from "react-icons/fa";
import "./Game.css";
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
  const motionCooldownRef = useRef(false);
  const [processing, setProcessing] = useState(false);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerWidth < window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    const handleMotion = (event) => {
      if (!event.rotationRate || motionCooldownRef.current) return;
      if (gameStarted && countdown === 0 && timeLeft > 0) {
        const { beta } = event.rotationRate;
        if (beta > 40) {
          motionCooldownRef.current = true;
          handleCorrect();
          setTimeout(() => (motionCooldownRef.current = false), 1000);
        } else if (beta < -40) {
          motionCooldownRef.current = true;
          handlePass();
          setTimeout(() => (motionCooldownRef.current = false), 1000);
        }
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion);
    }
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [gameStarted, countdown, timeLeft, gameWords]);

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
    setAnimationClass("flash-orange");
    setTimeout(() => {
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  const handleCorrect = () => {
    if (processing) return;
    setProcessing(true);
    setAnimationClass("flash-green");
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  const currentWord = gameWords.length > 0 ? gameWords[0] : null;

  if (isPortrait && window.innerWidth < 768) {
    return (
      <div className="rotate-message">
        <p>
          Por favor, rotacione seu dispositivo para o modo paisagem para jogar.
        </p>
      </div>
    );
  }

  return (
    <div className="game">
      {showConfetti && <Confetti />}
      <h2 className="title">
        {(!gameStarted && timeLeft < 60 && score > 0) ? "🎊" : "🎭"} Jogo de Mímica {(!gameStarted && timeLeft < 60 && score > 0) ? "🎊" : "🎭"}
      </h2>

      {gameStarted && timeLeft > 0 && countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}

      {gameStarted && countdown === 0 && timeLeft > 0 && currentWord ? (
        <div className="game-container">
          <Timer
            timeLeft={timeLeft}
            blinking={timeLeft <= 15}
          />
          <WordCard currentWord={currentWord} animationClass={animationClass} borderColor={difficulty.color} />
          <GameControls
            handlePass={handlePass}
            handleCorrect={handleCorrect}
            disabled={timeLeft <= 0}
          />
        </div>
      ) : null}

      {!gameStarted && timeLeft === 60 && (
        <div>
          <h3 className="subtitle">Desafie sua criatividade!</h3>
          <p className="description">
            Use as setas do teclado ou os botões para passar ou acertar a palavra.
          </p>
          <button className="start-button" onClick={startGame}>
            <FaPlay /> Iniciar
          </button>
        </div>
      )}

      {!gameStarted && timeLeft < 60 && (
        <EndGame
          score={score}
          restartGame={startGame}
          homeAction={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default Game;
