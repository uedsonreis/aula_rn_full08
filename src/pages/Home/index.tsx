import React from 'react'
import { StatusBar } from 'expo-status-bar'
import * as ExpoLocation from 'expo-location'
import { Alert, Text, View } from 'react-native'
import MapView, { LongPressEvent, Marker } from 'react-native-maps'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { placeRepository } from '../../services/place.repository'
import { Place } from '../../model/place'

import styles from './styles'

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const [location, setLocation] = React.useState<ExpoLocation.LocationObject>()

    const [places, setPlaces] = React.useState<Place[]>([])

    async function getCurrentLocation() {
        let { status } = await ExpoLocation.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied')
            return
        }

        let location = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.Highest })
        setLocation(location)
    }

    function fetchPlaces() {
        placeRepository.getList().then(list => setPlaces(list))
    }

    function goToCreatePlace(event: LongPressEvent) {
        navigation.navigate('Create', event.nativeEvent.coordinate)
    }

    React.useEffect(() => {
        navigation.setOptions({ headerShown: false })

        fetchPlaces()

        getCurrentLocation()
    }, [])

    if (!location) {
        return (
            <View style={styles.container}>
                <Text>Carregando dados da localicação...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <MapView
                style={styles.map}
                showsUserLocation={true}
                zoomControlEnabled={true}
                cameraZoomRange={{ animated: true }}
                initialCamera={{
                    center: location.coords,
                    heading: 0, pitch: 0, zoom: 15
                }}
                onLongPress={goToCreatePlace}
            >
                { places.map(place => (
                    <Marker
                        key={`${place.latitude}-${place.longitude}`}
                        title={place.name}
                        coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                    />
                )) }
            </MapView>
        </View>
    );
}
