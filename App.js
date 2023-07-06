import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import react, { useEffect, useState } from 'react';
import Header from './componentes/Header';


export default function App() {



  const [estado, setEstado] = useState('leitura');
  const [anotacao, setAnotacao] = useState('');

  useEffect(() => {

      (async () => {

        try{
          const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
          setAnotacao(anotacaoLeitura); 
        }catch(error){

        }


      })();

  }, [])

  setData = async() => {

    try{
      await AsyncStorage.setItem('anotacao', anotacao);
    }catch(error){
      alert(error);
    }

    alert('Sua anotação foi salva!')

  }

  function atualizarTexto(){

      setEstado('leitura');
    setData();
  }

  if (estado === "leitura") {
  return (
    <View style={{flex: 1}}>
    <StatusBar hidden/>

      <View style={styles.header} >
        <Text style={{textAlign: "center", color: 'white', fontSize: 20}}>Aplicativo de Anotações</Text>
      </View>

      {
        (anotacao != '')
        ?
      <View style={{padding: 20}}>
        <Text style={styles.anotacao}>{anotacao}</Text>
      </View>
      
      :
      
      <View style={{padding: 20}}>
        <Text style={styles.anotacao}>Ainda nenhuma anotação...</Text>
      </View>
      }

      <TouchableOpacity onPress={()=> setEstado('atualizando')} style={styles.btAnotacao}>
      
      {
        (anotacao == "")
        ?
        <Text style={styles.btAnotacaoTexto}>+</Text>
        :
        <Text style={{color: 'white', width: 110, left: 7, top: 14  }}>Editar</Text>
      }
      
      </TouchableOpacity>
    </View>



  )
} else if (estado == 'atualizando' ) {

  return (
    <View style={{flex: 1}}>
    <StatusBar hidden/>

      <View style={styles.header}>
        <Text style={{textAlign: "center", color: 'white', fontSize: 20}}>Aplicativo de Anotações</Text>
      </View>
      
      <TextInput autoFocus={true} onChangeText={(text)=>setAnotacao(text)} multiline={true} numberOfLines={5} value={anotacao} style={{height: 500, width: 300, textAlignVertical: 'top', padding: 20}}></TextInput>

      <TouchableOpacity onPress={()=> atualizarTexto()} style={styles.btAnotacao2}><Text style={styles.textAnotacao}>Salvar</Text></TouchableOpacity>
    </View>
  );

}}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 25,
    backgroundColor: "#9d14b5",
  },

    anotacao: {
      fontsize: 13,
      opacity: .5,
      
    },

    btAnotacao: {
      position: 'absolute',
      right: 25,
      top: 100,
      width: 50,
      height: 50,
      backgroundColor: '#9d14b5',
      borderRadius: 25,
    },

    btAnotacao2: {
      position: 'absolute',
      right: 25,
      top: 100,
      width: 100,
      height: 50,
      backgroundColor: '#9d14b5',
      borderRadius: 25,
    },
  
    btAnotacaoTexto: {
      color: "white",
      position: "relative",
      textAlign: "center",
      top: 7,
      fontSize: 25,
    },

    textAnotacao: {
      left: 28,
      top: 13,
      fontSize: 16,
      color: "white",
    }
});


