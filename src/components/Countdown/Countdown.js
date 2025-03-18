import React from "react";
import styles from "./Countdown.module.css";

function Countdown({ value }) {
  return <div className={styles.countdown}>{value}</div>;
}

export default Countdown;
