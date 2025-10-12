import messaging from '@react-native-firebase/messaging';

export const fetchAndStorePushTokenIfPossible = async user => {
  try {
    const settings = await messaging().requestPermission();
    console.log({settings});
    if (settings) {
      const token = await messaging().getToken();
      return token;
    }
  } catch (error) {
    console.log(error);
  }
};
