const PushNotification = require('react-native-push-notification')

export function setupPushNotification(handleNotification) {
  PushNotification.configure({

      onNotification: function(notification) {
        handleNotification(notification)
      },

      popInitialNotification: true,
      requestPermissions: true,
  })

  return PushNotification
}