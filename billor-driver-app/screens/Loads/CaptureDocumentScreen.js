import { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Button, Card, Title } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebaseConfig'
import { Image } from 'react-native'

export default function CaptureDocumentScreen() {
    const [image, setImage] = useState(null)

    const handleCaptureImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Permissão para câmera negada.')
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
            <Title style={styles.title}>Capturar Documento</Title>

            <Card style={styles.card}>
                <Card.Actions>
                    <Button mode="contained" onPress={handleCaptureImage}>
                        Abrir Câmera
                    </Button>
                </Card.Actions>
            </Card>

            {image && (
                <>
                    <Image source={{ uri: image }} style={styles.preview} />
                    <Button mode="outlined" onPress={uploadImageToFirebase} style={styles.uploadButton}>
                        Enviar para Firebase
                    </Button>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: 20,
    },
    card: {
        marginBottom: 20,
        width: '100%',
    },
    preview: {
        width: 300,
        height: 300,
        marginVertical: 20,
        borderRadius: 10,
    },
    uploadButton: {
        marginTop: 10,
    },
})
