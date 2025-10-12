import React, { useContext, useState, useRef } from 'react';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { Toaster, toast } from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../Contexts/AuthContext';
import { OTPVerifyAPI, SendOTPVerificationAPI } from '../../Helpers/API';

import {
  Background,
  ScrollContainer,
  LoginBoxContainer,
  BackButton,
  BackText,
  OtpTitle,
  OtpInfo,
  OtpBold,
  OtpInputContainer,
  OtpInput,
  Button,
  ButtonText,
  ResendButton,
  ResendText,
  ErrorMessage,
  InfoContainer,
  Logo,
  AppName,
  AppDescription,
} from './OtpResetPassScreen.styles';

const OtpResetPassScreen: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { CUSTID_DIGITAL_GID, Email } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setLoading(false);
      toast.error('Please enter a valid 4-digit OTP.');
      return;
    }

    const body = { CUSTID_DIGITAL_GID, Email, OTP: enteredOtp };

    OTPVerifyAPI(body, (response: any) => {
      setLoading(false);
      const children = response?.responseBody?.children || [];
      const extractValue = (name: string) =>
        children.find((child: any) => child.name === name)?.value || '';
      const messageCode = extractValue('MessageCode');
      const isErrorMessage = extractValue('IsErrorMessage');

      if (messageCode === '2' && isErrorMessage === 'false') {
        toast.success('OTP verified successfully!');
        setTimeout(() => {
          navigation.navigate('UpdatePassword', { CUSTID_DIGITAL_GID, Email });
        }, 2000);
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    });
  };

  const handleResendOTP = () => {
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

    SendOTPVerificationAPI(body, (response: any) => {
      setLoading(false);
      const children = response?.responseBody?.children || [];
      const extractValue = (name: string) =>
        children.find((child: any) => child.name === name)?.value || '';
      const messageCode = extractValue('MessageCode');
      const isErrorMessage = extractValue('IsErrorMessage');
      const message = extractValue('Message');

      if (messageCode === '2' && isErrorMessage === 'false') {
        toast.success(message || 'OTP sent successfully!');
      } else {
        const errorMsg = message || 'Failed to send OTP. Please try again.';
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    });
  };

  return (
    <Background source={require('../../Assets/images/mobilebg.jpg')}>
      {loading && <LoadingSpinner />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
          <BackButton onPress={() => navigation.goBack()}>
            <BackText>← Back</BackText>
          </BackButton>

          <LoginBoxContainer>
            <OtpTitle>Enter OTP</OtpTitle>
            <OtpInfo>
              OTP sent to <OtpBold>{Email || authUser?.Email}</OtpBold>
            </OtpInfo>

            <OtpInputContainer>
              {otp.map((digit, index) => (
                <OtpInput
                  key={index}
                  ref={el => (inputRefs.current[index] = el)}
                  value={digit}
                  onChangeText={val => handleChange(index, val)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(index, nativeEvent.key)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </OtpInputContainer>

            {errorMessage.length > 0 && (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            )}

            <Button onPress={handleOtpSubmit} disabled={loading}>
              <ButtonText>Submit</ButtonText>
            </Button>

            <ResendButton onPress={handleResendOTP} disabled={loading}>
              <ResendText>Resend OTP</ResendText>
            </ResendButton>
          </LoginBoxContainer>

          <InfoContainer>
            <Logo source={require('../../Assets/images/up-logo.png')} />
            <AppName>Canada Xchange</AppName>
            <AppDescription>
              Save when you send, receive, and spend abroad.
            </AppDescription>
          </InfoContainer>
        </ScrollContainer>
      </KeyboardAvoidingView>
    </Background>
  );
};

export default OtpResetPassScreen;
