import { useEffect } from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
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
            <Text style={styles.title}>Home do Motorista</Text>

            <Button
                title="Minhas Cargas"
                onPress={() => navigation.navigate('LoadsList')}
            />

            <Button
                title="Meu Perfil"
                onPress={() => navigation.navigate('UserProfile')}
            />

            <Button
                title="Abrir Chat"
                onPress={() => navigation.navigate('ChatList')}
            />

            <Button
                title="Testar Push"
                onPress={sendTestNotification}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
})
