// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
// import React, {useEffect} from 'react';
// import messaging from '@react-native-firebase/messaging';
// import {Platform} from 'react-native';

// const ForegroundHandler = () => {
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(remoteMessage => {
//       console.log('Handle in foreground', remoteMessage);
//       const {notification, messageId} = remoteMessage;
//       if (Platform.OS === 'ios') {
//         PushNotificationIOS.addNotificationRequest({
//           id: messageId,
//           title: notification.title,
//           body: notification.body,
//           sound: 'default',
//         });
//       } else {
//         PushNotification.localNotification({
//           channelId: 'remitexcanada',
//           title: notification.title, // (optional)
//           message: notification.body, // (required)
//           sound: 'default',
//           vibrate: true,
//           playSound: true,
//         });
//       }
//     });
//     return unsubscribe;
//   }, []);
//   return null;
// };

// export default ForegroundHandler;
