import { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { TextInput, Button, Card, Paragraph, Title } from 'react-native-paper'
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { firestore, auth } from '../../firebaseConfig'

export default function ChatScreen({ route }) {
    const { chatId } = route.params
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const messagesRef = collection(firestore, `chats/${chatId}/messages`)
        const q = query(messagesRef, orderBy('createdAt', 'asc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesFirestore = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setMessages(messagesFirestore)
        })

        return unsubscribe
    }, [chatId])

    const sendMessage = async () => {
        if (newMessage.trim() === '') return

        const user = auth.currentUser

        await addDoc(collection(firestore, `chats/${chatId}/messages`), {
            text: newMessage,
            createdAt: serverTimestamp(),
            userId: user.uid,
            userName: user.email,
        })

        setNewMessage('')
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Conversa</Title>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.messageCard}>
                        <Card.Content>
                            <Paragraph style={styles.userName}>{item.userName}:</Paragraph>
                            <Paragraph>{item.text}</Paragraph>
                        </Card.Content>
                    </Card>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Digite sua mensagem"
                />
                <Button mode="contained" onPress={sendMessage}>Enviar</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: 20,
    },
    messageCard: {
        marginVertical: 5,
    },
    userName: {
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10,
    },
    input: {
        flex: 1,
    },
})
