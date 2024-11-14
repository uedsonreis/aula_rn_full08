import React from 'react'
import { LatLng } from 'react-native-maps'
import { Alert, Button, Text, TextInput, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { placeRepository } from '../../services/place.repository'
import { Place } from '../../model/place'

import styles from './styles'

export default function PlacePage() {

    const route = useRoute()
    const navigation = useNavigation()

    const place = route.params as Place

    const [name, setName] = React.useState(place.name ? place.name : '')
    const [description, setDescription] = React.useState(place.description ? place.description : '')

    React.useEffect(() => {
        if (place.name) {
            navigation.setOptions({
                title: 'Editar Local',
                headerRight: () => <Button color='red' title='DEL' onPress={remove} />
            })
        } else {
            navigation.setOptions({ title: 'Novo Local' })
        }
    }, [])

    async function remove() {
        await placeRepository.remove(place.latitude, place.longitude)
        navigation.goBack()
    }

    async function save() {
        if (!name || name.trim() === '') {
            Alert.alert('Nome é obrigatório!')
            return
        }

        await placeRepository.save({
            latitude: place.latitude,
            longitude: place.longitude,
            name, description
        })

        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Text>Latitude: { place.latitude }</Text>
            <Text>Longitude: { place.longitude }</Text>

            <Text style={styles.label}>
                Informe o nome e a descrição referente as coordenadas acima:
            </Text>

            <View style={styles.inputView}>
                <TextInput style={styles.inputName} placeholder='Nome' value={name} onChangeText={setName} />
                <TextInput
                    style={styles.inputDescription} placeholder='Descrição' value={description}
                    onChangeText={setDescription} numberOfLines={10} multiline
                />
            </View>

            <View style={styles.button}>
                <Button title='Salvar' onPress={save} />
            </View>

        </View>
    )
}