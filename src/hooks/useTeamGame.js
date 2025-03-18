import { useState, useEffect, useCallback, useRef } from "react";
import useSound from "use-sound";

const useTeamGame = ({ words, difficulty, categories, players, rounds }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameWords, setGameWords] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [totalScores, setTotalScores] = useState({});
  const [processing, setProcessing] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const motionCooldownRef = useRef(false);

  const totalMatches = rounds * players.length;

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

  useEffect(() => {
    if (!gameStarted) return;
    if (countdown > 0) {
      const countdownTimer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [gameStarted, countdown]);

  useEffect(() => {
    if (gameStarted && countdown === 0 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, countdown, timeLeft]);

  const [playWin] = useSound("https://www.myinstants.com/media/sounds/comemoracaoooo.mp3", { volume: 0.5 });

  useEffect(() => {
    if (gameStarted && timeLeft === 0) {
      setGameStarted(false);
      setShowConfetti(true);
      playWin();
      setTimeout(() => setShowConfetti(false), 5000);
      const currentPlayer = players[currentPlayerIndex];
      setTotalScores((prev) => ({
        ...prev,
        [currentPlayer]: (prev[currentPlayer] || 0) + score,
      }));
      setMatchesPlayed((prev) => prev + 1);
    }
  }, [gameStarted, timeLeft, score, players, currentPlayerIndex, playWin]);

  const startMatch = useCallback(() => {
    setGameWords(loadWords());
    setGameStarted(true);
    setCountdown(3);
    setTimeLeft(60);
    setScore(0);
  }, [loadWords]);

  const handleNextMatch = () => {
    if (matchesPlayed < totalMatches) {
      if (currentPlayerIndex + 1 === players.length) {
        setCurrentPlayerIndex(0);
        setCurrentRound((prev) => prev + 1);
      } else {
        setCurrentPlayerIndex((prev) => prev + 1);
      }
      startMatch();
      setShowConfetti(false);
    }
  };

  const [playCorrect] = useSound("https://www.myinstants.com/media/sounds/correct.mp3", { volume: 0.5 });
  const [playPass] = useSound("https://www.myinstants.com/media/sounds/pass.mp3", { volume: 0.5 });

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
  }, [loadWords, processing, timeLeft, playPass]);

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
  }, [loadWords, processing, timeLeft, playCorrect]);

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
  }, [gameStarted, countdown, timeLeft, handleCorrect, handlePass]);

  return {
    gameStarted,
    timeLeft,
    score,
    countdown,
    showConfetti,
    gameWords,
    currentRound,
    currentPlayerIndex,
    matchesPlayed,
    totalScores,
    processing,
    animationClass,
    startMatch,
    handleNextMatch,
    handleCorrect,
    handlePass,
    totalMatches,
    resetGame
  };
};

export default useTeamGame;
