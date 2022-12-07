import React, { useState } from 'react'
import {
    View, Text, Pressable, TextInput, Modal, StyleSheet, TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
    SafeAreaView
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'

const ImageExample = ({ imageModal, setImageModal }) => {

    const [image, setImage] = useState('https://via.placeholder.com/200')

    const handleChoosePhoto = () => {
        const options = {
            title: 'Seleccionar Imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        launchImageLibrary(options, response => {

            if (response.errorCode) {
                console.log(response.errorMessage)
            } else if (response.didCancel) {
                console.log('El usuario cancelo la acción')
            } else {
                const path = response.assets[0].uri
                setImage(path)
                uploadImage(response);
            }

        })
    }
    const uploadImage = async (response) => {

        const uri = Platform.OS === "android"
            ? response.assets[0].uri
            : image.replace("file://", "");

        const formData = new FormData();

        formData.append("image", {
            uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
        });

        try {
            const {data} = await axios.post('http://10.12.1.185:8000/api/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (!data.isSuccess) {
                alert("Image upload failed!");
                return;
            }
            console.log(data.url)
            alert("Imagen subida al BackEnd!");
        } catch (err) {
            console.log(err);
            alert("Algo salio mal...");
        } finally {
            setImage(undefined);
        }

    }
    return (
        <Modal animationType='slide' visible={imageModal}>
            <View style={styles.contenedor}>
            <Pressable style={styles.btnCancelar} onLongPress={() => setImageModal(false)}>
                    <Text style={styles.btnCancelarTexto}>Cerrar</Text>
                </Pressable>
                <Pressable style={styles.btnImagen} onPress={() => handleChoosePhoto()}>
                    <Text style={styles.btnImagenTexto}>Agregar Imagen</Text>
                </Pressable>

                <Image
                    style={{ alignSelf: 'center', height: 200, width: 200 }}
                    source={{ uri: image }}
                />
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    btnCancelar: {
        backgroundColor: '#F32223',
        marginHorizontal: 80,
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 40
    },
    btnCancelarTexto: {
        fontSize: 25,
        textAlign: 'center',
        color: '#000'
    },
    btnImagen: {
        backgroundColor: '#Fafa',
        marginHorizontal: 80,
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 40,
        marginBottom: 20
    },
    btnImagenTexto: {
        fontSize: 25,
        textAlign: 'center',
        color: '#000'
    },
    textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        marginVertical: 10,
        width: 250,
    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
})

export default ImageExample