import { View, StyleSheet } from 'react-native'
import { Title, Paragraph, Button, Card } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'

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

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: load.location.latitude,
                    longitude: load.location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker
                    coordinate={load.location}
                    title={load.title}
                    description={`Status: ${load.status}`}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        margin: 15,
    },
    map: {
        flex: 1,
    },
})
