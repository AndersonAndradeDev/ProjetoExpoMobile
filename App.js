import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/Context'; 
import { View, ActivityIndicator } from 'react-native';

// --- Importe todas as Telas ---
import LoginScreen from './src/screens/LoginScreen';

// Telas do Patrão
import DashboardScreen from './src/screens/Patrao/DashboardScreen';
import GestaoScreen from './src/screens/Patrao/GestaoScreen';

// Telas do Funcionário
import RegistroScreen from './src/screens/Funcionario/RegistroScreen';
import TarefasScreen from './src/screens/Funcionario/TarefasScreen';

const Stack = createStackNavigator();

const FuncionarioStack = () => (
  <Stack.Navigator initialRouteName="Tarefas">
    <Stack.Screen name="Tarefas" component={TarefasScreen} options={{ title: 'Minhas Tarefas' }} />
    <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Registrar Contagem' }} />
  </Stack.Navigator>
);

const PatraoStack = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Visão Geral do Estoque' }} />
    <Stack.Screen name="Gestao" component={GestaoScreen} options={{ title: 'Gerenciar Contagens' }} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { data } = useAuth();
  const usuarioLogado = data.usuarioLogado;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuarioLogado ? (
        // Usuário Logado: Decide qual Stack de telas mostrar
        usuarioLogado.tipo === 'Patrao' ? (
          <Stack.Screen name="PatraoStack" component={PatraoStack} />
        ) : (
          <Stack.Screen name="FuncionarioStack" component={FuncionarioStack} />
        )
      ) : (
        // Usuário Deslogado: Vai para a tela de Login
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

// Componente App principal
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}