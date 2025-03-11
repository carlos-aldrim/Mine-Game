import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import {
  FaCheck,
  FaForward,
  FaPlay,
  FaClock,
  FaRedo,
  FaHome,
} from "react-icons/fa";
import "./Game.css";

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

  const [shouldRotate, setShouldRotate] = useState(false);

  useEffect(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobileDevice && window.innerWidth < window.innerHeight) {
      setShouldRotate(true);
    }
  }, []);

  const filteredWords = words.filter(
    (word) =>
      word.difficulty === difficulty && categories.includes(word.category)
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
      if (!event.rotationRate) return;
      if (motionCooldownRef.current) return;

      if (gameStarted && countdown === 0 && timeLeft > 0) {
        const { beta } = event.rotationRate;
        if (beta > 40) {
          motionCooldownRef.current = true;
          handleCorrect();
          setTimeout(() => {
            motionCooldownRef.current = false;
          }, 1000);
        } else if (beta < -40) {
          motionCooldownRef.current = true;
          handlePass();
          setTimeout(() => {
            motionCooldownRef.current = false;
          }, 1000);
        }
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion);
    }
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [gameStarted, countdown, timeLeft, gameWords]);

  useEffect(() => {
    if (!gameStarted) return;
    if (countdown > 0) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [gameStarted, countdown]);

  useEffect(() => {
    if (gameStarted && countdown === 0 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, countdown, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameStarted(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (gameStarted && gameWords.length === 0) {
      setGameStarted(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [gameWords, gameStarted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStarted && countdown === 0 && timeLeft > 0) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePass();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleCorrect();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, countdown, timeLeft, gameWords]);

  const handlePass = () => {
    if (processing) return;
    setProcessing(true);
    setAnimationClass("flash-orange");
    setTimeout(() => {
      setGameWords((prevWords) => prevWords.slice(1));
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
      setGameWords((prevWords) => prevWords.slice(1));
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  const currentWord = gameWords.length > 0 ? gameWords[0] : null;

  let titleEmoji;
  if (!gameStarted && timeLeft < 60) {
    titleEmoji = score > 0 ? "🎊" : "😢";
  } else {
    titleEmoji = "🎭";
  }

  return (
    <div className={shouldRotate ? "landscape-container" : "game"}>
      {showConfetti && <Confetti />}

      <h2 className="title">
        {titleEmoji} Jogo de Mímica {titleEmoji}
      </h2>

      {gameStarted && timeLeft > 0 && countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}

      {gameStarted && countdown === 0 && timeLeft > 0 && currentWord && (
        <div className="game-container">
          <div className="timer-container">
            <div
              className={`timer-bar ${timeLeft <= 15 ? "barBlinking" : ""}`}
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            ></div>
            <div className={`timer ${timeLeft <= 15 ? "blinking" : ""}`}>
              <FaClock /> {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </div>
          </div>

          <div
            className={`word-card ${animationClass}`}
            style={{ borderColor: difficulty.color }}
          >
            <h3>{currentWord.word}</h3>
            <span className="category-icon">{currentWord.categoryIcon}</span>
          </div>

          <div className="button-group">
            <button className="pass-button" onClick={handlePass}>
              <FaForward /> Passar
            </button>
            <button className="correct-button" onClick={handleCorrect}>
              <FaCheck /> Acertar
            </button>
          </div>
        </div>
      )}

      {!gameStarted && timeLeft === 60 && (
        <>
          <h3 className="subtitle">Desafie sua criatividade!</h3>
          <p className="description">
            Use as setas do teclado ou os botões para passar ou acertar a palavra
            exibida. Prepare-se para uma experiência divertida e dinâmica!
          </p>
          <button className="start-button" onClick={startGame}>
            <FaPlay /> Iniciar
          </button>
        </>
      )}

      {(!gameStarted || gameWords.length === 0) && timeLeft < 60 && (
        <div className="end-game">
          {score > 0 ? (
            <>
              <h3>Parabéns, jogador!</h3>
              <p>Você acertou {score} palavras!</p>
            </>
          ) : (
            <>
              <h3>Tente de novo!</h3>
              <p>Você não acertou nenhuma palavra. Não desista!</p>
            </>
          )}
          <div className="end-game-buttons">
            <button className="restart-button" onClick={startGame}>
              <FaRedo /> Reiniciar
            </button>
            <button
              className="home-button"
              onClick={() => window.location.reload()}
            >
              <FaHome /> Voltar para Início
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
