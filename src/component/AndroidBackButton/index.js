import { BackHandler, Alert } from 'react-native';
/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 * @param  {Function} callback The function to call on click
 */
const handleAndroidBackButton = callback => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        callback();
        return true;
    });
};
/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => { });
}

const exitAlert = () => {
    Alert.alert(
        'Thoát',
        'Bạn muốn thoát khỏi chương trình ứng dụng?',
        [
            { text: 'Không', style: 'cancel' },
            { text: 'Thoát', onPress: () => BackHandler.exitApp() }
        ]
    );
};

export { handleAndroidBackButton, removeAndroidBackButtonHandler, exitAlert };