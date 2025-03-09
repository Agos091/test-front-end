import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import app from './firebaseConfig'

export default function App() {
  useEffect(() => {
    console.log('Firebase App:', app.name ? '🔥 Firebase conectado com sucesso!' : '❌ Firebase falhou!')
  }, [])

  return (
    <View style={styles.container}>
      <Text>Testando conexão com Firebase!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
