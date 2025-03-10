import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import LoadsListScreen from '../screens/Loads/LoadsListScreen'
import LoadDetailScreen from '../screens/Loads/LoadDetailScreen'
import CaptureDocumentScreen from '../screens/Loads/CaptureDocumentScreen'
import ChatListScreen from '../screens/Chat/ChatListScreen'
import ChatScreen from '../screens/Chat/ChatScreen'
import UserProfileScreen from '../screens/UserProfileScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar Conta' }} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Meu Perfil' }} />
                <Stack.Screen name="LoadsList" component={LoadsListScreen} options={{ title: 'Lista de Cargas' }} />
                <Stack.Screen name="LoadDetail" component={LoadDetailScreen} options={{ title: 'Detalhes da Carga' }} />
                <Stack.Screen name="CaptureDocument" component={CaptureDocumentScreen} options={{ title: 'Capturar Documento' }} />
                <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Conversas' }} />
                <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
