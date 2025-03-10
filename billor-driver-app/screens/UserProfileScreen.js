import { useEffect, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { firestore, auth } from '../firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { TextInput, Button, Card, Title } from 'react-native-paper'

export default function UserProfileScreen() {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        const user = auth.currentUser
        if (!user) return

        setEmail(user.email)

        const docRef = doc(firestore, 'usuarios', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const data = docSnap.data()
            setNome(data.nome || '')
            setTelefone(data.telefone || '')
        }
    }

    const handleSaveProfile = async () => {
        const user = auth.currentUser
        if (!user) return

        await setDoc(doc(firestore, 'usuarios', user.uid), {
            nome,
            telefone,
            email: user.email,
        }, { merge: true })

        Alert.alert('🎉 Sucesso!', 'Perfil salvo com sucesso.')
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Meu Perfil</Title>

            <Card style={styles.card}>
                <Card.Content>
                    <TextInput
                        mode="outlined"
                        label="Nome"
                        value={nome}
                        onChangeText={setNome}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Telefone"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Email"
                        value={email}
                        editable={false}
                        style={styles.input}
                    />
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={handleSaveProfile}>
                        Salvar Alterações
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        padding: 10,
    },
    input: {
        marginBottom: 10,
    },
})
