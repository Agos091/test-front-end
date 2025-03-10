import { View, StyleSheet } from 'react-native'
import { Button, Card, Title } from 'react-native-paper'

export default function ChatListScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Conversas</Title>

            <Card style={styles.card}>
                <Card.Title title="Conversa Exemplo" />
                <Card.Actions>
                    <Button mode="contained" onPress={() => navigation.navigate('Chat', { chatId: '123' })}>
                        Abrir
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
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        padding: 10,
    },
})
