import { View, StyleSheet } from 'react-native'
import { Title, Paragraph, Button, Card } from 'react-native-paper'

export default function LoadDetailScreen({ navigation, route }) {
    const { load } = route.params

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>{load.title}</Title>
                    <Paragraph>Status: {load.status}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={() => navigation.navigate('CaptureDocument')}>
                        Capturar Documento
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    card: {
        padding: 15,
    },
})
