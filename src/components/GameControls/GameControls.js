import React from "react";
import { FaForward, FaCheck } from "react-icons/fa";
import "./GameControls.css";

function GameControls({ handlePass, handleCorrect, disabled }) {
  return (
    <div className="button-container">
      <button className="pass-button" onClick={handlePass} disabled={disabled}>
        <FaForward /> Passar
      </button>
      <button className="correct-button" onClick={handleCorrect} disabled={disabled}>
        <FaCheck /> Acertar
      </button>
    </div>
  );
}

export default GameControls;
