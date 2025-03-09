import { View, Text, Button, StyleSheet } from 'react-native'

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home do Motorista</Text>

            <Button
                title="Minhas Cargas"
                onPress={() => navigation.navigate('LoadsList')}
            />

            <Button
                title="Meu Perfil"
                onPress={() => alert('Perfil em breve')}
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
