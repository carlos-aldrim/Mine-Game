import { useState, useEffect, useRef, useCallback } from "react";
import useSound from "use-sound";
import { useWindowSize } from "react-use";

const useGame = (difficulty, categories, words) => {
  const { width, height } = useWindowSize();
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameWords, setGameWords] = useState([]);
  const [animationClass, setAnimationClass] = useState("");
  const [processing, setProcessing] = useState(false);
  const motionCooldownRef = useRef(false);

  const [playCorrect] = useSound("https://www.myinstants.com/media/sounds/correct.mp3", { volume: 0.5 });
  const [playPass] = useSound("https://www.myinstants.com/media/sounds/pass.mp3", { volume: 0.5 });
  const [playWin] = useSound("https://www.myinstants.com/media/sounds/comemoracaoooo.mp3", { volume: 0.5 });
  const [playLose] = useSound("https://www.myinstants.com/media/sounds/som-perdeu.mp3", { volume: 0.5 });

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

  const vibrateMobileDevice = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  const handlePass = useCallback(() => {
    if (processing) return;
    playPass();
    setProcessing(true);
    setAnimationClass("orange");
    setTimeout(() => {
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
      vibrateMobileDevice();
    }, 500);
  }, [playPass, processing]);

  const handleCorrect = useCallback(() => {
    if (processing) return;
    playCorrect();
    setProcessing(true);
    setAnimationClass("green");
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setGameWords((prev) => prev.slice(1));
      setAnimationClass("");
      setProcessing(false);
      vibrateMobileDevice();
    }, 500);
  }, [playCorrect, processing]);

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
    const handleKeyDown = (event) => {
      if (!gameStarted || countdown !== 0 || timeLeft <= 0 || processing) return;
  
      if (event.key === "ArrowLeft") {
        handlePass();
      } else if (event.key === "ArrowRight") {
        handleCorrect();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStarted, countdown, timeLeft, processing, handlePass, handleCorrect]);  

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
      } else {
        playLose();
      }
    }
  }, [timeLeft, score, playWin, playLose]);

  return {
    width,
    height,
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
  };
};

export default useGame;
