import React, { useState, useEffect, useRef, useCallback } from "react";
import Confetti from "react-confetti";
import { FaForward, FaPlay, FaTheaterMasks } from "react-icons/fa";
import styles from "./TeamGame.module.css";
import Timer from "../../components/Timer/Timer";
import WordCard from "../../components/WordCard/WordCard";
import GameControls from "../../components/GameControls/GameControls";
import { useWindowSize } from "react-use";
import useSound from "use-sound";

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
  const motionCooldownRef = useRef(false);
  const { width, height } = useWindowSize();

  const currentWord = gameWords.length > 0 ? gameWords[0] : null;

  const correctSoundUrl = "https://www.myinstants.com/media/sounds/correct.mp3";
  const passSoundUrl = "https://www.myinstants.com/media/sounds/pass.mp3";
  const winSoundUrl =
    "https://www.myinstants.com/media/sounds/comemoracaoooo.mp3";

  const [playCorrect] = useSound(correctSoundUrl, { volume: 0.5 });
  const [playPass] = useSound(passSoundUrl, { volume: 0.5 });
  const [playWin] = useSound(winSoundUrl, { volume: 0.5 });

  const filteredWords = words.filter(
    (word) =>
      word.difficulty === difficulty && categories.includes(word.category)
  );

  const loadWords = useCallback(() => {
    if (filteredWords.length === 0) {
      alert("Nenhuma palavra disponível para este filtro!");
      return [];
    }
    return [...filteredWords].sort(() => Math.random() - 0.5);
  }, [filteredWords]);

  const totalScoresList = Object.entries(totalScores).map(
    ([player, score]) => ({
      player,
      score,
    })
  );

  const maxScore =
    totalScoresList.length > 0
      ? Math.max(...totalScoresList.map((p) => p.score))
      : 0;
  const winners = totalScoresList.filter((p) => p.score === maxScore);
  const isTie = winners.length > 1;

  const startMatch = () => {
    setGameWords(loadWords());
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

  const handlePass = useCallback(() => {
    if (processing || timeLeft <= 0) return;
    setProcessing(true);
    setAnimationClass("orange");
    playPass();
    setTimeout(() => {
      setGameWords((prevWords) =>
        prevWords.length <= 1 ? loadWords() : prevWords.slice(1)
      );
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  }, [loadWords, processing, timeLeft]);

  const handleCorrect = useCallback(() => {
    if (processing || timeLeft <= 0) return;
    setProcessing(true);
    setAnimationClass("green");
    playCorrect();
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setGameWords((prevWords) =>
        prevWords.length <= 1 ? loadWords() : prevWords.slice(1)
      );
      setAnimationClass("");
      setProcessing(false);
    }, 500);
  }, [loadWords, processing, timeLeft]);

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
      if (beta > 180) {
        motionCooldownRef.current = true;
        handleCorrect();
        setTimeout(() => {
          motionCooldownRef.current = false;
        }, 1000);
      } else if (beta < -180) {
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
  }, [gameStarted, countdown, timeLeft, gameWords, handleCorrect, handlePass]);

  useEffect(() => {
    if (!gameStarted) return;
    if (countdown > 0) {
      const countdownTimer = setInterval(
        () => setCountdown((prev) => prev - 1),
        1000
      );
      return () => clearInterval(countdownTimer);
    }
  }, [gameStarted, countdown]);

  useEffect(() => {
    if (gameStarted && countdown === 0 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
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

  useEffect(() => {
    if (matchesPlayed === totalMatches && totalMatches > 0) {
      setShowConfetti(true);
    }
  }, [matchesPlayed, totalMatches]);

  return (
    <div className={styles.game}>
      {showConfetti && score > 0 && <Confetti width={width} height={height} />}
      <h2 className={styles.title}>
        <FaTheaterMasks /> Jogo de Mímica <FaTheaterMasks />
      </h2>

      {gameStarted && countdown > 0 && (
        <div className={styles.countdown}>{countdown}</div>
      )}

      {gameStarted &&
        countdown === 0 &&
        timeLeft > 0 &&
        gameWords.length > 0 && (
          <div className={styles.gameContainer}>
            <div className={styles.roundInfo}>
              <p>
                Rodada {currentRound} de {rounds}
              </p>
              <p>Vez de: {players[currentPlayerIndex]}</p>
            </div>
            <div>
              <Timer timeLeft={timeLeft} blinking={timeLeft <= 15} />
              <WordCard
                currentWord={currentWord}
                animationClass={animationClass}
                borderColor={difficulty.color}
              />
              <GameControls
                handlePass={handlePass}
                handleCorrect={handleCorrect}
              />
            </div>
          </div>
        )}

      {!gameStarted && timeLeft === 60 && matchesPlayed === 0 && (
        <div>
          <h3 className={styles.subtitle}>Desafie sua criatividade!</h3>
          <p className={styles.description}>
            Use as setas do teclado ou os botões para passar ou acertar a
            palavra.
          </p>
          <button className={styles.startButton} onClick={startMatch}>
            <FaPlay /> Iniciar
          </button>
        </div>
      )}

      {!gameStarted && timeLeft < 60 && (
        <div className={styles.endGame}>
          {matchesPlayed < totalMatches ? (
            <div>
              <h3>Parabéns, jogador acertou {score} ponto(s).</h3>
              <p>Pronto para a próxima partida?</p>
              <button
                className={styles.nextGameButton}
                onClick={handleNextMatch}
              >
                <FaForward /> Próxima Partida
              </button>
            </div>
          ) : (
            <div>
              <h3>Parabéns, jogadores!</h3>
              <p>Resultados:</p>
              <ul className={styles.resultsList}>
                {totalScoresList.map(({ player, score }) => (
                  <li key={player} className={styles.resultsItems}>
                    <span className={styles.playerName}>{player}</span>:{" "}
                    <span className={styles.playerScore}>{score}</span> pontos
                  </li>
                ))}
              </ul>

              {isTie ? (
                <h4 className={styles.winnerTitle}>Empate!</h4>
              ) : (
                <h4 className={styles.winnerTitle}>
                  Vencedor: {winners[0].player}
                </h4>
              )}

              <div className={styles.endGameButtons}>
                <button className={styles.restartButton} onClick={resetGame}>
                  Reiniciar
                </button>
                <button
                  className={styles.homeButton}
                  onClick={() => window.location.reload()}
                >
                  Voltar para Início
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamGame;
