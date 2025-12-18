import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

const BIOMETRIC_ENABLED_KEY = 'BIOMETRIC_ENABLED';
const BIOMETRIC_TOKEN_KEY = 'BIOMETRIC_TOKEN';

export const isBiometricEnabled = async () => {
  const enabled = (await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY)) === 'true';
  console.log('[Biometrics] isBiometricEnabled:', enabled);
  return enabled;
};

export const isBiometricAvailable = async () => {
  const { available, biometryType, error } = await rnBiometrics.isSensorAvailable();
  console.log('[Biometrics] isBiometricAvailable -> available:', available);
  console.log('[Biometrics] rnBiometrics -> available:', rnBiometrics);
  console.log('[Biometrics] Biometry type:', biometryType);
  if (error) console.log('[Biometrics] Sensor error:', error);
  return available;
};

export const tryBiometricLogin = async () => {
  const enabled = await isBiometricEnabled();
  if (!enabled) {
    console.log('[Biometrics] Biometric login not enabled');
    return null;
  }

  const { available, biometryType, error } = await rnBiometrics.isSensorAvailable();
  console.log('[Biometrics] Sensor available:', available, 'Type:', biometryType);
  if (!available) {
    console.log('[Biometrics] Biometric sensor not available:', error);
    return null;
  }

  const result = await rnBiometrics.simplePrompt({
    promptMessage: 'Login using biometrics',
  });

  console.log('[Biometrics] simplePrompt result:', result);

  if (!result.success) return null;

  const token = await AsyncStorage.getItem(BIOMETRIC_TOKEN_KEY);
  console.log('[Biometrics] Retrieved token:', token);
  return token ? JSON.parse(token) : null;
};

export const saveBiometricToken = async (token: any) => {
  console.log('[Biometrics] Saving token:', token);
  await AsyncStorage.setItem(BIOMETRIC_TOKEN_KEY, JSON.stringify(token));
};

export const enableBiometrics = async () => {
  console.log('[Biometrics] Enabling biometrics');
  await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');
};

export const disableBiometrics = async () => {
  console.log('[Biometrics] Disabling biometrics');
  await AsyncStorage.multiRemove([
    BIOMETRIC_ENABLED_KEY,
    BIOMETRIC_TOKEN_KEY,
  ]);
};
