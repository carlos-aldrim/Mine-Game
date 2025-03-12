import { useState } from "react";
import "./TeamSetup.css";

function TeamSetup({ onSetupComplete }) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [numRounds, setNumRounds] = useState(1);
  const [players, setPlayers] = useState(["", ""]);

  const handleNumPlayersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumPlayers(value);
    setPlayers(Array(value).fill(""));
  };

  const handleNumRoundsChange = (e) => {
    setNumRounds(parseInt(e.target.value, 10));
  };

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
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
      <h3 className="subtitle">
        Configure seu jogo e prepare-se para o desafio!
      </h3>
      <div className="select-group">
        <div>
          <label>Nº de Equipe:</label>
          <select value={numPlayers} onChange={handleNumPlayersChange}>
            {[2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Nº de Rodadas:</label>
          <select value={numRounds} onChange={handleNumRoundsChange}>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="players-inputs">
        {players.map((player, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Nome da Equipe ${index + 1}`}
            value={player}
            onChange={(e) => handlePlayerChange(index, e.target.value)}
          />
        ))}
      </div>

      <button className="next-button" onClick={handleNext}>Próximo</button>
    </div>
  );
}

export default TeamSetup;
