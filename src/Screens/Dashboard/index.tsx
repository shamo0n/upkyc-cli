import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Alert,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

import { AuthContext, useAuth } from '../../Contexts/AuthContext';
import { GetCustomerProfileCompleteAPI } from '../../Helpers/API';
import { RootStackParamList } from '../../components/Routes'; // ✅ import here
import * as Progress from 'react-native-progress';

import {
  Container,
  Header,
  ProfileBox,
  NameText,
  EmailText,
  Grid,
  Card,
  CardText,
  Centered,
  DashboardBox,
  StatusText,
  WelcomeText,
} from './style';
import {
  DrivingLicenseIcon,
  IdCardIcon,
  KycIcon,
  OnnboardingIcon,
} from '../../Assets/images/SVG';
import SideMenu from '../../components/SideMenu';
import LoadingSpinner from '../../components/LoadingSpinner';

// ✅ Type definitions for navigation and route
type DashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;
type DashboardRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const route = useRoute<DashboardRouteProp>();
  const { authUser } = useContext(AuthContext);

  const [customerProfile, setCustomerProfile] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setMenuOpen(false);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setMenuOpen(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  useEffect(() => {
    console.log('@route.params', route.params);
    console.log('@route.params.statusId', route.params.statusId);

    if (authUser) {
      handleGetCustomerProfileCompleteAPI();
    }
  }, [authUser]);

  const handleGetCustomerProfileCompleteAPI = () => {
    if (!authUser) return;

    setLoading(true);
    const body = {
      CUSTID_DIGITAL_GID: authUser.CUSTID_DIGITAL_GID,
      Email: authUser.Email,
    };

    console.log('Fetching customer profile with body:', body);

    GetCustomerProfileCompleteAPI(body, (response: any) => {
      setLoading(false);
      console.log('API response:', response);

      if (
        !response ||
        !response.responseBody ||
        !Array.isArray(response.responseBody.children) ||
        response.responseBody.children.length === 0
      ) {
        Toast.show({ type: 'error', text1: 'Could not load profile data.' });
        return;
      }

      // Extract the actual result node
      const resultNode = response.responseBody.children[0]?.children || [];
      const extractValue = (name: string) =>
        resultNode.find((c: any) => c.name === name)?.value || '';

      const messageCode = extractValue('MessageCode');
      const isErrorMessage = extractValue('IsErrorMessage');
      const message = extractValue('Message');

      const profile = {
        CUSTID_GID: extractValue('ROW_ID_GID'),
        FirstName: extractValue('FIRST_NAME'),
        MiddleName: extractValue('MIDLE_NAME'),
        LastName: extractValue('LAST_NAME'),
        Email: extractValue('EMAIL'),
        StatusID: extractValue('StatusID'),
        isKYC_Eval: extractValue('isKYC_Eval'),
        iscaseRejected: extractValue('iscaseRejected'),
        SELFIE_URL: extractValue('SELFIE_URL'),
        ID_FRONT_URL: extractValue('ID_FRONT_URL'),
        ID_BACK_URL: extractValue('ID_BACK_URL'),
        MatchConfidence: parseFloat(extractValue('MatchConfidence') || '0'),
        livenessScore: parseFloat(extractValue('livenessScore') || '0'),
        livenessResult: extractValue('livenessResult'),
      };

      console.log('Extracted profile:', profile);

      if (messageCode === '2' && isErrorMessage === 'false') {
        setCustomerProfile(profile);
      } else {
        Toast.show({
          type: 'error',
          text1: message || 'Failed to load profile.',
        });
      }
    });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            console.log('Logout failed:', error);
          }
        },
      },
    ]);
  };
  const handleProfileClick = () => {
    if (!customerProfile || Object.keys(customerProfile).length === 0) {
      Toast.show({ type: 'error', text1: 'Profile data not loaded yet.' });
      return;
    }

    navigation.navigate('ProfileScreen', {
      statusId: customerProfile.StatusID || 'default',
    });
  };

  const handleKycClick = () => {
    if (customerProfile.StatusID === '3' || customerProfile.StatusID === '2') {
      Toast.show({
        type: 'error',
        text1: 'Profile inactive. Wait for verification.',
      });
    } else {
      navigation.navigate('KycProcessScreen', { customerProfile });
    }
  };
  const handleSupportClick = () => {
    // Optionally, you can check some profile status if needed
    if (customerProfile.StatusID === '3' || customerProfile.StatusID === '2') {
      Toast.show({
        type: 'error',
        text1: 'Profile inactive. Wait for verification.',
      });
    } else {
      // Navigate to SupportScreen
      navigation.navigate('SupportScreen', {
        statusId: customerProfile.StatusID,
      });
    }

    // Close the side menu
    setMenuOpen(false);
  };

  const handleCamloClick = () => {
    if (customerProfile.StatusID === '3' || customerProfile.StatusID === '2') {
      Toast.show({ text1: 'CAMLO review pending.' });
    } else {
      Toast.show({ type: 'success', text1: 'CAMLO review completed.' });
    }
  };
  const handleOnboardingClick = () => {
    const isMatchValid = customerProfile.MatchConfidence > 0.8;
    const isLivenessValid =
      customerProfile.livenessResult === 'real' &&
      customerProfile.livenessScore > 0.8;

    if (isMatchValid && isLivenessValid) {
      Toast.show({ type: 'success', text1: 'Onboarding completed.' });
    } else {
      navigation.navigate('DocumentIDUpload', {
        step: 5,
        idType: customerProfile.IdTypeID || undefined,
        idFront: customerProfile.ID_FRONT_URL || undefined,
        idBack: customerProfile.ID_BACK_URL || undefined,
      });
    }
  };
  const gridItems = [
    {
      label: 'Profile',
      action: handleProfileClick,
      icon: IdCardIcon,
      progress: 100,
    },
    {
      label: 'Onboarding',
      action: handleOnboardingClick,
      icon: OnnboardingIcon,
      progress:
        customerProfile.MatchConfidence > 0.8 &&
        customerProfile.livenessScore > 0.8
          ? 100
          : 70,
    },
    {
      label: 'KYC',
      action: handleKycClick,
      icon: KycIcon,
      progress: customerProfile.StatusID === '5' ? 100 : 25,
    },
    {
      label: 'CAMLO Reviewed',
      action: handleCamloClick,
      icon: OnnboardingIcon,
      progress:
        customerProfile.StatusID === '3' || customerProfile.StatusID === '2'
          ? 50
          : 100,
    },
  ];

  // if (loading)
  //   return (
  //     <Centered>
  //       <ActivityIndicator size="large" color="#28a745" />
  //     </Centered>
  //   );
  if (loading) return <LoadingSpinner />;

  const statusId = route.params?.statusId || 'default'; // fallback if undefined

  const getProfileStatus = (statusId: string) => {
    const statusMap: Record<string, { status: string; color: string }> = {
      '4': { status: 'Inactive', color: '#F44336' },
      '5': { status: 'Active', color: '#4CAF50' },
    };

    return (
      statusMap[statusId as keyof typeof statusMap] || {
        status: 'Pending',
        color: '#FFC107',
      }
    );
  };

  // Usage
  const profileStatus = getProfileStatus(statusId);

  // Usage

  return (
    <Container source={require('../../Assets/images/mobilebg.jpg')}>
      <Header>
        <Icon
          name="bars"
          size={26}
          color="#fff"
          onPress={() => setMenuOpen(!menuOpen)}
        />
        <Icon name="sign-out" size={24} color="#fff" onPress={handleLogout} />
      </Header>
      {/* ===== SIDE MENU OVERLAY ===== */}
      {menuOpen && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: windowWidth,
            height: windowHeight,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          activeOpacity={1}
          onPress={() => setMenuOpen(false)} // close when clicking outside
        >
          <SideMenu
            customerProfile={customerProfile}
            onClose={() => setMenuOpen(false)}
            onProfileClick={handleProfileClick}
            onOnboardingClick={handleOnboardingClick}
            onKycClick={handleKycClick}
            onCamloClick={handleCamloClick}
            onSupportClick={handleSupportClick}
            onLogoutClick={handleLogout}
          />
        </TouchableOpacity>
      )}
      {/* ===== MAIN DASHBOARD CONTENT ===== */}

      <DashboardBox>
        <ProfileBox>
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Profile Status:{' '}
            <Text style={{ color: profileStatus.color, fontWeight: 'bold' }}>
              {profileStatus.status}
            </Text>
          </Text>
          <WelcomeText>Welcome</WelcomeText>
          <NameText>
            {customerProfile?.FirstName || 'User'}{' '}
            {customerProfile?.LastName || ''}
          </NameText>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 500,
              marginTop: 10,
            }}
          >
            {customerProfile.StatusID < 4
              ? 'Validate your profile to get full features of our app'
              : 'Your profile is validated and ready to use all features'}
          </Text>{' '}
        </ProfileBox>

        <Grid>
          {gridItems.map(item => {
            const IconComp = item.icon;
            const percentage = Math.round(item.progress); // just round the 0-100 value

            return (
              <Card key={item.label} onPress={item.action}>
                <IconComp width={40} height={40} fill="blue" />
                <CardText>{item.label}</CardText>

                <View
                  style={{
                    marginTop: 12,
                    width: 150,
                    height: 20,
                    justifyContent: 'center',
                  }}
                >
                  {/* Progress Bar */}
                  <Progress.Bar
                    progress={item.progress / 100} // 0-1 scale
                    width={150}
                    height={20}
                    color="rgb(110,129,123)"
                    unfilledColor="#ccc"
                    borderWidth={0}
                    borderRadius={10}
                  />

                  {/* Percentage Text */}
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}
                    >
                      {percentage}%
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })}
        </Grid>
      </DashboardBox>
      <Toast />
    </Container>
  );
};

export default Dashboard;
