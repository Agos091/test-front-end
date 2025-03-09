import { useState } from 'react'
import { View, Button, Image, StyleSheet, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebaseConfig'

export default function CaptureDocumentScreen() {
    const [image, setImage] = useState(null)

    const handleCaptureImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()

        if (status !== 'granted') {
            alert('Permissão para câmera negada.')
            return
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const uploadImageToFirebase = async () => {
        if (!image) {
            Alert.alert('Erro', 'Nenhuma imagem capturada!')
            return
        }

        try {
            const response = await fetch(image)
            const blob = await response.blob()

            const storageRef = ref(storage, `documentos/${Date.now()}-documento.jpg`)
            await uploadBytes(storageRef, blob)

            const downloadURL = await getDownloadURL(storageRef)
            console.log('URL da Imagem:', downloadURL)

            Alert.alert('🎉 Sucesso!', 'Imagem enviada ao Firebase com sucesso!')
        } catch (error) {
            Alert.alert('Erro ao enviar', error.message)
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Capturar Documento" onPress={handleCaptureImage} />

            {image && (
                <>
                    <Image source={{ uri: image }} style={styles.preview} />
                    <Button title="Enviar para Firebase" onPress={uploadImageToFirebase} />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    preview: {
        width: 300,
        height: 300,
        marginVertical: 20,
    },
})
