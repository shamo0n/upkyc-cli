import * as Keychain from 'react-native-keychain';
import { Platform, ToastAndroid } from 'react-native';

/**
 * Save biometric-protected credentials
 * iOS → Face ID / Touch ID
 * Android → Face / Fingerprint / Device PIN fallback
 */
export async function saveBiometricToken(token: any) {
  try {
    const tokenString = typeof token === 'string' ? token : JSON.stringify(token);
    console.log('[BIOMETRIC] [SAVE] Token to save:', tokenString);

    const options: any = {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    };

    if (Platform.OS === 'android') {
      options.authenticationType = Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS;
      options.securityLevel = Keychain.SECURITY_LEVEL.SECURE_HARDWARE;
      console.log('[BIOMETRIC][ANDROID] Options set for hardware-backed security with PIN fallback');
    } else {
      console.log('[BIOMETRIC][iOS] Options set for Face ID / Touch ID');
    }

    await Keychain.setGenericPassword('biometric_user', tokenString, options);
    console.log('[BIOMETRIC] [SAVE] Token saved successfully');
    return true;
  } catch (e) {
    console.error('[BIOMETRIC] [SAVE] Failed to save token', e);
    return false;
  }
}

/**
 * Trigger biometric authentication and return stored token
 */
export async function tryBiometricLogin() {
  try {
    console.log('[BIOMETRIC] [LOGIN] Starting authentication');

    if (Platform.OS === 'ios') {
      const biometryType = await Keychain.getSupportedBiometryType();
      console.log('[BIOMETRIC][iOS] Supported Biometry:', biometryType);

      if (!biometryType) {
        console.warn('[BIOMETRIC][iOS] No biometric enrolled on device');
        return null;
      }
    }

    console.log('[BIOMETRIC] [LOGIN] Prompting user for authentication');
    const creds = await Keychain.getGenericPassword({
      authenticationPrompt: {
        title:
          Platform.OS === 'ios'
            ? 'Login with Face ID'
            : 'Login with Biometrics or device PIN',
        cancel: 'Cancel',
      },
      service: 'biometric_login',
    });

    if (!creds) {
      console.log('[BIOMETRIC] [LOGIN] Authentication cancelled or no credentials found');
      return null;
    }

    console.log('[BIOMETRIC] [LOGIN] Authentication successful, token retrieved:', creds.password);
    return JSON.parse(creds.password);
  } catch (e) {
    console.error('[BIOMETRIC] [LOGIN] Authentication failed', e);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Biometric authentication failed', ToastAndroid.SHORT);
    }

    return null;
  }
}

/**
 * Disable biometric login (logout)
 */
export async function disableBiometric() {
  try {
    console.log('[BIOMETRIC] [DISABLE] Resetting stored credentials');
    await Keychain.resetGenericPassword();
    console.log('[BIOMETRIC] [DISABLE] Biometric login disabled successfully');
  } catch (e) {
    console.error('[BIOMETRIC] [DISABLE] Failed to disable biometric login', e);
  }
}
