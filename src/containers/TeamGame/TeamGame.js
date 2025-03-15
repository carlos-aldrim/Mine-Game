import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { FaPlay, FaForward, FaRedo, FaHome } from "react-icons/fa";
import styles from "./TeamGame.module.css"; // Importação correta do módulo CSS
import Timer from "../../components/Timer/Timer";
import WordCard from "../../components/WordCard/WordCard";
import GameControls from "../../components/GameControls/GameControls";
import TeamRoundInfo from "../../components/TeamRoundInfo/TeamRoundInfo";

function TeamGame({ difficulty, categories, words, players, rounds }) {
  const totalMatches = rounds * players.length;
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [gameWords, setGameWords] = useState([]);
  const [processing, setProcessing] = useState(false);
  const motionCooldownRef = useRef(false);

  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [totalScores, setTotalScores] = useState({});

  const filteredWords = words.filter(
    (word) =>
      word.difficulty === difficulty && categories.includes(word.category)
  );

  const loadWords = () => {
    if (filteredWords.length === 0) {
      alert("Nenhuma palavra disponível para este filtro!");
      return [];
    }
    return [...filteredWords].sort(() => Math.random() - 0.5);
  };

  const startMatch = () => {
    const wordsForMatch = loadWords();
    setGameWords(wordsForMatch);
    setGameStarted(true);
    setCountdown(3);
    setTimeLeft(60);
    setScore(0);
  };

  useEffect(() => {
    if (!gameStarted) return;
    if (countdown > 0) {
      const id = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(id);
    }
  }, [gameStarted, countdown]);

  useEffect(() => {
    if (gameStarted && countdown === 0 && timeLeft > 0) {
      const id = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(id);
    }
  }, [gameStarted, countdown, timeLeft]);

  useEffect(() => {
    if (gameStarted && timeLeft === 0) {
      setGameStarted(false);
      const currentPlayer = players[currentPlayerIndex];
      setTotalScores((prev) => ({
        ...prev,
        [currentPlayer]: (prev[currentPlayer] || 0) + score,
      }));
      setMatchesPlayed((prev) => prev + 1);
    }
  }, [gameStarted, timeLeft, score, players, currentPlayerIndex]);

  useEffect(() => {
    if (matchesPlayed === totalMatches && totalMatches > 0) {
      setShowConfetti(true);
    }
  }, [matchesPlayed, totalMatches]);

  const handlePass = () => {
    if (processing || timeLeft <= 0) return;
    setProcessing(true);
    setAnimationClass(styles.flashOrange);
    setTimeout(() => {
      setGameWords((prevWords) => {
        return prevWords.length <= 1 ? loadWords() : prevWords.slice(1);
      });
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  const handleCorrect = () => {
    if (processing || timeLeft <= 0) return;
    setProcessing(true);
    setAnimationClass(styles.flashGreen);
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setGameWords((prevWords) => {
        return prevWords.length <= 1 ? loadWords() : prevWords.slice(1);
      });
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  return (
    <div className={styles.game}>
      {showConfetti && <Confetti />}
      <h2 className={styles.title}>🎭 Jogo de Mímica 🎭</h2>

      {gameStarted && countdown > 0 && (
        <div className={styles.countdown}>{countdown}</div>
      )}

      {gameStarted && countdown === 0 && timeLeft > 0 && gameWords.length > 0 && (
        <div className={styles.gameContainer}>
          <TeamRoundInfo
            currentRound={currentRound}
            rounds={rounds}
            currentPlayer={players[currentPlayerIndex]}
          />
          <Timer
            timeLeft={timeLeft}
            blinking={timeLeft <= 15}
            timerBarClass={timeLeft <= 15 ? styles.barBlinking : ""}
          />
          <WordCard currentWord={gameWords[0]} animationClass={animationClass} />
          <div className={styles.buttonContainer}>
            <GameControls
              handlePass={handlePass}
              handleCorrect={handleCorrect}
              disabled={timeLeft <= 0}
            />
          </div>
        </div>
      )}

      {!gameStarted && timeLeft === 60 && matchesPlayed === 0 && (
        <div>
          <h3 className={styles.subtitle}>Desafie sua criatividade!</h3>
          <button className={styles.startButton} onClick={startMatch}>
            <FaPlay /> Iniciar
          </button>
        </div>
      )}

      {!gameStarted && timeLeft < 60 && (
        <div className={styles.endGame}>
          <h3>Partida finalizada! Pontuação desta partida: {score}</h3>
          <button className={styles.nextGameButton} onClick={() => startMatch()}>
            <FaForward /> Próxima Partida
          </button>
        </div>
      )}
    </div>
  );
}

export default TeamGame;
