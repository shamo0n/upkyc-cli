import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../Contexts/AuthContext';
import {
  OTPVerifyOnSignupAPI,
  SendOTPVerificationAPI,
} from '../../Helpers/API';
import {
  ScrollContainer,
  BackButton,
  BackText,
  OtpBox,
  OtpTitle,
  OtpInfo,
  OtpBold,
  OtpInputContainer,
  OtpInput,
  SubmitButton,
  SubmitButtonText,
  ResendButton,
  ResendText,
  ErrorMessage,
  Background,
  ButtonText,
  Button,
  Container,
  LoginBoxContainer,
} from './style';
import AppHeader from '../../components/AppHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const OtpScreen: React.FC = () => {
  const { authUser, saveUserSession, setIsLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Resend Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = () => {
    Keyboard.dismiss();
    console.log('--- handleOtpSubmit START ---');
    setErrorMessage('');
    setLoading(true);
    if (!authUser) {
      Toast.show({
        type: 'error',
        text1: 'User session not found. Please sign up again.',
      });
      console.log('Error: authUser missing.');
      return;
    }

    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      Toast.show({ type: 'error', text1: 'Please enter a valid 4-digit OTP.' });
      console.log('Error: Invalid OTP length.', enteredOtp);
      return;
    }

    setLoading(true);

    const body = {
      CUSTID_DIGITAL_GID: authUser.CUSTID_DIGITAL_GID,
      Email: authUser.Email,
      OTP: enteredOtp,
    };

    console.log('[OTPVerifyOnSignupAPI] Request Body:', body);

    OTPVerifyOnSignupAPI(body, (response: any) => {
      setLoading(false);
      console.log('[OTPVerifyOnSignupAPI] Raw Response:', response);

      if (!response || !response.success) {
        console.log('Error: API returned unsuccessful response.');
        Toast.show({
          type: 'error',
          text1: response?.errorMessage || 'Unknown server error',
        });
        return;
      }

      if (!response.responseBody) {
        console.log('Error: Missing responseBody in response.');
        Toast.show({ type: 'error', text1: 'Invalid server response format.' });
        return;
      }

      console.log(
        '[OTPVerifyOnSignupAPI] Parsed XML root:',
        response.responseBody.name,
      );
      console.log(
        '[OTPVerifyOnSignupAPI] Parsed children:',
        response.responseBody.children,
      );

      // Extract the main result node
      let resultNode = null;

      if (response.responseBody.name === 'OTPVerifyOnSignupResponse') {
        resultNode = response.responseBody.children?.find(
          (c: any) => c.name === 'OTPVerifyOnSignupResult',
        );
      } else if (response.responseBody.name === 'OTPVerifyOnSignupResult') {
        resultNode = response.responseBody;
      }

      if (!resultNode) {
        console.log('Error: Could not find OTPVerifyOnSignupResult node.');
        console.log('Response body structure:', response.responseBody);
        Toast.show({
          type: 'error',
          text1: 'Invalid XML response structure.',
        });
        return;
      }

      console.log('[OTPVerifyOnSignupAPI] Found resultNode:', resultNode);

      // Convert XML children array to key-value object
      const result: Record<string, string> = {};
      if (Array.isArray(resultNode.children)) {
        resultNode.children.forEach((child: any) => {
          if (child.name && typeof child.value !== 'undefined') {
            result[child.name] = child.value;
          }
        });
      }

      console.log('[OTPVerifyOnSignupAPI] Parsed Key-Value Result:', result);

      const MessageCode = result.MessageCode?.trim() || '';
      const IsErrorMessage = result.IsErrorMessage?.trim()?.toLowerCase() || '';
      const Message = result.Message || '';
      const StatusID = result.StatusID || '';
      const CUSTID_DIGITAL_GID = result.CUSTID_DIGITAL_GID;
      const EmailValue = result.Email;

      console.log('Extracted Fields:', {
        MessageCode,
        IsErrorMessage,
        Message,
        StatusID,
        CUSTID_DIGITAL_GID,
        EmailValue,
      });

      // Determine if OTP verification is successful
      if (MessageCode === '2' && IsErrorMessage === 'false') {
        console.log('OTP verified successfully.');

        Toast.show({
          type: 'success',
          text1: Message || 'OTP verified successfully!',
        });
        console.log('Navigating based on StatusID:', StatusID);
        setIsLoggedIn(true);
        switch (StatusID) {
          case '2':
            Toast.show({ text1: 'Onboarding pending.', visibilityTime: 2000 });
            setTimeout(() => {
              navigation.navigate('PersonalInformation', {
                statusId: StatusID,
              });
            }, 2000);
            break;
          case '3':
          case '5':
            navigation.navigate('Dashboard', { statusId: StatusID });
            break;
          case '4':
            Toast.show({ text1: 'KYC pending.', visibilityTime: 2000 });
            setTimeout(
              () =>
                navigation.navigate('KycProcessScreen', { statusId: StatusID }),
              2000,
            );
            break;
          default:
            Toast.show({
              type: 'error',
              text1: 'Unexpected status. Try again.',
            });
        }
      } else {
        console.log('OTP verification failed. Full result object:', result);
        Toast.show({
          type: 'error',
          text1: Message || 'Invalid OTP. Please try again.',
        });
      }
    });
  };

  const handleResendOTP = () => {
    if (!authUser) return;
    setErrorMessage('');
    setLoading(true);

    const body = {
      CUSTID_DIGITAL_GID: authUser.CUSTID_DIGITAL_GID,
      RecipientName: '',
      RecipientEmail: authUser.Email,
      Subject: 'One Time Password (OTP)',
      Title: 'OTP Verification',
      HTMLBody: '',
      OTP: '',
    };

    SendOTPVerificationAPI(body, response => {
      setLoading(false);
      const children = response?.responseBody?.children || [];
      const extractValue = (name: string) =>
        children.find((child: any) => child.name === name)?.value || '';

      const messageCode = extractValue('MessageCode');
      const isErrorMessage = extractValue('IsErrorMessage');
      const message = extractValue('Message');

      if (messageCode === '2' && isErrorMessage === 'false') {
        Toast.show({
          type: 'success',
          text1: message || 'OTP sent successfully!',
        });
        setResendTimer(60);
      } else {
        const errorMsg = message || 'Failed to send OTP.';
        setErrorMessage(errorMsg);
        Toast.show({ type: 'error', text1: errorMsg });
      }
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
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpBackspace = (index: number) => {
    if (otp[index] === '' && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Background source={require('../../Assets/images/mobilebg.jpg')}>
      {loading && <LoadingSpinner />}
      <AppHeader showBack={true} onBackPress={() => navigation.goBack()} />
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
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleOtpBackspace(index);
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  placeholder=""
                  placeholderTextColor="#fff"
                  scrollEnabled={false}
                  textAlign="center"
                />
              ))}
            </OtpInputContainer>

            {errorMessage.length > 0 && (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            )}

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
