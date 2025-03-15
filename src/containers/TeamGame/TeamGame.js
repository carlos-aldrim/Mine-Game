import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { FaPlay, FaForward, FaRedo, FaHome } from "react-icons/fa";
import "./TeamGame.css";
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
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerWidth < window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    setAnimationClass("flash-orange");
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
    setAnimationClass("flash-green");
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setGameWords((prevWords) => {
        return prevWords.length <= 1 ? loadWords() : prevWords.slice(1);
      });
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  };

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

  const totalScoresList = Object.entries(totalScores).map(([player, score]) => ({
    player,
    score,
  }));
  const maxScore = totalScoresList.length > 0 ? Math.max(...totalScoresList.map((p) => p.score)) : 0;
  const winners = totalScoresList.filter((p) => p.score === maxScore);
  const isTie = winners.length > 1;

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
      <h2 className="title">🎭 Jogo de Mímica 🎭</h2>

      {gameStarted && countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}

      {gameStarted && countdown === 0 && timeLeft > 0 && gameWords.length > 0 && (
        <div className="game-container">
          <TeamRoundInfo
            currentRound={currentRound}
            rounds={rounds}
            currentPlayer={players[currentPlayerIndex]}
          />
          <Timer
            timeLeft={timeLeft}
            blinking={timeLeft <= 15}
            timerBarClass={timeLeft <= 15 ? "barBlinking" : ""}
          />
          <WordCard currentWord={gameWords[0]} animationClass={animationClass} />
          <div className="button-container">
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
              {totalScoresList.length > 0 && (
                <>
                  <ul className="results-list">
                    {totalScoresList.map(({ player, score }) => {
                      const isWinnerHighlight = score === maxScore;
                      return (
                        <li key={player} className="results-item">
                          <span className={`player-name ${isWinnerHighlight ? "highlight-winner" : ""}`}>
                            {player}
                          </span>
                          : <span className="player-score">{score}</span> pontos
                        </li>
                      );
                    })}
                  </ul>
                  {isTie ? (
                    <h4 className="winner-title">Empate!</h4>
                  ) : (
                    <h4 className="winner-title">Vencedor: {winners[0].player}</h4>
                  )}
                </>
              )}
              <button className="restart-button" onClick={() => {
                setTotalScores({});
                setMatchesPlayed(0);
                setCurrentRound(1);
                setCurrentPlayerIndex(0);
                startMatch();
              }}>
                <FaRedo /> Reiniciar
              </button>
              <button className="home-button" onClick={() => window.location.reload()}>
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
