import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context';

export default function TarefasScreen({ navigation }) {
  const { data, logout } = useAuth();
  // Filtra as tarefas pendentes, atualiza automaticamente com o Context
  const tarefasPendentes = data.tarefas.filter(t => t.status === 'Pendente'); 

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('Registro', { tarefaId: item.id, produto: item.produto })}
    >
      <Text style={styles.itemText}>{item.produto}</Text>
      <Text style={styles.itemStatus}>Qtd. Esperada: {item.esperado}</Text>
      <Text style={styles.itemAction}>Tocar para Registrar</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas de Contagem do Dia</Text>
      <FlatList
        data={tarefasPendentes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20}}>Nenhuma tarefa pendente. Bom trabalho!</Text>}
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Sair (Logout)" onPress={logout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 20, marginBottom: 15, fontWeight: 'bold' },
  item: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 5,
  },
  itemText: { fontSize: 18, fontWeight: 'bold' },
  itemStatus: { fontSize: 14, color: '#555' },
  itemAction: { fontSize: 12, color: 'blue', marginTop: 5 },
});