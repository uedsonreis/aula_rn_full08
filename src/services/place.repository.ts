import AsyncStorage from '@react-native-async-storage/async-storage'

import { Place } from '../model/place'

const PLACE_REPO_KEY = 'place_document_key'

class PlaceRepository {

    private async persist(list: Place[]) {
        await AsyncStorage.setItem(PLACE_REPO_KEY, JSON.stringify(list))
    }

    public async getList() {
        const json = await AsyncStorage.getItem(PLACE_REPO_KEY)
        if (json) return JSON.parse(json) as Place[]
        else return [] as Place[]
    }

    public async save(place: Place) {
        const list = await this.getList()

        const saved = list.find(elem => elem.latitude === place.latitude && elem.longitude === place.longitude)
        if (saved) return false

        list.push(place)
        await this.persist(list)

        return true
    }

}

export const placeRepository = new PlaceRepository()