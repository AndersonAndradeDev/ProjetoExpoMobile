import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../Context';

export default function GestaoScreen() {
  const { adicionarTarefa } = useAuth();
  const [produto, setProduto] = useState('');
  const [esperado, setEsperado] = useState('');

  const handleAddTarefa = () => {
    if (produto.trim() === '' || isNaN(esperado) || parseInt(esperado) <= 0) {
      Alert.alert('Erro', 'Por favor, insira o produto e uma quantidade esperada válida.');
      return;
    }
    
    adicionarTarefa(produto, esperado);
    Alert.alert('Sucesso', `Tarefa de contagem para ${produto} adicionada.`);
    setProduto('');
    setEsperado('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Tarefa de Contagem</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={produto}
        onChangeText={setProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade Esperada"
        keyboardType="numeric"
        value={esperado}
        onChangeText={setEsperado}
      />
      <Button title="Adicionar Tarefa" onPress={handleAddTarefa} />
      
      <Text style={styles.info}>
        *As tarefas adicionadas aparecerão imediatamente no Dashboard e na lista do Funcionário.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 20, marginBottom: 30, fontWeight: 'bold', textAlign: 'center' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  info: {
      marginTop: 30,
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
  }
});