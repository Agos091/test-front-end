import { View, Text, StyleSheet } from 'react-native'

export default function LoadDetailScreen({ route }) {
    const { load } = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{load.title}</Text>
            <Text style={styles.status}>Status: {load.status}</Text>
            <Text style={styles.detail}>ID da Carga: {load.id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    status: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
    detail: {
        fontSize: 16,
        color: '#888',
    },
})
