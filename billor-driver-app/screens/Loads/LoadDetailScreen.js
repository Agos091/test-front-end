import { View, Text, Button } from 'react-native'

export default function LoadDetailScreen({ navigation, route }) {
    const { load } = route.params

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{load.title}</Text>
            <Text>Status: {load.status}</Text>

            <Button
                title="Capturar Documento"
                onPress={() => navigation.navigate('CaptureDocument')}
            />
        </View>
    )
}
