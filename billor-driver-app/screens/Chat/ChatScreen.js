import { useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native'
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
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.message}>
                        <Text style={styles.userName}>{item.userName}:</Text>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Digite sua mensagem"
                />
                <Button title="Enviar" onPress={sendMessage} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    message: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#e7e7e7',
        borderRadius: 10,
    },
    userName: {
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 10
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
})
