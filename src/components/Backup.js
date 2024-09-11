import React from 'react';

const Backup = () => {
  const handleDownloadBackup = () => {
    const agendamentos = localStorage.getItem('agendamentos');
    const clientes = localStorage.getItem('clientes');
    const produtos = localStorage.getItem('produtos');
    const backup = { agendamentos, clientes, produtos };

    const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup.json';
    a.click();
  };

  const handleRestoreBackup = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        localStorage.setItem('agendamentos', data.agendamentos);
        localStorage.setItem('clientes', data.clientes);
        localStorage.setItem('produtos', data.produtos);
        alert('Backup restaurado com sucesso');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h1>Backup e Restauração</h1>
      <button onClick={handleDownloadBackup}>Baixar Backup</button>
      <input type="file" accept=".json" onChange={handleRestoreBackup} />
    </div>
  );
};

export default Backup;
