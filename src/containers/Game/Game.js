import React, { useState, useEffect, useRef, useCallback } from "react";
import Confetti from "react-confetti";
import { FaPlay, FaTheaterMasks, FaTrophy, FaSadTear } from "react-icons/fa";
import styles from "./Game.module.css";
import Timer from "../../components/Timer/Timer";
import WordCard from "../../components/WordCard/WordCard";
import GameControls from "../../components/GameControls/GameControls";
import EndGame from "../../components/EndGame/EndGame";
import { useWindowSize } from "react-use";
import useSound from "use-sound";

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
  const { width, height } = useWindowSize();

  const correctSoundUrl = "https://www.myinstants.com/media/sounds/correct.mp3";
  const passSoundUrl = "https://www.myinstants.com/media/sounds/pass.mp3";
  const winSoundUrl =
    "https://www.myinstants.com/media/sounds/comemoracaoooo.mp3";
  const loseSoundUrl = "https://www.myinstants.com/media/sounds/som-perdeu.mp3";

  const [playCorrect] = useSound(correctSoundUrl, { volume: 0.5 });
  const [playPass] = useSound(passSoundUrl, { volume: 0.5 });
  const [playWin] = useSound(winSoundUrl, { volume: 0.5 });
  const [playLose] = useSound(loseSoundUrl, { volume: 0.5 });

  const filteredWords = words.filter(
    (word) =>
      word.difficulty === difficulty && categories.includes(word.category)
  );

  const vibrateMobileDevice = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  const handlePass = useCallback(() => {
    if (processing) return;
    setProcessing(true);
    setAnimationClass("orange");
    playPass();
    setTimeout(() => {
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        vibrateMobileDevice();
      }
    }, 500);
  }, [processing]);

  const handleCorrect = useCallback(() => {
    if (processing) return;
    setProcessing(true);
    setAnimationClass("green");
    playCorrect();
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        vibrateMobileDevice();
      }
    }, 500);
  }, [processing]);

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
        playWin();
        setTimeout(() => setShowConfetti(false), 5000);
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        playLose();
      }
    }
  }, [timeLeft, score, playWin, playLose]);  

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
            Use as setas do teclado, os botões ou movimente a tela para passar
            ou acertar a palavra. Se estiver usando um smartphone, posicione o
            dispositivo na testa para jogar.
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
