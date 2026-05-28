import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../Context';

export default function DashboardScreen({ navigation }) {
  const { data, logout, removerConcluidas } = useAuth(); 
  
  const totalTarefas = data.tarefas.length;
  const concluidas = data.tarefas.filter(t => t.status === 'Concluída').length;
  const pendentes = totalTarefas - concluidas;

  const handleRemoverConcluidas = () => {
    if (concluidas === 0) {
      Alert.alert('Aviso', 'Não há tarefas concluídas para remover.');
      return;
    }

    // Usando o Alert.alert completo com confirmação
    Alert.alert(
      'Confirmar Limpeza',
      `Tem certeza que deseja remover as ${concluidas} tarefas concluídas?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => {
            removerConcluidas();
            Alert.alert('Sucesso', 'Tarefas concluídas removidas.');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemProduct}>{item.produto}</Text>
      <Text>Esperado: {item.esperado}</Text>
      <Text>Contado: {item.contado}</Text>
      <Text style={item.status === 'Concluída' ? styles.statusConcluida : styles.statusPendente}>
        Status: {item.status}
      </Text>
    </View>
  );

 return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Gerencial</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total de Tarefas: {totalTarefas}</Text>
        <Text style={[styles.summaryText, styles.statusConcluida]}>Concluídas: {concluidas}</Text>
        <Text style={[styles.summaryText, styles.statusPendente]}>Pendentes: {pendentes}</Text>
      </View>

      <Button 
        title="Gerenciar Tarefas" 
        onPress={() => navigation.navigate('Gestao')} 
        color="#007bff" 
      />

      <View style={{ marginTop: 10 }}>
        <Button 
          title={`Limpar ${concluidas} Tarefas Concluídas`} 
          onPress={handleRemoverConcluidas} 
          color="#dc3545" 
          disabled={concluidas === 0}
        />
      </View>

      <FlatList
        data={data.tarefas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={{ marginTop: 20, flex: 1 }} 
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Sair (Logout)" onPress={logout} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
  summaryContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
  },
  summaryText: { fontSize: 16, marginBottom: 5 },
  item: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  itemProduct: { fontWeight: 'bold', fontSize: 16 },
  statusConcluida: { color: 'green', fontWeight: 'bold' },
  statusPendente: { color: 'orange', fontWeight: 'bold' },
});