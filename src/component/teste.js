import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Picker from '@react-native-picker/picker';

import NotaEditor from './src/componentes/NotaEditor';
import Nota from './src/componentes/NotaEditor';
import { criarTabela, buscarNotas } from './src/services/Notas';

export default function App(){
  const [ notas, setNotas ] = useState([]);
  const [ notaSel, setNotaSel ] = useState({});
  const [ categoria, setCategoria ] = useState('*');

  useEffect(() => {
    criarTabela();
  }, []);

  useEffect(() => {
    async function iniciarNotas(){
      await mostrarNotas();
    }
    iniciarNotas();
  }, [categoria]);

  async function mostrarNotas(){
    const tarefas = await buscarNotas(categoria);
    setNotas(tarefas);
  }

  return(
    <SafeAreaView style={estilos.container}>
      <View style={estilos.modalPicker}>
        <Picker selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          <Picker.Item Label="Pessoal"  value="Pessoal" />
          <Picker.Item Label="Trabalho" value="Trabalho" />
          <Picker.Item Label="Outros"   value="Outros" />
        </Picker>
      </View>

      <FlatList data={notas}
                renderItem={(nota) => (
                  <Nota item={nota.item} setNotaSel={setNotaSel} />
                )}
                keyExtractor={(nota) => nota.id}      
      />
      <NotaEditor showNotas={mostrarNotas} 
                  notaSel={notaSel} 
                  setNotaSel={setNotaSel} 
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  modalPicker: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#eee',
    margin: 10,
  },
})