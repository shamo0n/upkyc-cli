import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  Alert,
  Dimensions,
  View,
  Modal,
  Platform,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { AuthContext } from '../../Contexts/AuthContext';
import { GetCustomerProfileCompleteAPI } from '../../Helpers/API';
import LoadingSpinner from '../../components/LoadingSpinner';
import QRCode from 'react-native-qrcode-svg';
import RNHTMLtoPDF from 'react-native-html-to-pdf-fix';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import ViewShot, { captureRef } from 'react-native-view-shot';

import {
  Container,
  ProfileBox,
  InfoList,
  IDActions,
  IDActionButton,
  Actions,
  ButtonText,
  ActionButton,
  ModalOverlay,
  ModalContent,
  CloseBtn,
  IDImage,
  QRContainer,
  QRBox,
  QRSection,
  ProfileItem,
  ImageBox,
  ProfileItemText,
  BoldText,
  CloseText,
  IDImagesContainer,
  ImageBlock,
  DownloadButton,
} from './style';

import ProfileHeader from '../../components/ProfileHeader';
import AppHeader from '../../components/AppHeader';
import { RootStackParamList } from '../../components/Routes';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowrighttIcon,
  DnloadIcon,
  PDFDownloadIcon,
  RshareIcon,
} from '../../Assets/images/SVG';

interface CustomerProfile {
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  Gender?: string;
  DOB?: string;
  Phone?: string;
  Country?: string;
  Province?: string;
  City?: string;
  Citizenship?: string;
  StreetAddress?: string;
  SELFIE_FILEPATH?: string;
  IDFRONT_FILEPATH?: string;
  IDBACK_FILEPATH?: string;
  Email?: string;
  iscaseRejected?: string;
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { authUser } = useContext(AuthContext);
  const [customerProfile, setCustomerProfile] =
    useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const qrRef = useRef<ViewShot>(null);

  useEffect(() => {
    if (authUser) fetchCustomerProfile();
  }, [authUser]);

  const fetchCustomerProfile = () => {
    setLoading(true);
    const body = {
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
    };

    GetCustomerProfileCompleteAPI(body, (response: any) => {
      setLoading(false);
      const resultChildren =
        response?.responseBody?.children?.[0]?.children || [];
      if (!resultChildren.length) {
        Alert.alert('No data', 'No profile data found');
        return;
      }

      const extractValue = (name: string) =>
        resultChildren.find((c: any) => c.name === name)?.value || '';
      setCustomerProfile({
        FirstName: extractValue('FIRST_NAME'),
        MiddleName: extractValue('MIDLE_NAME'),
        LastName: extractValue('LAST_NAME'),
        Gender: extractValue('Gender'),
        DOB: extractValue('DOB'),
        Phone: extractValue('PHONE'),
        Country: extractValue('COUNTRY'),
        Province: extractValue('PROVINCE_OR_STATE'),
        City: extractValue('CITY'),
        Citizenship: extractValue('CITIZENSHIP'),
        StreetAddress: extractValue('REGISTERED_OFFICE_ADDRESS'),
        SELFIE_FILEPATH: extractValue('SELFIE_URL'),
        IDFRONT_FILEPATH: extractValue('ID_FRONT_URL'),
        IDBACK_FILEPATH: extractValue('ID_BACK_URL'),
        Email: extractValue('EMAIL'),
        iscaseRejected: extractValue('iscaseRejected'),
      });
    });
  };

