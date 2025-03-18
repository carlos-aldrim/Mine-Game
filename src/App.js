import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiHome, FiInfo } from "react-icons/fi";
import GameModeSelection from "./containers/GameModeSelection/GameModeSelection";
import TeamSetup from "./containers/TeamSetup/TeamSetup";
import DifficultySelection from "./containers/DifficultySelection/DifficultySelection";
import CategorySelection from "./containers/CategorySelection/CategorySelection";
import Game from "./containers/Game/Game";
import TeamGame from "./containers/TeamGame/TeamGame";
import "./global.css";
import BackgroundAnimation from "./components/BackgroundAnimation/BackgroundAnimation";

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [step, setStep] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState(0);

  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetch("/words.json")
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error("Erro ao carregar as palavras:", error));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerWidth < window.innerHeight);
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

  const toggleInfo = () => setShowInfo(!showInfo);

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
    <div>
      <BackgroundAnimation />

      <button className="info-button" onClick={toggleInfo}>
        <FiInfo size={20} />
      </button>

      {showInfo && (
        <div className="info-modal" onClick={toggleInfo}>
          <div className="info-content">
            <h2>Como Jogar Mímica</h2>
            <p>
              <strong>Modo Desktop (Computador/Notebook):</strong> Duas pessoas podem jogar. Uma pessoa posiciona o dispositivo de forma que a palavra não fique visível para ela – simulando o "cartão na testa". A outra pessoa faz as mímicas, representando a palavra.
            </p>
            <p>
              Utilize os botões visuais na tela ou as teclas do teclado: a seta para a esquerda (<kbd>&larr;</kbd>) para <em>passar</em> e a seta para a direita (<kbd>&rarr;</kbd>) para <em>acertar</em>.
            </p>
            <p>
              <strong>Modo Mobile:</strong> O funcionamento é semelhante, mas com interação por gestos. Coloque o dispositivo na testa (para não visualizar a palavra) e a outra pessoa faz a mímica. Além disso, você pode usar movimentos do aparelho: levantando o dispositivo para <em>acertar</em> e baixando-o para <em>passar</em>.
            </p>
            <p>Divirta-se e boa sorte!</p>
          </div>
        </div>
      )}

      {step > 0 && (
        <button className="reset-button" onClick={resetGame}>
          <FiHome size={20} />
        </button>
      )}
      {step > 0 && (
        <button className="back-button" onClick={prevStep}>
          <FiArrowLeft size={20} />
        </button>
      )}

      {step === 0 && (
        <GameModeSelection
          onSelect={(mode) => {
            setGameMode(mode);
            nextStep();
          }}
        />
      )}

      {step === 1 && gameMode === "solo" && (
        <DifficultySelection
          onSelect={(difficulty) => {
            setDifficulty(difficulty);
            nextStep();
          }}
        />
      )}
      {step === 1 && gameMode === "team" && (
        <TeamSetup
          onSetupComplete={(players, rounds) => {
            setPlayers(players);
            setRounds(rounds);
            nextStep();
          }}
        />
      )}

      {step === 2 && gameMode === "solo" && (
        <CategorySelection
          onSelect={(categories) => {
            setSelectedCategories(categories);
            nextStep();
          }}
        />
      )}
      {step === 2 && gameMode === "team" && (
        <DifficultySelection
          onSelect={(difficulty) => {
            setDifficulty(difficulty);
            nextStep();
          }}
        />
      )}

      {step === 3 && gameMode === "solo" && (
        <Game
          difficulty={difficulty}
          categories={selectedCategories}
          words={words}
        />
      )}
      {step === 3 && gameMode === "team" && (
        <CategorySelection
          onSelect={(categories) => {
            setSelectedCategories(categories);
            nextStep();
          }}
        />
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
