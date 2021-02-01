import AsyncStorage from '@react-native-community/async-storage'

const _retrieveData = async () => {
    try {
        const dataLogin = await AsyncStorage.getItem('dataLogin')
        if (dataLogin !== null) {
            let json = JSON.parse(dataLogin)
            console.log('json' + dataLogin)
            return json
        }
    } catch (error) {
        // Error retrieving data
        console.log(error)
        return error
    }
};

export { _retrieveData }