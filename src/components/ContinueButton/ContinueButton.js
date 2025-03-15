import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./ContinueButton.module.css";

const ContinueButton = ({ onClick }) => (
  <button className={styles.continueButton} onClick={onClick}>
    Continuar <FaArrowRight className={styles.icon} />
  </button>
);

export default ContinueButton;
