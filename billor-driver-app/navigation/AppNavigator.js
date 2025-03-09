// AppNavigator.js
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import LoadsListScreen from '../screens/Loads/LoadsListScreen'
import LoadDetailScreen from '../screens/Loads/LoadDetailScreen'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="LoadsList" component={LoadsListScreen} options={{ title: 'Lista de Cargas' }} />
                <Stack.Screen name="LoadDetail" component={LoadDetailScreen} options={{ title: 'Detalhes da Carga' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
