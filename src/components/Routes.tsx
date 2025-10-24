import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../Contexts/AuthContext';

// Screens
import Login from '../Auth/Login';
import OtpScreen from '../Auth/OtpScreen';
import Dashboard from '../Screens/Dashboard';
import ProfileScreen from '../Screens/ProfileScreen';
import KycProcessScreen from '../Screens/KycProcessScreen';
import PersonalInformationScreen from '../Screens/PersonalInformation';
import SupportScreen from '../Screens/SupportScreen';
import IDDetailsComponentSec from '../Screens/IDDetailsComponentSec';
import DocumentIDUpload from '../Screens/DocumentIDUpload';
import SelfieCameraScreen from './SelfieCameraScreen';
import IDFrontCamera from './IDFrontCamera';
import IDBackCamera from './IDBackCamera';

// 1️⃣ Define all screen names and their parameter types
export type RootStackParamList = {
  Login: undefined;
  OtpScreen: undefined;
  Dashboard: { statusId?: string }; // <-- add optional param here
  ProfileScreen: { statusId?: string };
  DocumentIdUpload: {
    step: number;
    idType: string;
    idFront?: string;
    idBack?: string;
  };
  PersonalInformation: undefined;
  KycProcessScreen: { customerProfile: any };
  SupportScreen: { statusId?: string };
  IDDetailsComponentSec: { statusId?: string };
  DocumentIDUpload: {
    step: number;
    idType?: string;
    idFront?: string;
    idBack?: string;
  };
};

// 2️⃣ Create a strongly typed navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { isLoggedIn } = useAuth();
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  useEffect(() => {
    // Disable hardware back button globally
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    const checkLogin = async () => {
      try {
        const storedLogin = await AsyncStorage.getItem('isLoggedIn');
        setInitialRoute(storedLogin === 'true' ? 'Dashboard' : 'Login');
      } catch (error) {
        setInitialRoute('Login');
      }
    };

    checkLogin();

    return () => backHandler.remove();
  }, []);

  if (!initialRoute) return null; // wait until initial route is known

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {/*  Auth Screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />

        {/*  Onboarding / KYC Screens */}
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformationScreen}
        />
        <Stack.Screen name="KycProcessScreen" component={KycProcessScreen} />

        {/*  Main App Screens */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen
          name="IDDetailsComponentSec"
          component={IDDetailsComponentSec}
        />
        <Stack.Screen
          name="SelfieCamera"
          component={SelfieCameraScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="IDFrontCamera" component={IDFrontCamera} />
        <Stack.Screen name="IDBackCamera" component={IDBackCamera} />

        <Stack.Screen name="DocumentIDUpload" component={DocumentIDUpload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
