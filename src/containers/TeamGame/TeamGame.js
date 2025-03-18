import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import TeamGameStartScreen from "../../components/TeamGameStartScreen/TeamGameStartScreen";
import GamePlay from "../../components/GamePlay/GamePlay";
import TeamGameEndScreen from "../../components/TeamGameEndScreen/TeamGameEndScreen";
import styles from "./TeamGame.module.css";
import { FaTheaterMasks } from "react-icons/fa";
import RoundInfo from "../../components/RoundInfo/RoundInfo";
import Timer from "../../components/Timer/Timer";
import WordCard from "../../components/WordCard/WordCard";
import GameControls from "../../components/GameControls/GameControls";
import useTeamGame from "../../hooks/useTeamGame";

function TeamGame({ difficulty, categories, words, players, rounds }) {
  const { width, height } = useWindowSize();

  const {
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
    animationClass,
    startMatch,
    handleNextMatch,
    handleCorrect,
    handlePass,
    totalMatches,
    resetGame
  } = useTeamGame({ words, difficulty, categories, players, rounds });

  const currentWord = gameWords.length > 0 ? gameWords[0] : null;

  return (
    <div className={styles.game}>
      {showConfetti && score > 0 && <Confetti width={width} height={height} />}
      <h2 className={styles.title}>
        <FaTheaterMasks /> Jogo de Mímica <FaTheaterMasks />
      </h2>
      {!gameStarted && matchesPlayed === 0 ? (
        <TeamGameStartScreen onStart={startMatch} />
      ) : gameStarted ? (
        <GamePlay countdown={countdown} timeLeft={timeLeft}>
          <RoundInfo
            currentRound={currentRound}
            totalRounds={rounds}
            currentPlayer={players[currentPlayerIndex]}
          />
          <Timer timeLeft={timeLeft} blinking={timeLeft <= 15} />
          <WordCard
            currentWord={currentWord}
            borderColor={difficulty.color}
            animationClass={animationClass}
          />
          <GameControls handlePass={handlePass} handleCorrect={handleCorrect} />
        </GamePlay>
      ) : (
        <TeamGameEndScreen
          score={score}
          totalScores={totalScores}
          players={players}
          currentRound={currentRound}
          rounds={rounds}
          matchesPlayed={matchesPlayed}
          totalMatches={totalMatches}
          onNextMatch={handleNextMatch}
          onReset={resetGame}
        />
      )}
    </div>
  );
}

export default TeamGame;
