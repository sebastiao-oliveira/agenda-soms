import React, { useState, useEffect } from 'react';

const Agendamentos = ({ setPage, cliente }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [form, setForm] = useState({
    cliente: cliente?.nome || '',
    data: '',
    hora: '',
    procedimento: '',
    produto: '',
    valor: '',
    status_pagamento: '',
    status_atendimento: ''
  });

  useEffect(() => {
    const storedAgendamentos = localStorage.getItem('agendamentos');
    if (storedAgendamentos) {
      setAgendamentos(JSON.parse(storedAgendamentos));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddAgendamento = (e) => {
    e.preventDefault();

    const updatedForm = {
      ...form,
      valor: parseFloat(form.valor) || 0, // Garantir valor numérico
    };

    const updatedAgendamentos = [...agendamentos, updatedForm];
    setAgendamentos(updatedAgendamentos);
    localStorage.setItem('agendamentos', JSON.stringify(updatedAgendamentos));
    
    setForm({
      cliente: cliente?.nome || '',
      data: '',
      hora: '',
      procedimento: '',
      produto: '',
      valor: '',
      status_pagamento: '',
      status_atendimento: ''
    });
  };

  const handleStatusChange = (index, field, value) => {
    const updatedAgendamentos = agendamentos.map((agendamento, i) =>
      i === index ? { ...agendamento, [field]: value } : agendamento
    );
    setAgendamentos(updatedAgendamentos);
    localStorage.setItem('agendamentos', JSON.stringify(updatedAgendamentos));
  };

  return (
    <div>
      <header>
        <h1>Agendamentos para {cliente?.nome || 'Cliente não selecionado'}</h1>
        <button onClick={() => setPage('clientes')}>Voltar</button>
        <button onClick={() => setPage('relatorio')}>Ver Relatório</button>
      </header>
      <form onSubmit={handleAddAgendamento}>
        <input
          type="text"
          name="cliente"
          value={form.cliente}
          onChange={handleInputChange}
          placeholder="Cliente"
          required
        />
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="procedimento"
          value={form.procedimento}
          onChange={handleInputChange}
          placeholder="Procedimento"
          required
        />
        <input
          type="text"
          name="produto"
          value={form.produto}
          onChange={handleInputChange}
          placeholder="Produto"
          required
        />
        <input
          type="number"
          name="valor"
          value={form.valor}
          onChange={handleInputChange}
          placeholder="Valor"
          required
        />
        <select
          name="status_pagamento"
          value={form.status_pagamento}
          onChange={handleInputChange}
          required
        >
          <option value="">Status Pagamento</option>
          <option value="pago">Pago</option>
          <option value="pendente">Pendente</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <select
          name="status_atendimento"
          value={form.status_atendimento}
          onChange={handleInputChange}
          required
        >
          <option value="">Status Atendimento</option>
          <option value="agendado">Agendado</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluído">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <button type="submit">Adicionar Agendamento</button>
      </form>

      {/* Lista de agendamentos */}
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Procedimento</th>
            <th>Produto</th>
            <th>Valor</th>
            <th>Status Pagamento</th>
            <th>Status Atendimento</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento, index) => (
            <tr key={index}>
              <td>{agendamento.cliente}</td>
              <td>{agendamento.data}</td>
              <td>{agendamento.hora}</td>
              <td>{agendamento.procedimento}</td>
              <td>{agendamento.produto}</td>
              <td>{parseFloat(agendamento.valor).toFixed(2)}</td>
              <td>
                <select
                  value={agendamento.status_pagamento}
                  onChange={(e) =>
                    handleStatusChange(index, 'status_pagamento', e.target.value)
                  }
                >
                  <option value="pago">Pago</option>
                  <option value="pendente">Pendente</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </td>
              <td>
                <select
                  value={agendamento.status_atendimento}
                  onChange={(e) =>
                    handleStatusChange(index, 'status_atendimento', e.target.value)
                  }
                >
                  <option value="agendado">Agendado</option>
                  <option value="em andamento">Em Andamento</option>
                  <option value="concluído">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Agendamentos;
