import React, { useState, useEffect } from 'react';
import Agendamentos from './components/Agendamentos';
import Clientes from './components/Clientes';
import Produtos from './components/Produtos';
import Backup from './components/Backup';
import Relatorio from './components/Relatorio';
import Home from './components/Home';

function App() {
  const [page, setPage] = useState('home');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleNameSubmit = (name) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    setPage('agendamentos'); // Vai para a página de agendamentos após definir o nome
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home onSubmit={handleNameSubmit} />;
      case 'agendamentos':
        return <Agendamentos setPage={setPage} />;
      case 'clientes':
        return <Clientes setPage={setPage} />;
      case 'produtos':
        return <Produtos setPage={setPage} />;
      case 'backup':
        return <Backup />;
      case 'relatorio':
        return <Relatorio />;
      default:
        return <Agendamentos setPage={setPage} />;
    }
  };

  return (
    <div className="App">
      <nav>
        <div className="user-icon" onClick={() => setPage('home')}>
          <span>{userName || "Usuário"}</span>
        </div>
        <div>
          <button onClick={() => setPage('agendamentos')}>Agendamentos</button>
          <button onClick={() => setPage('clientes')}>Clientes</button>
          <button onClick={() => setPage('produtos')}>Produtos</button>
          <button onClick={() => setPage('backup')}>Backup</button>
          <button onClick={() => setPage('relatorio')}>Relatório</button>
        </div>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;
