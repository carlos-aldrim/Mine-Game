import React from "react";
import "./ModeButton.css";

const ModeButton = ({ mode, icon: Icon, label, onClick }) => {
  return (
    <button className={`mode-button ${mode}`} onClick={onClick}>
      <Icon className="icon" />
      {label}
    </button>
  );
};

export default ModeButton;
