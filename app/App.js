import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, View, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [placa, setPlaca] = useState('');
  const [dados, setDados] = useState(null);
  const [pecas, setPecas] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarPlaca = async () => {
    if (!placa) { alert('Digite uma placa'); return; }

    try {
      setLoading(true);
      setDados(null);
      setPecas([]);

      // Consulta veículo
      const resp = await fetch(`http://192.168.100.200:3333/api/placa/${placa}`);
      const veiculo = await resp.json();
      setDados(veiculo);

      if (veiculo.chassi) {
        // Consulta peças compatíveis
        const respPecas = await fetch(`http://192.168.100.200:3333/api/pecas/${veiculo.chassi}`);
        const pecasData = await respPecas.json();
        setPecas(pecasData);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao buscar veículo ou peças');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Consulta de Veículo</Text>
      <TextInput placeholder="Digite a placa" value={placa} onChangeText={setPlaca} style={styles.input} autoCapitalize="characters"/>
      <Button title={loading ? "Buscando..." : "Buscar"} onPress={buscarPlaca} disabled={loading} />

      {dados && (
        <ScrollView style={styles.resultado}>
          <Text style={styles.item}>🚗 Marca: {dados.marca || '-'}</Text>
          <Text style={styles.item}>📌 Modelo: {dados.modelo || '-'}</Text>
          <Text style={styles.item}>🎨 Cor: {dados.cor || '-'}</Text>
          <Text style={styles.item}>📅 Ano Fab: {dados.ano_fabricacao || '-'}</Text>
          <Text style={styles.item}>📅 Ano Modelo: {dados.ano_modelo || '-'}</Text>
          <Text style={styles.item}>🔑 Chassi: {dados.chassi || '-'}</Text>
        </ScrollView>
      )}

      {pecas.length > 0 && (
        <ScrollView style={styles.resultado}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>Peças compatíveis:</Text>
          {pecas.map(p => (
            <View key={p.codigo} style={{marginBottom: 8}}>
              <Text>🛠 {p.nome}</Text>
              <Text>Categoria: {p.categoria}</Text>
              <Text>Preço: R$ {p.preco}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15, backgroundColor: '#fff' },
  resultado: { marginTop: 20, backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 3 },
  item: { fontSize: 16, marginBottom: 8 }
});