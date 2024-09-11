import React, { useState, useEffect } from 'react';

const Produtos = ({ setPage }) => {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '' });

  useEffect(() => {
    const storedProdutos = localStorage.getItem('produtos');
    if (storedProdutos) {
      setProdutos(JSON.parse(storedProdutos));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddProduto = (e) => {
    e.preventDefault();
    const updatedProdutos = [...produtos, form];
    setProdutos(updatedProdutos);
    localStorage.setItem('produtos', JSON.stringify(updatedProdutos));
    setForm({ nome: '', descricao: '', preco: '' });
  };

  const handleEditProduto = (index) => {
    // Implement editing logic
  };

  const handleDeleteProduto = (index) => {
    const updatedProdutos = produtos.filter((_, i) => i !== index);
    setProdutos(updatedProdutos);
    localStorage.setItem('produtos', JSON.stringify(updatedProdutos));
  };

  return (
    <div>
      <h1>Produtos</h1>
      <form onSubmit={handleAddProduto}>
        <input type="text" name="nome" value={form.nome} onChange={handleInputChange} placeholder="Nome" required />
        <input type="text" name="descricao" value={form.descricao} onChange={handleInputChange} placeholder="Descrição" required />
        <input type="number" name="preco" value={form.preco} onChange={handleInputChange} placeholder="Preço" required />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {produtos.map((produto, index) => (
          <li key={index}>
            {produto.nome} - {produto.preco}
            <button onClick={() => handleEditProduto(index)}>Editar</button>
            <button onClick={() => handleDeleteProduto(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produtos;
