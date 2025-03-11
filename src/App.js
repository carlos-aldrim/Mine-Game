import React, { useState, useEffect } from 'react';
import DifficultySelection from './components/DifficultySelection/DifficultySelection';
import CategorySelection from './components/CategorySelection/CategorySelection';
import Game from './components/Game/Game';

function App() {
  const [step, setStep] = useState(1);
  const [difficulty, setDifficulty] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('/words.txt')
      .then(response => response.json())
      .then(data => setWords(data))
      .catch(error => console.error('Erro ao carregar as palavras:', error));
  }, []);

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setStep(2);
  };

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    setStep(3);
  };

  return (
    <div>
      {step === 1 && <DifficultySelection onSelect={handleDifficultySelect} />}
      {step === 2 && <CategorySelection onSelect={handleCategorySelect} />}
      {step === 3 && (
        <Game
          difficulty={difficulty}
          categories={selectedCategories}
          words={words}
        />
      )}
    </div>
  );
}

export default App;
