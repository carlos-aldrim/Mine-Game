import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiRefreshCcw } from "react-icons/fi";  // Importar os ícones
import GameModeSelection from "./containers/GameModeSelection/GameModeSelection";
import TeamSetup from "./containers/TeamSetup/TeamSetup";
import DifficultySelection from "./containers/DifficultySelection/DifficultySelection";
import CategorySelection from "./containers/CategorySelection/CategorySelection";
import Game from "./containers/Game/Game";
import TeamGame from "./containers/TeamGame/TeamGame";
import "./global.css";

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [step, setStep] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState(0);

  const [isPortrait, setIsPortrait] = useState(
    window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    fetch("/words.json")
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error("Erro ao carregar as palavras:", error));
  }, []);

  useEffect(() => {
    const handleResize = () =>
      setIsPortrait(window.innerWidth < window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : 0));

  const resetGame = () => {
    setGameMode(null);
    setStep(0);
    setDifficulty("");
    setSelectedCategories([]);
    setPlayers([]);
    setRounds(0);
  };

  if (isPortrait && window.innerWidth < 768) {
    return (
      <div className="rotate-message">
        <p>Por favor, rotacione seu dispositivo para o modo paisagem para jogar.</p>
      </div>
    );
  }

  return (
    <div>
      {step > 0 && (
        <button className="back-button" onClick={prevStep}>
          <FiArrowLeft size={20} />
        </button>
      )}
      {step > 0 && (
        <button className="reset-button" onClick={resetGame}>
          <FiRefreshCcw size={20} />
        </button>
      )}

      {step === 0 && <GameModeSelection onSelect={(mode) => { setGameMode(mode); nextStep(); }} />}

      {step === 1 && gameMode === "solo" && (
        <DifficultySelection onSelect={(difficulty) => { setDifficulty(difficulty); nextStep(); }} />
      )}
      {step === 1 && gameMode === "team" && (
        <TeamSetup onSetupComplete={(players, rounds) => { setPlayers(players); setRounds(rounds); nextStep(); }} />
      )}

      {step === 2 && gameMode === "solo" && (
        <CategorySelection onSelect={(categories) => { setSelectedCategories(categories); nextStep(); }} />
      )}
      {step === 2 && gameMode === "team" && (
        <DifficultySelection onSelect={(difficulty) => { setDifficulty(difficulty); nextStep(); }} />
      )}

      {step === 3 && gameMode === "solo" && (
        <Game difficulty={difficulty} categories={selectedCategories} words={words} />
      )}
      {step === 3 && gameMode === "team" && (
        <CategorySelection onSelect={(categories) => { setSelectedCategories(categories); nextStep(); }} />
      )}

      {step === 4 && gameMode === "team" && (
        <TeamGame difficulty={difficulty} categories={selectedCategories} words={words} players={players} rounds={rounds} />
      )}
    </div>
  );
}

export default App;
