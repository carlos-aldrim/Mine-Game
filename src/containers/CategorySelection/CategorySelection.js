import React, { useState } from "react";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import ContinueButton from "../../components/ContinueButton/ContinueButton";
import styles from "./CategorySelection.module.css";
import { FaList, FaCheckCircle } from "react-icons/fa";
import {
  FaPaw,
  FaFilm,
  FaFutbol,
  FaBox,
  FaMusic,
  FaUtensils,
  FaPlane,
  FaBook,
  FaGamepad,
  FaBolt
} from "react-icons/fa";

const categories = [
  { name: "Animais", icon: <FaPaw /> },
  { name: "Filmes", icon: <FaFilm /> },
  { name: "Esportes", icon: <FaFutbol /> },
  { name: "Objetos", icon: <FaBox /> },
  { name: "Música", icon: <FaMusic /> },
  { name: "Comida", icon: <FaUtensils /> },
  { name: "Viagens", icon: <FaPlane /> },
  { name: "Livros", icon: <FaBook /> },
  { name: "Jogos", icon: <FaGamepad /> },
  { name: "Ações", icon: <FaBolt /> }
];

const CategorySelection = ({ onSelect }) => {
  const [selected, setSelected] = useState([]);
  const showInstructions = true;

  const toggleCategory = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleSubmit = () => {
    if (selected.length < 3) {
      alert("Selecione pelo menos 3 categorias!");
    } else {
      onSelect(selected);
    }
  };

  return (
    <div className={styles.categorySelection}>
      <div className={styles.titleContainer}>
        <FaCheckCircle className={styles.icon} />
        <h1 className={styles.title}>Escolha seus Temas</h1>
        <FaCheckCircle className={styles.icon} />
      </div>
      {showInstructions && (
        <h3 className={styles.subtitle}>
          <FaList className={styles.iconLeft} /> Selecione pelo menos 3 para continuar
        </h3>
      )}

      <div className={styles.categoryButtons}>
        {categories.map((category) => (
          <CategoryButton
            key={category.name}
            category={category}
            isSelected={selected.includes(category.name)}
            onClick={toggleCategory}
          />
        ))}
      </div>

      <ContinueButton onClick={handleSubmit} />
    </div>
  );
};

export default CategorySelection;