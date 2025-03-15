import React from "react";
import "./CategoryButton.css";

const CategoryButton = ({ category, isSelected, onClick }) => (
  <button
    className={`category-button ${isSelected ? "selected" : ""}`}
    onClick={() => onClick(category.name)}
  >
    <span className="icon">{category.icon}</span>
    {category.name}
  </button>
);

export default CategoryButton;
