import React from 'react'
import { LatLng } from 'react-native-maps'
import { Alert, Button, Text, TextInput, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { placeRepository } from '../../services/place.repository'
import { Place } from '../../model/place'

import styles from './styles'

export default function CreatePlacePage() {

    const route = useRoute()
    const navigation = useNavigation()

    const latLng = route.params as LatLng

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        navigation.setOptions({ title: 'Novo Local' })
    }, [])

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('Nome é obrigatório!')
            return
        }

        const place: Place = {
            latitude: latLng.latitude,
            longitude: latLng.longitude,
            name, description
        }

        placeRepository.save(place).then(isSaved => {
            if (isSaved) navigation.goBack()
            else Alert.alert('Local já existe!')
        })
    }

    return (
        <View style={styles.container}>
            <Text>Latitude: { latLng.latitude }</Text>
            <Text>Longitude: { latLng.longitude }</Text>

            <Text style={styles.label}>
                Informe o nome e a descrição referente as coordenadas acima:
            </Text>

            <View style={styles.inputView}>
                <TextInput style={styles.inputName} placeholder='Nome' onChangeText={setName} />
                <TextInput
                    style={styles.inputDescription} placeholder='Descrição' onChangeText={setDescription}
                    numberOfLines={10} multiline
                />
            </View>

            <View style={styles.button}>
                <Button title='Salvar' onPress={save} />
            </View>

        </View>
    )
}