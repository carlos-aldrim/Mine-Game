import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./ContinueButton.css";

const ContinueButton = ({ onClick }) => (
  <button className="continue-button" onClick={onClick}>
    Continuar <FaArrowRight className="icon" />
  </button>
);

export default ContinueButton;