  const openShareSheet = () => {
    setShowShareSheet(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeShareSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setShowShareSheet(false));
  };
  const handleShareIDImagesPDF = async () => {
    if (!customerProfile) return;

    try {
      const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              background-color: #f9f9f9;
              margin: 0;
              padding: 20px;
            }
            h2 {
              color: #333;
              margin-bottom: 20px;
            }
            .img-block {
              margin-bottom: 25px;
            }
            .img-block img {
              width: 250px;
              height: 160px;
              object-fit: cover;
              border-radius: 10px;
              border: 1px solid #ccc;
            }
            .label {
              margin-bottom: 8px;
              font-weight: bold;
              color: #444;
            }
          </style>
        </head>
        <body>
          <h2>Customer ID Documents</h2>
          ${
            customerProfile.IDFRONT_FILEPATH
              ? `<div class="img-block">
                  <div class="label">ID Front</div>
                  <img src="${customerProfile.IDFRONT_FILEPATH}" />
                </div>`
              : ''
          }
          ${
            customerProfile.IDBACK_FILEPATH
              ? `<div class="img-block">
                  <div class="label">ID Back</div>
                  <img src="${customerProfile.IDBACK_FILEPATH}" />
                </div>`
              : ''
          }
        </body>
      </html>
    `;

      const pdf = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: `Customer_IDs_${customerProfile.Email || 'Profile'}`,
        base64: false,
      });

      await Share.open({
        title: 'Share ID Images PDF',
        url: `file://${pdf.filePath}`,
        type: 'application/pdf',
        failOnCancel: false,
      });

      closeShareSheet();
    } catch (error) {
      console.error(' PDF Share Error:', error);
      Alert.alert('Error', 'Failed to generate or share PDF.');
    }
  };

  const handleDownloadPDF = async () => {
    openShareSheet(); // show bottom sheet first
  };

  const handleShareQRCode = async () => {
    try {
      if (!qrRef.current) return;
      const uri = await captureRef(qrRef, { format: 'png', quality: 1 });
      await Share.open({
        url: `file://${uri}`,
        type: 'image/png',
        title: 'My QR Code',
        failOnCancel: false,
      });
      closeShareSheet();
    } catch (error) {
      console.error(' Share Error:', error);
      Alert.alert('Error', 'Failed to share QR image');
    }
  };

  const handleShareURL = async () => {
    try {
      if (!customerProfile) return;
      const shareUrl =
        customerProfile.iscaseRejected !== '0'
          ? `https://amlhlep.com/OnBoarding_AML/site/OTP.html?CUSTOMER_GID=${customerProfile.Email}`
          : `https://amlhlep.com/OnBoarding_AML/site/waiting.html`;

      await Share.open({
        message: `Open your customer verification link:\n${shareUrl}`,
        failOnCancel: false,
      });
      closeShareSheet();
    } catch (error) {
      console.error(' URL Share Error:', error);
      Alert.alert('Error', 'Failed to share URL');
    }
  };

  if (loading)
    return (
      <Container source={require('../../Assets/images/mobilebg.jpg')}>
        <AppHeader showBack onBackPress={() => navigation.goBack()} />
        <LoadingSpinner />
      </Container>
    );

  if (!customerProfile)
    return (
      <Container source={require('../../Assets/images/mobilebg.jpg')}>
        <AppHeader showBack onBackPress={() => navigation.goBack()} />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <BoldText>No profile data found</BoldText>
        </View>
      </Container>
    );

  const fullName = [
    customerProfile.FirstName,
    customerProfile.MiddleName,
    customerProfile.LastName,
  ]
    .filter(Boolean)
    .join(' ');

  const slideUp = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Container source={require('../../Assets/images/mobilebg.jpg')}>
      <AppHeader showBack onBackPress={() => navigation.goBack()} />
      <ProfileBox>
        <ProfileHeader
          profilePic={customerProfile.SELFIE_FILEPATH}
          fullName={fullName}
        />

        <IDActions>
          <IDActionButton onPress={() => setShowModal(true)}>
            <ButtonText>View ID Images</ButtonText>
          </IDActionButton>
        </IDActions>

        <InfoList>
          {[
            { label: 'Gender', value: customerProfile.Gender },
            { label: 'DOB', value: customerProfile.DOB },
            { label: 'Phone', value: customerProfile.Phone },
            { label: 'Country', value: customerProfile.Country },
            { label: 'Province', value: customerProfile.Province },
            { label: 'City', value: customerProfile.City },
            { label: 'Citizenship', value: customerProfile.Citizenship },
            { label: 'Address', value: customerProfile.StreetAddress },
          ].map((item, idx) => (
            <ProfileItem key={idx}>
              <ImageBox>
                <ArrowrighttIcon width={12} height={12} />
              </ImageBox>
              <ProfileItemText>
                <BoldText>{item.label}: </BoldText> {item.value || '-'}
              </ProfileItemText>
            </ProfileItem>
          ))}
        </InfoList>

        {/* 🔹 QR SECTION */}
        <QRContainer>
          <ViewShot
            ref={qrRef}
            options={{ format: 'png', quality: 1, result: 'tmpfile' }}
          >
            <QRSection>
              <QRBox>
                <QRCode
                  value={
                    customerProfile.iscaseRejected !== '0'
                      ? `https://amlhlep.com/OnBoarding_AML/site/OTP.html?CUSTOMER_GID=${customerProfile.Email}`
                      : `https://amlhlep.com/OnBoarding_AML/site/waiting.html`
                  }
                  size={80}
                />
              </QRBox>
            </QRSection>
          </ViewShot>

          <Actions>
            <ActionButton onPress={handleShareQRCode}>
              <DnloadIcon width={16} height={16} />
              <ButtonText>Download</ButtonText>
            </ActionButton>

            <ActionButton onPress={handleDownloadPDF}>
              <RshareIcon width={16} height={16} />
              <ButtonText>Share</ButtonText>
            </ActionButton>
          </Actions>
        </QRContainer>
      </ProfileBox>

      {/* 🔹 ID Images Modal */}
      {showModal && (
        <Modal transparent animationType="fade" visible={showModal}>
          <ModalOverlay>
            <ModalContent>
              <DownloadButton
                onPress={handleShareIDImagesPDF}
                style={{
                  padding: 14,
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                }}
              >
                <Text
                  style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}
                >
                  Download
                </Text>
              </DownloadButton>

              <CloseBtn onPress={() => setShowModal(false)}>
                <CloseText>×</CloseText>
              </CloseBtn>

              <IDImagesContainer>
                {customerProfile.IDFRONT_FILEPATH && (
                  <ImageBlock>
                    <IDImage
                      source={{ uri: customerProfile.IDFRONT_FILEPATH }}
                    />
                  </ImageBlock>
                )}
                {customerProfile.IDBACK_FILEPATH && (
                  <ImageBlock>
                    <IDImage
                      source={{ uri: customerProfile.IDBACK_FILEPATH }}
                    />
                  </ImageBlock>
                )}
              </IDImagesContainer>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}

      {/* 🔹 Bottom Share Sheet */}
      {showShareSheet && (
        <Modal transparent visible={showShareSheet} animationType="none">
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
            activeOpacity={1}
            onPress={closeShareSheet}
          />
          <Animated.View
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 20,
              transform: [{ translateY: slideUp }],
            }}
          >
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: '#ccc',
                  borderRadius: 2,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={handleShareQRCode}
              style={{
                padding: 14,
                borderBottomWidth: 1,
                borderColor: '#eee',
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 16 }}>
                Share QR Code
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShareURL}
              style={{
                padding: 14,
                borderBottomWidth: 1,
                borderColor: '#eee',
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 16 }}>
                Share URL
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeShareSheet} style={{ padding: 14 }}>
              <Text style={{ textAlign: 'center', color: 'red', fontSize: 16 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      )}
    </Container>
  );
};

export default ProfileScreen;
