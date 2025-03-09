import { useEffect } from 'react'
import { View, Text } from 'react-native'

export default function HomeScreen({ navigation }) {
    useEffect(() => {
        navigation.replace('LoadsList')
    }, [])

    return (
        <View>
            <Text>Redirecionando para lista de cargas...</Text>
        </View>
    )
}
