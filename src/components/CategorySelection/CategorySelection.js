import React, { useState } from "react";
import { FaPaw, FaFilm, FaFutbol, FaBox, FaMusic, FaUtensils, FaPlane, FaBook, FaGamepad, FaArrowRight } from "react-icons/fa";
import "./CategorySelection.css";

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

function CategorySelection({ onSelect }) {
  const [selected, setSelected] = useState([]);
  const [showInstructions] = useState(true);

  const toggleCategory = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      setSelected([...selected, category]);
    }
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
          <button
            key={category.name}
            className={`category-button ${selected.includes(category.name) ? "selected" : ""}`}
            onClick={() => toggleCategory(category.name)}
          >
            <span className="icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <button className="continue-button" onClick={handleSubmit}>
        Continuar <FaArrowRight className="icon" />
      </button>
    </div>
  );
}

export default CategorySelection;
