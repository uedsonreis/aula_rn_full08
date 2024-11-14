import AsyncStorage from '@react-native-async-storage/async-storage'

import { Place } from '../model/place'

const PLACE_REPO_KEY = 'place_document_key'

class PlaceRepository {

    private async persist(list: Place[]) {
        await AsyncStorage.setItem(PLACE_REPO_KEY, JSON.stringify(list))
    }

    private equals(p1: Place, p2: Place) {
        return p1.latitude === p2.latitude && p1.longitude === p2.longitude
    }

    public async getList() {
        const json = await AsyncStorage.getItem(PLACE_REPO_KEY)
        if (json) return JSON.parse(json) as Place[]
        else return [] as Place[]
    }

    public async save(place: Place) {
        const list = await this.getList()

        const saved = list.find(elem => this.equals(elem, place))
        if (saved) {
            saved.name = place.name
            saved.description = place.description
        } else {
            list.push(place)
        }

        await this.persist(list)
    }

    public async remove(latitude: number, longitude: number) {
        let list = await this.getList()
        list = list.filter(elem => !this.equals(elem, { latitude, longitude }))
        await this.persist(list)
    }

}

export const placeRepository = new PlaceRepository()