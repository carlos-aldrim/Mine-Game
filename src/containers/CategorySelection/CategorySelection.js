import React, { useState } from "react";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import ContinueButton from "../../components/ContinueButton/ContinueButton";
import "./CategorySelection.css";
import { FaPaw, FaFilm, FaFutbol, FaBox, FaMusic, FaUtensils, FaPlane, FaBook, FaGamepad } from "react-icons/fa";

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
    <div className="category-selection">
      <h1 className="title">🎭 Escolha suas Categorias 🎭</h1>
      {showInstructions && <h3 className="subtitle">Selecione pelo menos 3 para continuar</h3>}
      
      <div className="category-buttons">
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
