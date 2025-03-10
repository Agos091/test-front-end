import { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { TextInput, Button, Title } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => navigation.navigate('Home'))
            .catch(error => Alert.alert('Erro', error.message))
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>🚚 Billor Driver App</Title>

            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                label="Senha"
                mode="outlined"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
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
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        padding: 5,
    },
})
