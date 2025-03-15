import React from "react";
import styles from "./CategoryButton.module.css";

const CategoryButton = ({ category, isSelected, onClick }) => (
  <button
    className={`${styles.categoryButton} ${isSelected ? styles.selected : ""}`}
    onClick={() => onClick(category.name)}
  >
    <span className={styles.icon}>{category.icon}</span>
    {category.name}
  </button>
);

export default CategoryButton;
