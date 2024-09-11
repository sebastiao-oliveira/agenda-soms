import React, { useState, useEffect } from 'react';

const Relatorio = ({ setPage }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [totais, setTotais] = useState({ totalPago: 0, totalPendente: 0 });

  useEffect(() => {
    const storedAgendamentos = localStorage.getItem('agendamentos');
    if (storedAgendamentos) {
      const agendamentosData = JSON.parse(storedAgendamentos);

      // Filtrar agendamentos do último mês
      const agora = new Date();
      const ultimoMes = new Date(agora.setMonth(agora.getMonth() - 1));

      const agendamentosUltimoMes = agendamentosData.filter(agendamento => {
        const dataAgendamento = new Date(agendamento.data);
        return dataAgendamento >= ultimoMes;
      });

      setAgendamentos(agendamentosUltimoMes);

      // Calcular totais
      const totalPago = agendamentosUltimoMes
        .filter(a => a.status_pagamento === 'pago')
        .reduce((acc, a) => acc + parseFloat(a.valor), 0);

      const totalPendente = agendamentosUltimoMes
        .filter(a => a.status_pagamento === 'pendente')
        .reduce((acc, a) => acc + parseFloat(a.valor), 0);

      setTotais({ totalPago, totalPendente });
    }
  }, []);

  return (
    <div>
      <header>
        <h1>Relatório Financeiro</h1>
        <button onClick={() => setPage('clientes')}>Voltar para Clientes</button>
      </header>
      <h2>Totais do Último Mês</h2>
      <p>Total Pago: R$ {totais.totalPago.toFixed(2)}</p>
      <p>Total Pendente: R$ {totais.totalPendente.toFixed(2)}</p>

      {/* Lista de agendamentos filtrados */}
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
              <td>{agendamento.status_pagamento}</td>
              <td>{agendamento.status_atendimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Relatorio;
