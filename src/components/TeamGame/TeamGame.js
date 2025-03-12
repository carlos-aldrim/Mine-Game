import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import {
  FaCheck,
  FaForward,
  FaPlay,
  FaClock,
  FaRedo,
  FaHome,
} from "react-icons/fa";
import "./TeamGame.css";

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

  const resetGame = () => {
    setScore(0);
    setGameWords([]);
    setTimeLeft(60);
    setGameStarted(false);
    setShowConfetti(false);
    setCurrentRound(1);
    setCurrentPlayerIndex(0);
    setMatchesPlayed(0);
    setTotalScores({});
  };

  const handlePass = () => {
    if (processing || timeLeft <= 0) return;
    setProcessing(true);
    setAnimationClass("flash-orange");
    setTimeout(() => {
      setGameWords((prevWords) => {
        if (prevWords.length <= 1) {
          return loadWords();
        }
        return prevWords.slice(1);
      });
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

  const handleCorrect = () => {
    if (processing || timeLeft <= 0) return;
    setProcessing(true);
    setAnimationClass("flash-green");
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setGameWords((prevWords) => {
        if (prevWords.length <= 1) {
          return loadWords();
        }
        return prevWords.slice(1);
      });
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

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
    if (gameStarted && timeLeft === 0) {
      setGameStarted(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      const currentPlayer = players[currentPlayerIndex];
      setTotalScores((prev) => ({
        ...prev,
        [currentPlayer]: (prev[currentPlayer] || 0) + score,
      }));
      setMatchesPlayed((prev) => prev + 1);
    }
  }, [gameStarted, timeLeft, score, players, currentPlayerIndex]);

  const handleNextMatch = () => {
    if (matchesPlayed < totalMatches) {
      if (currentPlayerIndex + 1 === players.length) {
        setCurrentPlayerIndex(0);
        setCurrentRound((prev) => prev + 1);
      } else {
        setCurrentPlayerIndex((prev) => prev + 1);
      }
      startMatch();
    }
  };

  const totalScoresList = Object.entries(totalScores).map(
    ([player, score]) => ({
      player,
      score,
    })
  );

  const winner =
    totalScoresList.length > 0
      ? totalScoresList.reduce((max, player) =>
          player.score > max.score ? player : max
        )
      : null;

  return (
    <div className="game">
      {showConfetti && <Confetti />}
      <h2 className="title">🎭 Jogo de Mímica 🎭</h2>

      {gameStarted && countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}

      {gameStarted &&
        countdown === 0 &&
        timeLeft > 0 &&
        gameWords.length > 0 && (
          <div className="game-container">
            <div className="round-info">
              <p>
                Rodada {currentRound} de {rounds}
              </p>
              <p>Vez de: {players[currentPlayerIndex]}</p>
            </div>
            <div className="timer-container">
              <div
                className="timer-bar"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
              <div className={`timer ${timeLeft <= 15 ? "blinking" : ""}`}>
                <FaClock /> {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            </div>
            <div className={`word-card ${animationClass}`}>
              <h1>{gameWords[0].word}</h1>
              <span className="category-icon">{gameWords[0].categoryIcon}</span>
            </div>
            <div className="button-group">
              <button
                className="pass-button"
                onClick={handlePass}
                disabled={timeLeft <= 0}
              >
                <FaForward /> Passar
              </button>
              <button
                className="correct-button"
                onClick={handleCorrect}
                disabled={timeLeft <= 0}
              >
                <FaCheck /> Acertar
              </button>
            </div>
          </div>
        )}

      {!gameStarted && timeLeft === 60 && matchesPlayed === 0 && (
        <div>
          <h3 className="subtitle">Desafie sua criatividade!</h3>
          <button className="start-button" onClick={startMatch}>
            <FaPlay /> Iniciar
          </button>
        </div>
      )}

      {!gameStarted && timeLeft < 60 && (
        <div className="end-game">
          {matchesPlayed < totalMatches ? (
            <div>
              <h3>Partida finalizada! Pontuação desta partida: {score}</h3>
              <button className="next-game-button" onClick={handleNextMatch}>
                <FaForward /> Próxima Partida
              </button>
            </div>
          ) : (
            <div>
              <h3>Parabéns, jogadores!</h3>
              <p>Resultados:</p>
              <ul className="results-list">
                {totalScoresList.map(({ player, score }) => (
                  <li key={player} className="results-item">
                    <span className="player-name">{player}</span>:{" "}
                    <span className="player-score">{score}</span> pontos
                  </li>
                ))}
              </ul>

              <h4 className="winner-title">
                Vencedor: {winner ? winner.player : "Ninguém"}
              </h4>

              <button className="restart-button" onClick={resetGame}>
                <FaRedo /> Reiniciar
              </button>
              <button className="home-button" onClick={resetGame}>
                <FaHome /> Voltar para Início
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamGame;
