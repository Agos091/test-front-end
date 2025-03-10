import { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, senha)
            .then(() => navigation.navigate('Home'))
            .catch(error => Alert.alert('Erro', error.message))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🚚 Billor Driver App</Text>

            <TextInput
                label="Email"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                testID="input-email"
            />

            <TextInput
                secureTextEntry
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                testID="input-password"
            />

            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Entrar
            </Button>
            <Button
                mode="text"
                onPress={() => navigation.navigate('Register')}
                style={{ marginTop: 10 }}
            >
                Criar uma nova conta
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
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
    },
})
