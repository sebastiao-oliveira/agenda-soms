import React, { useState, useEffect } from 'react';

const Clientes = ({ setPage }) => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nome: '', telefone: '', nascimento: '', endereco: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
    }
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredClientes(clientes);
    } else {
      const filtered = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.telefone.includes(searchTerm)
      );
      setFilteredClientes(filtered);
    }
  }, [searchTerm, clientes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCliente = (e) => {
    e.preventDefault();
    const updatedClientes = [...clientes, form];
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
    setForm({ nome: '', telefone: '', nascimento: '', endereco: '' });
  };

  const handleEditCliente = (index) => {
    // Implementar a lógica de edição
  };

  const handleDeleteCliente = (index) => {
    const updatedClientes = clientes.filter((_, i) => i !== index);
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  const handleNewAgendamento = (cliente) => {
    setPage('agendamentos', cliente);
  };

  return (
    <div>
      <h1>Clientes</h1>
      
      <input
        type="text"
        placeholder="Buscar cliente por nome ou telefone"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      <form onSubmit={handleAddCliente}>
        <input type="text" name="nome" value={form.nome} onChange={handleInputChange} placeholder="Nome" required />
        <input type="text" name="telefone" value={form.telefone} onChange={handleInputChange} placeholder="Telefone" required />
        <input type="date" name="nascimento" value={form.nascimento} onChange={handleInputChange} required />
        <input type="text" name="endereco" value={form.endereco} onChange={handleInputChange} placeholder="Endereço" required />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {filteredClientes.map((cliente, index) => (
          <li key={index}>
            {cliente.nome} - {cliente.telefone}
            <button onClick={() => handleEditCliente(index)}>Editar</button>
            <button onClick={() => handleDeleteCliente(index)}>Excluir</button>
            <button onClick={() => handleNewAgendamento(cliente)}>Novo Agendamento</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
