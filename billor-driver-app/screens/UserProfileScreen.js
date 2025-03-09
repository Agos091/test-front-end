import { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { firestore, auth } from '../firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'

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
            <Text style={styles.title}>Perfil do Usuário</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                editable={false}
            />

            <Button title="Salvar Alterações" onPress={handleSaveProfile} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
})
