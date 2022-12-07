import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, Pressable, TextInput, Modal, StyleSheet, FlatList, Alert, ScrollView } from 'react-native'

const Carrito = ({ modalVisible, setModalVisible, carrito, setCarrito }) => {


    const productos = [
        {
            id: 1,
            nombre: 'Coca Cola',
            precio: 1500
        },
        {
            id: 2,
            nombre: 'Pan con Jamon',
            precio: 1000
        },
        {
            id: 3,
            nombre: 'Papas fritas',
            precio: 2000
        },
        {
            id: 4,
            nombre: 'Carne con arroz',
            precio: 9000

        },
        {
            id: 5,
            nombre: 'Jugo de Naranja',
            precio: 2000
        },
        {
            id: 6,
            nombre: 'Jugo de Manzana',
            precio: 1300
        }
    ];

    const agregarProducto = (item) => {
        const existe = carrito.some(producto => producto.id === item.id);

        if (existe) {
            Alert.alert('ERROR', 'El producto ya esta en el carrito')
            return
        }

        setCarrito([...carrito, item])
        Alert.alert('EXITO', 'Producto agregado exitosamente')
    }


    return (
        <Modal animationType='slide' visible={modalVisible}>
            <Pressable style={styles.btnCancelar} onLongPress={() => setModalVisible(false)}>
                <Text style={styles.btnCancelarTexto}>Cerrar</Text>
            </Pressable>

            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}> Catálogo Productos</Text>

            <View style={styles.containerFlatlist}>
                <FlatList
                    style={{ marginVertical: 20 }}
                    data={productos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.contenidoFlatList}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 15 }}> ID: {item.id}</Text>
                                    <Text style={{ fontSize: 15 }}>NOMBRE: {item.nombre}</Text>
                                    <Text style={{ fontSize: 15 }}>PRECIO: {item.precio}</Text>
                                </View>
                                <Pressable
                                    style={styles.buttonCarrito}
                                    onPress={() => agregarProducto(item)}
                                >
                                    <Text style={{ color: '#FFF', textTransform: 'uppercase', fontWeight: 'bold', paddingHorizontal: 3 }}>Agregar Carrito</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                />
            </View>


            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Carrito</Text>
            <View style={styles.containerFlatlistCarrito}>
                {carrito.length === 0 ? <Text style={{fontSize: 20, textTransform: 'uppercase', textAlign: 'center', marginVertical: 80, fontWeight: 'bold'}}>No hay Productos en el carrito</Text> :
                    <FlatList
                        data={carrito}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.contenidoFlatList}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 15 }}>NOMBRE: {item.nombre}</Text>
                                </View>
                            </View>
                        )}
                    />
                }
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    btnCancelar: {
        backgroundColor: '#F32223',
        marginHorizontal: 60,
        marginTop: 20,
        marginBottom: 20,
        paddingVertical: 20,
        borderRadius: 40
    },
    btnCancelarTexto: {
        fontSize: 25,
        textAlign: 'center',
        color: '#000'
    },
    containerFlatlist: {
        flex: 1,
        margin: 10,
        backgroundColor: '#C0CABD',
        borderRadius: 20

    },
    containerFlatlistCarrito: {
        flex: 1,
        marginBottom: 80,
        backgroundColor: '#E79864',
        borderRadius: 20

    },
    contenidoFlatList: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    buttonCarrito: {
        borderRadius: 10,
        backgroundColor: '#008800',
        paddingVertical: 10
    }
})
export default Carrito