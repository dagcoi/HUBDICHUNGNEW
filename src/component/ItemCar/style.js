import { StyleSheet, Dimensions } from 'react-native';

const maxWidth = Dimensions.get('window').width / 2 - 16
export default StyleSheet.create({
    container: {
        borderColor: '#e8e8e8',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
        backgroundColor: '#ffffff',
    },
    containerLeft: {
        flex: 1,
        marginTop: 3,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        // maxWidth: maxWidth
    },
    imageRight: {
        alignItems: 'center',
        width: 150,
        justifyContent: 'center',
    },
    tentuyen: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#00363d',
        paddingHorizontal: 12,
        paddingVertical: 4,
        maxWidth
    },
    textLabel: {
        fontSize: 18,
        marginVertical: 8,
        marginVertical: 4,
        fontWeight: 'bold',
        color: '#77a300',
        maxWidth
    },
    giaTien: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 4,
        color: '#00363e',
        maxWidth
    },
    totalCost: {
        fontSize: 18,
        color: '#00363d',
        fontWeight: 'bold',
        marginVertical: 4,
        maxWidth
    },
    carType: {
        fontSize: 14,
        color: '#00363e',
        maxWidth
    },
    label: {
        flexDirection: 'row'
    }
});