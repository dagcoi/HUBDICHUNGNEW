import { StyleSheet, Dimensions } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const withDayOfWeek = SCREEN_WIDTH / 12
const styles = StyleSheet.create({
    borderTop: {
        flexDirection: 'row',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: '#aaa'
    },
    borderBottom: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: '#aaa'
    },
    selectSwitch: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    normalSwitch: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textSwitch: {
        fontSize: 16,
        fontWeight: '400'
    },
    textSwitchSelect: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#77a300'
    },
    text21: {
        marginTop: 8,
        color: '#fff',
        fontSize: 21,
        fontWeight: 'bold',
    },
    listDayOfWeek: {
        borderTopWidth: 0.5,
        borderColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        flexDirection: 'row',
        paddingHorizontal: withDayOfWeek
    },
    dayOfWeek: {
        width: withDayOfWeek,
        height: withDayOfWeek,
        borderRadius: withDayOfWeek,
        borderColor: '#77a300',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#e8e8e8',
        margin: withDayOfWeek / 6
    },
    textNormal: {
        fontSize: 14,
        color: '#333'
    },
    textBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    textTitle: {
        color: '#77a300',
        fontWeight: 'bold',
        fontSize: 16
    },
    card: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 8,
        padding: 8,
        borderRadius: 8,
    },

})

export default styles;