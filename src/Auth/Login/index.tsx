import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  Text,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../Contexts/AuthContext';
import { CustomerSignupAPI } from '../../Helpers/API';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
import { FaceIDIcon } from '../../Assets/images/SVG';
import {
  isBiometricEnabled,
  tryBiometricLogin,
} from '../../Utils/biometricAuth';

type RootStackParamList = {
  Login: undefined;
  OtpScreen: undefined;
  Dashboard: { statusId: string };
  PersonalInformation: { statusId: string };
  KycProcessScreen: { statusId: string }; // add if you navigate there
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
  const { saveUserSession, setIsLoggedIn } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;
  const [showBiometric, setShowBiometric] = useState(false);

  // Animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  useEffect(() => {
    const checkBiometric = async () => {
      const enabled = await isBiometricEnabled();
      setShowBiometric(enabled);
    };

    checkBiometric();
  }, []);

  // Auto Face ID login
  // useEffect(() => {
  //   const checkFaceID = async () => {
  //     console.log('[FaceID] Checking saved token...');
  //     const token = await tryFaceIDLogin(); // token should contain { CUSTID, Email, StatusID }

  //     if (token) {
  //       console.log('[FaceID] Token found, auto login!', token);

  //       // Restore session in AuthContext
  //       saveUserSession({
  //         CUSTID_DIGITAL_GID: token.CUSTID,
  //         Email: token.Email,
  //         StatusID: token.StatusID,
  //       });
  //       console.log('[FaceID] Session restored in AuthContext');

  //       // Set user as logged in
  //       setIsLoggedIn(true);
  //       console.log('[FaceID] User marked as logged in');

  //       // Navigate based on StatusID
  //       switch (token.StatusID) {
  //         case '2':
  //           console.log('[FaceID] Navigating to PersonalInformation');
  //           navigation.navigate('PersonalInformation', {
  //             statusId: token.StatusID,
  //           });
  //           break;
  //         case '3':
  //         case '5':
  //           console.log('[FaceID] Navigating to Dashboard');
  //           navigation.navigate('Dashboard', { statusId: token.StatusID });
  //           break;
  //         case '4':
  //           console.log('[FaceID] Navigating to KycProcessScreen');
  //           navigation.navigate('KycProcessScreen', {
  //             statusId: token.StatusID,
  //           });
  //           break;
  //         default:
  //           console.log('[FaceID] Navigating to Dashboard (default)');
  //           navigation.navigate('Dashboard', { statusId: token.StatusID });
  //           break;
  //       }
  //     } else {
  //       console.log('[FaceID] No token found');
  //     }
  //   };

  //   checkFaceID();
  // }, []);

  // Signup API call
  const handleSignup = () => {
    Keyboard.dismiss();
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

  // Email input change
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

  // const handleFaceIDLogin = async () => {
  //   console.log('[FaceID] Button pressed');

  //   const token = await tryBiometricLogin();

  //   if (!token) {
  //     console.log('[FaceID] No token found or authentication cancelled');
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Biometric login failed or cancelled',
  //     });
  //     return;
  //   }

  //   console.log('[FaceID] Authentication success, token:', token);

  //   if (!token.StatusID) {
  //     console.warn('[FaceID] StatusID is undefined, cannot navigate properly');
  //   }

  //   saveUserSession({
  //     CUST_DISPLAY_ID: token.CUST_DISPLAY_ID || '', // fallback if not in token
  //     CUSTID_DIGITAL_GID: token.CUSTID,
  //     Email: token.Email,
  //     StatusID: token.StatusID,
  //   });

  //   setIsLoggedIn(true);

  //   switch (token.StatusID) {
  //     case '2':
  //       navigation.navigate('PersonalInformation', {
  //         statusId: token.StatusID,
  //       });
  //       break;
  //     case '3':
  //     case '5':
  //       navigation.navigate('Dashboard', { statusId: token.StatusID });
  //       break;
  //     case '4':
  //       navigation.navigate('KycProcessScreen', { statusId: token.StatusID });
  //       break;
  //     default:
  //       navigation.navigate('Dashboard', { statusId: token.StatusID });
  //       break;
  //   }
  // };
  const handleFaceIDLogin = async () => {
    console.log('[Biometric] Login pressed');

    const token = await tryBiometricLogin();

    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Biometric authentication failed',
      });
      return;
    }

    console.log('[Biometric] Login success', token);

    saveUserSession({
      CUST_DISPLAY_ID: token.CUST_DISPLAY_ID || '',
      CUSTID_DIGITAL_GID: token.CUSTID,
      Email: token.Email,
      StatusID: token.StatusID,
    });

    setIsLoggedIn(true);

    switch (token.StatusID) {
      case '2':
        navigation.navigate('PersonalInformation', {
          statusId: token.StatusID,
        });
        break;
      case '3':
      case '5':
        navigation.navigate('Dashboard', { statusId: token.StatusID });
        break;
      case '4':
        navigation.navigate('KycProcessScreen', {
          statusId: token.StatusID,
        });
        break;
      default:
        navigation.navigate('Dashboard', { statusId: token.StatusID });
    }
  };

  return (
    <Background
      source={require('../../Assets/images/mobilebg.jpg')}
      resizeMode="cover"
    >
      {loading && <LoadingSpinner />}
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        // enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? 80 : 0}
        keyboardOpeningTime={100}
      >
        <LoginBoxContainer
          style={{
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
        >
          <Logo source={require('../../Assets/images/up-logo.png')} />
          <Title>Get Started</Title>
          <Subtitle>
            Enter your email to begin onboarding or continue where you left off
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
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setEmail(s);
                      setSuggestions([]);
                    }}
                  >
                    <SuggestionText>{s}</SuggestionText>
                  </TouchableOpacity>
                ))}
              </Suggestions>
            )}
          </InputContainer>

          {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}

          <AnimatedButton title="Begin" onPress={handleSignup} />
          {showBiometric && (
            <TouchableOpacity
              onPress={handleFaceIDLogin}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
                shadowColor: '#fff',
              }}
            >
              {/* Icon */}
              <FaceIDIcon width={24} height={24} style={{ marginRight: 10 }} />

              {/* Text */}
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Login with Face ID
              </Text>
            </TouchableOpacity>
          )}
        </LoginBoxContainer>
      </KeyboardAwareScrollView>
    </Background>
  );
};

export default Login;
