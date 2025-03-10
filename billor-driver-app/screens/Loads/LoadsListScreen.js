import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { FlatList } from 'react-native'
import { Card, Title, Paragraph, Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { loads } from '../../data/mockLoads'

export default function LoadsListScreen() {
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const filteredLoads = loads.filter((load) => {
        const matchTitle = load.title.toLowerCase().includes(searchText.toLowerCase())
        const matchStatus = statusFilter ? load.status === statusFilter : true
        return matchTitle && matchStatus
    })

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>Status: {item.status}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={() => navigation.navigate('LoadDetail', { load: item })}>
                    Ver detalhes
                </Button>
            </Card.Actions>
        </Card>
    )

    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label="Pesquisar por título"
                value={searchText}
                onChangeText={setSearchText}
                style={styles.input}
            />

            <View style={styles.filterContainer}>
                {['Todos', 'Entregue', 'Pendente', 'Em Andamento'].map(status => (
                    <Button
                        key={status}
                        mode={statusFilter === status || (status === 'Todos' && !statusFilter) ? 'contained' : 'outlined'}
                        onPress={() => setStatusFilter(status === 'Todos' ? '' : status)}
                        style={styles.filterButton}
                    >
                        {status}
                    </Button>
                ))}
            </View>

            <FlatList
                data={filteredLoads}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    card: {
        marginBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    filterButton: {
        flex: 1,
        marginHorizontal: 3,
    },
})
