import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { app } from './firebaseConfig'
import AppNavigator from './navigation/AppNavigator'

export default function App() {
  useEffect(() => {
    console.log('Firebase App:', app.name ? '🔥 Firebase conectado com sucesso!' : '❌ Firebase falhou!')
  }, [])

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
