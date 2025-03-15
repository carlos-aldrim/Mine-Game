import React from "react";
import { FaRedo, FaHome } from "react-icons/fa";
import "./EndGame.css";

function EndGame({ score, restartGame, homeAction }) {
  return (
    <div className="end-game">
      {score > 0 ? (
        <>
          <h3>Parabéns, jogador!</h3>
          <p>Você acertou {score} palavras!</p>
        </>
      ) : (
        <>
          <h3>Tente de novo!</h3>
          <p>Você não acertou nenhuma palavra. Não desista!</p>
        </>
      )}
      <div className="end-game-buttons">
        <button className="restart-button" onClick={restartGame}>
          <FaRedo /> Reiniciar
        </button>
        <button className="home-button" onClick={homeAction}>
          <FaHome /> Voltar para Início
        </button>
      </div>
    </div>
  );
}

export default EndGame;
