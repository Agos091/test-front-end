import { View, Text, Button } from 'react-native'

export default function ChatListScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tela da lista de Conversas</Text>
            <Button
                title="Abrir conversa exemplo"
                onPress={() => navigation.navigate('Chat', { chatId: '123' })}
            />
        </View>
    )
}
