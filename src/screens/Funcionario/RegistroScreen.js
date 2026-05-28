import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../Context';

export default function RegistroScreen({ route, navigation }) {
  const { tarefaId, produto } = route.params;
  const { registrarContagem } = useAuth(); // Importação do Context

  const [quantidade, setQuantidade] = useState('');

  const handleRegistro = () => {
    // Garante que a quantidade seja um número positivo
    if (isNaN(quantidade) || parseInt(quantidade) < 0 || quantidade === '') {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida.');
      return;
    }

    // Ação que atualiza o estado global e altera o status para 'Concluída'
    registrarContagem(tarefaId, quantidade); 
    Alert.alert('Sucesso', `Contagem de ${produto} registrada com ${quantidade} unidades.`);
    
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Contagem</Text>
      <Text style={styles.productName}>Produto: {produto}</Text>

      <TextInput
        style={styles.input}
        placeholder="Quantidade Contada"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <Button title="Confirmar Contagem" onPress={handleRegistro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold', textAlign: 'center' },
  productName: { fontSize: 18, marginBottom: 30, textAlign: 'center' },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 18,
  },
});