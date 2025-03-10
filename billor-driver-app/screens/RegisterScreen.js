import { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { TextInput, Button, Title } from 'react-native-paper'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

export default function RegisterScreen({ navigation }) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        if (!nome || !telefone || !email || !password) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!')
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await setDoc(doc(firestore, 'usuarios', user.uid), {
                nome,
                telefone,
                email,
            })

            Alert.alert('🎉 Sucesso!', 'Cadastro realizado com sucesso!')
        } catch (error) {
            Alert.alert('Erro no cadastro', error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Criar Conta</Title>

            <TextInput
                label="Nome"
                mode="outlined"
                style={styles.input}
                onChangeText={setNome}
            />

            <TextInput
                label="Telefone"
                mode="outlined"
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={setTelefone}
            />

            <TextInput
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={setEmail}
            />

            <TextInput
                label="Senha"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
            />

            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Cadastrar
            </Button>

            <Button onPress={() => navigation.goBack()} style={styles.linkButton}>
                Já tenho conta (Login)
            </Button>
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
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
})
