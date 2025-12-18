import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import LoadingSpinner from '../../components/LoadingSpinner';
import AppHeader from '../../components/AppHeader';

import { AuthContext } from '../../Contexts/AuthContext';
import {
  OTPVerifyOnSignupAPI,
  SendOTPVerificationAPI,
} from '../../Helpers/API';

import {
  OtpTitle,
  OtpInfo,
  OtpBold,
  OtpInputContainer,
  OtpInput,
  ResendButton,
  ResendText,
  ErrorMessage,
  Background,
  ButtonText,
  Button,
  LoginBoxContainer,
} from './style';

import {
  enableBiometrics,
  isBiometricAvailable,
  saveBiometricToken,
} from '../../Utils/biometricAuth';

const OtpScreen: React.FC = () => {
  const { authUser, setIsLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  /* ───────────────────────────────
     Resend OTP timer
  ─────────────────────────────── */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setTimeout(() => setResendTimer(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  /* ───────────────────────────────
     OTP input handlers
  ─────────────────────────────── */
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpBackspace = (index: number) => {
    if (!otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* ───────────────────────────────
     Submit OTP
  ─────────────────────────────── */
  const handleOtpSubmit = async () => {
    Keyboard.dismiss();
    setErrorMessage('');
    setLoading(true);

    if (!authUser) {
      setLoading(false);
      Toast.show({ type: 'error', text1: 'User session not found.' });
      return;
    }

    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setLoading(false);
      Toast.show({ type: 'error', text1: 'Enter a valid 4-digit OTP.' });
      return;
    }

    const body = {
      CUSTID_DIGITAL_GID: authUser.CUSTID_DIGITAL_GID,
      Email: authUser.Email,
      OTP: enteredOtp,
    };

    try {
      const response: any = await new Promise((resolve, reject) => {
        OTPVerifyOnSignupAPI(body, (res: any) => {
          if (!res?.success) reject(res?.errorMessage);
          else resolve(res);
        });
      });

      const resultNode = response?.responseBody?.children?.find(
        (c: any) => c.name === 'OTPVerifyOnSignupResult',
      );

      if (!resultNode) throw new Error('Invalid server response');

      const result: Record<string, string> = {};
      resultNode.children.forEach((child: any) => {
        result[child.name] = child.value;
      });

      const {
        MessageCode,
        IsErrorMessage,
        StatusID,
        CUSTID_DIGITAL_GID,
        Email: EmailValue,
      } = result;

      if (MessageCode === '2' && IsErrorMessage === 'false') {
        // Prepare session token
        const userSessionToken = {
          CUSTID: CUSTID_DIGITAL_GID,
          Email: EmailValue,
          StatusID,
        };

        try {
          const biometricAvailable = await isBiometricAvailable();
          if (biometricAvailable) {
            // Save token immediately
            await saveBiometricToken(userSessionToken);
            // Enable biometrics
            await enableBiometrics();

            // Optional alert just for info
            Toast.show({
              type: 'success',
              text1: 'Biometric Login Enabled',
              text2: 'You can now sign in faster using Face ID or Fingerprint.',
            });

            console.log('[OTP] Biometrics enabled successfully');
          }
        } catch (e) {
          console.error('[OTP] Failed to enable biometrics', e);
        }

        // Log in and navigate
        setIsLoggedIn(true);
        setLoading(false);
        switch (StatusID) {
          case '2':
            navigation.navigate('PersonalInformation', { statusId: StatusID });
            break;
          case '3':
          case '5':
            navigation.navigate('Dashboard', { statusId: StatusID });
            break;
          case '4':
            navigation.navigate('KycProcessScreen', { statusId: StatusID });
            break;
          default:
            Toast.show({
              type: 'error',
              text1: 'Unexpected status. Please try again.',
            });
        }
      } else {
        setLoading(false);
        Toast.show({ type: 'error', text1: 'Invalid OTP' });
      }
    } catch (err: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: err?.toString() || 'Something went wrong',
      });
    }
  };

  /* ───────────────────────────────
     Resend OTP
  ─────────────────────────────── */
  const handleResendOTP = () => {
    if (!authUser) return;

    setLoading(true);
    const body = {
      CUSTID_DIGITAL_GID: authUser.CUSTID_DIGITAL_GID,
      RecipientEmail: authUser.Email,
    };

    SendOTPVerificationAPI(body, () => {
      setLoading(false);
      Toast.show({ type: 'success', text1: 'OTP sent successfully' });
      setResendTimer(60);
    });
  };

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;
    if (username.length <= 2) return `${username[0]}*@${domain}`;
    const firstChar = username[0];
    const lastChars = username.slice(-2);
    const masked = '*'.repeat(username.length - 3);
    return `${firstChar}${masked}${lastChars}@${domain}`;
  };

  /* ───────────────────────────────
     UI
  ─────────────────────────────── */
  return (
    <Background source={require('../../Assets/images/mobilebg.jpg')}>
      {loading && <LoadingSpinner />}
      <AppHeader showBack onBackPress={() => navigation.goBack()} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, width: '100%', justifyContent: 'center' }}
        >
          <LoginBoxContainer>
            <OtpTitle>Enter OTP</OtpTitle>

            <OtpInfo>
              OTP sent to{' '}
              <OtpBold>{authUser?.Email && maskEmail(authUser.Email)}</OtpBold>
            </OtpInfo>

            <OtpInputContainer>
              {otp.map((digit, index) => (
                <OtpInput
                  key={index}
                  ref={el => (inputRefs.current[index] = el)}
                  value={digit}
                  onChangeText={val => handleOtpChange(index, val)}
                  onKeyPress={({ nativeEvent }) =>
                    nativeEvent.key === 'Backspace' && handleOtpBackspace(index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </OtpInputContainer>

            {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

            <Button onPress={handleOtpSubmit} disabled={loading}>
              <ButtonText>Submit</ButtonText>
            </Button>

            <ResendButton
              onPress={handleResendOTP}
              disabled={resendTimer > 0 || loading}
              activeOpacity={resendTimer > 0 ? 1 : 0.7}
            >
              <ResendText>
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </ResendText>
            </ResendButton>
          </LoginBoxContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default OtpScreen;
