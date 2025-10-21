import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../Contexts/AuthContext';
import { CustomerSignupAPI } from '../../Helpers/API';

import {
  Container,
  Logo,
  Title,
  Subtitle,
  InputContainer,
  Input,
  Suggestions,
  SuggestionText,
  ErrorText,
  Button,
  ButtonText,
  Loader,
  Background,
  LoginBoxContainer,
} from './style';
import AnimatedButton from '../../components/StyledButton';
import LoadingSpinner from '../../components/LoadingSpinner';

type RootStackParamList = {
  Login: undefined;
  OtpScreen: undefined;
  Dashboard: undefined;
  PersonalInformation: undefined;
};

type CustomerSignupResponseChild = {
  name: string;
  value: string;
};

type CustomerSignupResponse = {
  responseBody?: {
    children?: CustomerSignupResponseChild[];
  };
};

const emailDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
];

const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { saveUserSession } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // localStorage?.removeItem?.('isRegistering');
  }, []);

  const handleSignup = () => {
    console.log('Signup started with email:', email);
    setErrorMessage('');

    if (!email) {
      const errorMsg = 'Kindly provide your email to proceed.';
      setErrorMessage(errorMsg);
      Toast.show({ type: 'error', text1: errorMsg });
      return;
    }

    setLoading(true);

    const body = {
      Email: email,
      Password: '',
      DeviceId: '',
      DeviceType: Platform.OS,
      OTP: '',
    };
    console.log('Signup API request body:', body);

    CustomerSignupAPI(body, (response: any) => {
      setLoading(false);
      console.log('Signup API response:', response);

      if (!response.success || !response.responseBody) {
        Toast.show({
          type: 'error',
          text1: response.errorMessage || 'Unknown server error',
        });
        return;
      }

      // Use getElementsByTagName to directly get CustomerSignupResult
      const resultNode = response.responseBody.getElementsByTagName(
        'CustomerSignupResult',
      )[0];

      if (!resultNode) {
        Toast.show({
          type: 'error',
          text1: "Couldn't load CustomerSignupResult from API.",
        });
        return;
      }

      // Convert children array to key-value object
      const result: any = {};
      resultNode.children.forEach((child: any) => {
        result[child.name] = child.value;
      });

      console.log('Parsed Result:', result);

      const {
        MessageCode,
        IsErrorMessage,
        Message,
        CUSTID_DIGITAL_GID,
        CUST_DISPLAY_ID,
        Email: EmailValue,
        OTP,
        StatusID,
        SignupStatusID,
      } = result;

      if (MessageCode === '2' && IsErrorMessage === 'false') {
        saveUserSession({
          CUSTID_DIGITAL_GID,
          CUST_DISPLAY_ID,
          Email: EmailValue,
          OTP,
          StatusID,
          SignupStatusID,
        });

        Toast.show({
          type: 'success',
          text1: Message || 'OTP sent successfully!',
        });

        console.log('Signup success, navigating to OtpScreen...');
        setTimeout(() => navigation.navigate('OtpScreen'), 2000);
      } else {
        Toast.show({
          type: 'error',
          text1: Message || 'Signup failed. Please try again.',
        });
      }
    });
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const atIndex = value.indexOf('@');
    if (atIndex !== -1 && value.slice(atIndex + 1).length === 0) {
      const suggestedEmails = emailDomains.map(domain => value + domain);
      setSuggestions(suggestedEmails);
    } else {
      setSuggestions([]);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <Background
        source={require('../../Assets/images/mobilebg.jpg')}
        resizeMode="cover"
      >
        {loading && <LoadingSpinner />}

        <Container
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <LoginBoxContainer>
            <Logo source={require('../../Assets/images/up-logo.png')} />
            <Title>Get Started</Title>
            <Subtitle>
              Enter your email to begin onboarding or continue where you left
              off
            </Subtitle>

            <InputContainer>
              <Input
                value={email}
                placeholder="Email Address"
                placeholderTextColor="rgba(255,255,255,0.6)"
                onChangeText={handleEmailChange}
              />
              {suggestions.length > 0 && (
                <Suggestions>
                  {suggestions.map((s, i) => (
                    <TouchableOpacity key={i} onPress={() => setEmail(s)}>
                      <SuggestionText>{s}</SuggestionText>
                    </TouchableOpacity>
                  ))}
                </Suggestions>
              )}
            </InputContainer>

            {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
            <AnimatedButton title="Begin" onPress={handleSignup} />
          </LoginBoxContainer>
        </Container>
      </Background>
    </KeyboardAvoidingView>
  );
};

export default Login;
