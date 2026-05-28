import React, { useState, createContext, useContext } from 'react';

// 1. Criar o Contexto
export const AuthContext = createContext();

// 2. Dados de Estoque (Dados Simulados)
const initialStockData = {
  usuarioLogado: null, // { nome: '...', tipo: 'Patrao'/'Funcionario' }
  tarefas: [
    { id: 1, produto: 'Coca lata', esperado: 100, contado: 0, status: 'Pendente' },
    { id: 2, produto: 'Fanta lata', esperado: 150, contado: 0, status: 'Pendente' },
    { id: 3, produto: '', esperado: 50, contado: 0, status: 'Pendente' },
  ],
};

// 3. Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(initialStockData);

  // Lógica de Login Simulada
  const login = (usuario, senha) => {
    if (usuario === 'patrao' && senha === '123') {
      setData(prev => ({
        ...prev,
        usuarioLogado: { nome: 'Amanda Barros', tipo: 'Patrao' },
      }));
      return 'Patrao';
    }
    if (usuario === 'funcionario' && senha === '456') {
      setData(prev => ({
        ...prev,
        usuarioLogado: { nome: 'Gabriel Faria', tipo: 'Funcionario' },
      }));
      return 'Funcionario';
    }
    return null;
  };

  const logout = () => {
    setData(prev => ({ ...prev, usuarioLogado: null }));
  };

  // Função para Patrão adicionar nova tarefa (Simulação de Gestão)
  const adicionarTarefa = (produto, esperado) => {
      const novaTarefa = {
          id: Date.now(),
          produto,
          esperado: parseInt(esperado),
          contado: 0,
          status: 'Pendente',
      };
      setData(prev => ({
          ...prev,
          tarefas: [...prev.tarefas, novaTarefa],
      }));
  };

  // Função para atualizar a contagem do funcionário
  const registrarContagem = (idTarefa, qtdContada) => {
    setData(prev => ({
      ...prev,
      tarefas: prev.tarefas.map(t =>
        t.id === idTarefa
          ? { ...t, contado: parseInt(qtdContada), status: 'Concluída' }
          : t
      ),
    }));
  };

  const removerConcluidas = () => {
    setData(prev => ({
      ...prev,
      tarefas: prev.tarefas.filter(t => t.status !== 'Concluída'),
    }));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        data, 
        login, 
        logout, 
        adicionarTarefa, 
        registrarContagem, 
        removerConcluidas 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para uso
export const useAuth = () => useContext(AuthContext);