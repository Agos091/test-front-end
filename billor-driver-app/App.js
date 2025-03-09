import { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import AppNavigator from './navigation/AppNavigator'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync()

    if (status !== 'granted') {
      alert('Permissão para notificações negada.')
      return
    }

    const tokenData = await Notifications.getExpoPushTokenAsync()
    console.log('🔔 Token Expo:', tokenData.data)
  }

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
