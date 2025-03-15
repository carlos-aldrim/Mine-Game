import { useState } from "react";
import "./TeamSetup.css";
import { FaForward } from "react-icons/fa";
import SelectGroup from "../../components/SelectGroup/SelectGroup";
import PlayersInputs from "../../components/PlayersInputs/PlayersInputs";

function TeamSetup({ onSetupComplete }) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [numRounds, setNumRounds] = useState(1);
  const [players, setPlayers] = useState(["", ""]);

  const handleNumPlayersChange = (value) => {
    setNumPlayers(value);
    setPlayers(Array(value).fill(""));
  };

  const handleNumRoundsChange = (value) => {
    setNumRounds(value);
  };

  const handlePlayerChange = (index, value) => {
    const newValue = value.toUpperCase().slice(0, 25);
    const newPlayers = [...players];
    newPlayers[index] = newValue;
    setPlayers(newPlayers);
  };

  const handleNext = () => {
    if (players.some((player) => player.trim() === "")) {
      alert("Todos os jogadores devem ter um nome!");
      return;
    }
    onSetupComplete(players, numRounds);
  };

  return (
    <div className="setup-container">
      <h1 className="title">👥 Configuração da Equipe 👥</h1>
      <h3 className="subtitle">Configure seu jogo e prepare-se para o desafio!</h3>
      
      <SelectGroup
        numPlayers={numPlayers}
        numRounds={numRounds}
        onPlayersChange={handleNumPlayersChange}
        onRoundsChange={handleNumRoundsChange}
      />
      
      <PlayersInputs players={players} onPlayerChange={handlePlayerChange} />

      <button className="next-button" onClick={handleNext}>
        <FaForward /> Próximo
      </button>
    </div>
  );
}

export default TeamSetup;
