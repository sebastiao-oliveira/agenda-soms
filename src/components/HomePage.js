// src/components/HomePage.js
import React, { useState } from 'react';

const HomePage = ({ setPage }) => {
  const [nome, setNome] = useState(localStorage.getItem('nome') || '');

  const handleInputChange = (e) => {
    setNome(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('nome', nome);
    setPage('dashboard'); // Redirecionar para a página principal após inserir o nome
  };

  return (
    <div>
      <h1>Bem-vindo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={handleInputChange}
          placeholder="Digite seu nome"
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default HomePage;
