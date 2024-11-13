import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    container: {
        padding: 20
    },

    label: {
        fontSize: 18,
        marginVertical: 20,
        textAlign: 'center',
    },

    inputView: {
        width: '100%',
        alignItems: 'center',
    },

    inputName: {
        padding: 10,
        fontSize: 16,
        width: '100%',
        borderWidth: 1,
        borderRadius: 3,
    },

    inputDescription: {
        height: 150,
        padding: 10,
        fontSize: 14,
        marginTop: 20,
        width: '100%',
        borderWidth: 1,
        borderRadius: 3,
        textAlign: 'justify',
        textAlignVertical: 'top',
    },

    button: {
        marginTop: 30,
    }

})