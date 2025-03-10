import { useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Button, Title, Card } from 'react-native-paper'
import * as Notifications from 'expo-notifications'

export default function HomeScreen({ navigation }) {

    useEffect(() => {
        registerForPushNotificationsAsync()
    }, [])

    const registerForPushNotificationsAsync = async () => {
        const { status } = await Notifications.requestPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Você não permitiu notificações.')
        }
    }

    const sendTestNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: '🔔 Teste Push!',
                body: 'Sua notificação push está funcionando corretamente!',
            },
            trigger: { seconds: 3 },
        })
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>🚚 Bem-vindo, Motorista!</Title>

            <Card style={styles.card}>
                <Card.Title title="Minhas Cargas" />
                <Card.Actions>
                    <Button mode="contained" onPress={() => navigation.navigate('LoadsList')}>
                        Abrir
                    </Button>
                </Card.Actions>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="Meu Perfil" />
                <Card.Actions>
                    <Button mode="contained" onPress={() => navigation.navigate('UserProfile')}>
                        Abrir
                    </Button>
                </Card.Actions>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="Chat de Suporte" />
                <Card.Actions>
                    <Button mode="contained" onPress={() => navigation.navigate('ChatList')}>
                        Abrir
                    </Button>
                </Card.Actions>
            </Card>

            <Button mode="outlined" onPress={sendTestNotification} style={styles.testButton}>
                Testar Notificação
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
        gap: 15,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        padding: 10,
    },
    testButton: {
        marginTop: 10,
    },
})
