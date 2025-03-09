import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { loads } from '../../data/mockLoads'

export default function LoadsListScreen() {
    const navigation = useNavigation()

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.loadItem}
            onPress={() => navigation.navigate('LoadDetail', { load: item })}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={loads}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.loadItem}
                        onPress={() => navigation.navigate('LoadDetail', { load: item })}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.status}>{item.status}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
    },
    status: {
        fontSize: 14,
        color: '#666',
    },
    item: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
})
