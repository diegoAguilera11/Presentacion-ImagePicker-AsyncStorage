import React, { useState, useEffect } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Carrito from './components/Carrito';

import ImageExample from './components/ImageExample';


const App = () => {

  const [carrito, setCarrito] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [imageModal, setImageModal] = useState(false)


  useEffect(() => {
    const obtenerAS = async () => {
      const carritoStorage = await AsyncStorage.getItem('productos_carrito')
      setCarrito(carritoStorage ? JSON.parse(carritoStorage) : []);
    }

    obtenerAS()
  }, [])

  // Guardar Carrito Async Storage
  useEffect(() => {

    const guardarProductosStorage = async () => {

      try {
        await AsyncStorage.setItem('productos_carrito', JSON.stringify(carrito))
      } catch (error) {
        console.log(error)
      }
    }

    guardarProductosStorage()

  }, [carrito])


  const cerrarModal = () => {
    setModalVisible(false)
  }
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 25, textAlign: 'center', marginTop: 20, marginBottom: 40, fontWeight: '800', color: '#000' }}>AsyncStorage y ImagePicker</Text>
      <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ backgroundColor: '#FAFA22', marginHorizontal: 30, paddingVertical: 20, borderRadius: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: '#000', textTransform: 'uppercase' }}>Ver productos</Text>
      </Pressable>

      <Pressable onPress={() => setImageModal(!imageModal)} style={{ marginTop: 20, backgroundColor: '#FA2', marginHorizontal: 30, paddingVertical: 20, borderRadius: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: '#000', textTransform: 'uppercase' }}>Image Picker</Text>
      </Pressable>

      {modalVisible && (
        <Carrito
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          carrito={carrito}
          setCarrito={setCarrito}
        />
      )}

      {imageModal && (
        <ImageExample
          imageModal={imageModal}
          setImageModal={setImageModal}
        />
      )}




    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
