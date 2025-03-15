import React, { useState, useEffect } from "react";
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

  const nextStep = () => setStep((prev) => prev + 1);

  useEffect(() => {
    const handleResize = () =>
      setIsPortrait(window.innerWidth < window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isPortrait && window.innerWidth < 768) {
    return (
      <div className="rotate-message">
        <p>
          Por favor, rotacione seu dispositivo para o modo paisagem para jogar.
        </p>
      </div>
    );
  }

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    nextStep();
  };

  const handleTeamSetup = (players, rounds) => {
    setPlayers(players);
    setRounds(rounds);
    nextStep();
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    nextStep();
  };

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    nextStep();
  };

  return (
    <div>
      {step === 0 && <GameModeSelection onSelect={handleModeSelect} />}

      {step === 1 && gameMode === "solo" && (
        <DifficultySelection onSelect={handleDifficultySelect} />
      )}

      {step === 1 && gameMode === "team" && (
        <TeamSetup onSetupComplete={handleTeamSetup} />
      )}

      {step === 2 && gameMode === "solo" && (
        <CategorySelection onSelect={handleCategorySelect} />
      )}

      {step === 2 && gameMode === "team" && (
        <DifficultySelection onSelect={handleDifficultySelect} />
      )}

      {step === 3 && gameMode === "solo" && (
        <Game
          difficulty={difficulty}
          categories={selectedCategories}
          words={words}
        />
      )}

      {step === 3 && gameMode === "team" && (
        <CategorySelection onSelect={handleCategorySelect} />
      )}

      {step === 4 && gameMode === "team" && (
        <TeamGame
          difficulty={difficulty}
          categories={selectedCategories}
          words={words}
          players={players}
          rounds={rounds}
        />
      )}
    </div>
  );
}

export default App;
