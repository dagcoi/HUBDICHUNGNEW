import firebase from 'react-native-firebase'
import { Platform } from 'react-native'

const configure = () => {
    const enable = firebase.messaging().hasPermission();
    if (enable) {
        const fmcToken = firebase.messaging().getToken()
        console.log('fmcToken', fmcToken);

        this.notificationListener = firebase.notifications().onNotification(notification => {
            const { title, body, data } = notification;
            console.log(notification)
            // xử lí khi nhận notifi
            if (Platform.OS === 'android') {
                const localNotifi = new firebase.notifications.Notification({
                    sound: 'default',
                    show_in_foreground: true,
                })
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .android.setChannelId('ChannelId')
                    .android.setSmallIcon('ic_stat_ic_notification')
                    .android.setColor('#77a300')
                    .android.setPriority(firebase.notifications.Android.Priority.Max)

                firebase.notifications()
                    .displayNotification(localNotifi)
                    .catch((error) => console.log(error));
            } else if (Platform.OS === 'ios') {
                const localNotifi = new firebase.notifications.Notification()
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .ios.setBadge(notification.ios.badge);

                firebase.notifications()
                    .displayNotification(localNotifi)
                    .catch((error) => console.log(error));
            }
        })
    } else {
        try {
            firebase.messaging().requestPermission();
        }
        catch (e) {
            alert('use rejected the permissions');
        }
    }
}
export {
    configure,
};