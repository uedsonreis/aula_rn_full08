import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomePage from './src/pages/Home'
import CreatePlacePage from './src/pages/Place/create'

const Stack = createNativeStackNavigator({
    screens: {
        Home: HomePage,
        Create: CreatePlacePage,
    },
})

const Navigation = createStaticNavigation(Stack)

export default function App() {
    return <Navigation />
}
