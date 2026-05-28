import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../Context';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const tipoUsuario = login(usuario, senha);

    if (tipoUsuario === 'Patrao') {
      navigation.navigate('PatraoStack'); 
    } else if (tipoUsuario === 'Funcionario') {
      navigation.navigate('FuncionarioStack'); 
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Estoque</Text>
      <Text style={styles.subtitle}>Login Patrão (patrao/123) | Funcionário (funcionario/456)</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
  subtitle: { fontSize: 12, marginBottom: 30, textAlign: 'center', color: '#666' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});