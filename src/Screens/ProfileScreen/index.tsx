import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Alert, Dimensions, View } from 'react-native';
import { AuthContext } from '../../Contexts/AuthContext';
import {
  GetCustomerProfileCompleteAPI,
  OpenReportAPI,
} from '../../Helpers/API';
import LoadingSpinner from '../../components/LoadingSpinner';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  Container,
  ProfileBox,
  InfoList,
  Actions,
  ActionButton,
  ModalOverlay,
  ModalContent,
  CloseBtn,
  IDImage,
  QRSection,
  InfoText,
  ProfileItem,
  ImageBox,
  ArrowIcon,
  ProfileItemText,
  BoldText,
} from './style';
import ProfileHeader from '../../components/ProfileHeader';
import { RootStackParamList } from '../../components/Routes';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppHeader from '../../components/AppHeader';
import { ArrowrighttIcon } from '../../Assets/images/SVG';

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

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const statusId = route.params?.statusId || '';
  const { authUser } = useContext(AuthContext);

  const [customerProfile, setCustomerProfile] =
    useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(
    Dimensions.get('window').width <= 768,
  );

  useEffect(() => {
    if (authUser) handleGetCustomerProfileCompleteAPI();

    const handleResize = () =>
      setIsMobile(Dimensions.get('window').width <= 768);
    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription.remove();
  }, [authUser]);
  const handleGetCustomerProfileCompleteAPI = () => {
    console.log('Fetching customer profile for:', authUser?.CUSTID_DIGITAL_GID);

    const body = {
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
    };

    console.log('Request body:', body);

    GetCustomerProfileCompleteAPI(body, (response: any) => {
      console.log('API response:', JSON.stringify(response, null, 2));

      const resultChildren =
        response?.responseBody?.children?.[0]?.children || [];

      if (!resultChildren.length) {
        console.log('No profile data found');
        return Alert.alert('Error', 'Failed to load profile');
      }

      const extractValue = (name: string) =>
        resultChildren.find((c: any) => c.name === name)?.value || '';

      const profile = {
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
      };

      console.log('Extracted profile:', profile);

      setCustomerProfile(profile);
      setLoading(false);
    });
  };

  // 🧾 Replace Print + Sharing with RNHTMLtoPDF + react-native-share
  const handleDownloadPDF = async () => {
    if (!customerProfile) return;

    const htmlContent = `
      <html>
        <body>
          <h1>ID Images</h1>
          ${
            customerProfile.IDFRONT_FILEPATH
              ? `<p>ID Front</p><img src="data:image/jpeg;base64,${customerProfile.IDFRONT_FILEPATH}" width="300"/>`
              : ''
          }
          ${
            customerProfile.IDBACK_FILEPATH
              ? `<p>ID Back</p><img src="data:image/jpeg;base64,${customerProfile.IDBACK_FILEPATH}" width="300"/>`
              : ''
          }
        </body>
      </html>
    `;

    try {
      const file = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'UPKYC_ID_Images',
        base64: false,
      });

      await Share.open({
        url: `file://${file.filePath}`,
        type: 'application/pdf',
      });
    } catch (error) {
      console.log('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  // 🧾 Replace FileSystem + Sharing with RNFS + Share
  const handleOpenReportAPI = async () => {
    if (!customerProfile) return;
    setLoading(true);

    const body = {
      Email: authUser?.Email,
      CUSTOMER_GID: authUser?.CUSTID_DIGITAL_GID,
    };

    OpenReportAPI(body, async (response: any) => {
      setLoading(false);
      const base64PDF = response?.responseBody?.value;
      if (!base64PDF) return Alert.alert('Report not available');

      const filePath = `${RNFS.CachesDirectoryPath}/UPKYC_Report.pdf`;
      await RNFS.writeFile(filePath, base64PDF, 'base64');

      await Share.open({
        url: `file://${filePath}`,
        type: 'application/pdf',
      });
    });
  };

  if (loading) return <LoadingSpinner />;
  if (!customerProfile)
    return (
      <Container>
        <ProfileHeader navigation={navigation} />
      </Container>
    );

  const fullName = [
    customerProfile.FirstName,
    customerProfile.MiddleName,
    customerProfile.LastName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Container source={require('../../Assets/images/mobilebg.jpg')}>
      <AppHeader showBack={true} onBackPress={() => navigation.goBack()} />
      <View style={{ alignItems: 'center' }}>
        <ProfileBox>
          <ProfileHeader
            profilePic={customerProfile.SELFIE_FILEPATH}
            fullName={fullName}
          />

          <InfoList>
            <ProfileItem>
              <ImageBox>
                <ArrowrighttIcon
                  width={20}
                  height={20}
                />
              </ImageBox>
              <ProfileItemText>
                <BoldText>Gender: </BoldText> {customerProfile.Gender}
              </ProfileItemText>
            </ProfileItem>

            <ProfileItem>
              <ImageBox>
                <ArrowrighttIcon width={20} height={20} />
              </ImageBox>
              <ProfileItemText>
                <BoldText>DOB: </BoldText> {customerProfile.DOB}
              </ProfileItemText>
            </ProfileItem>

            <ProfileItem>
              <ImageBox>
                <ArrowrighttIcon width={20} height={20} />
              </ImageBox>
              <ProfileItemText>
                <BoldText>Phone: </BoldText> {customerProfile.Phone}
              </ProfileItemText>
            </ProfileItem>

            <ProfileItem>
              <ImageBox>
                <ArrowrighttIcon width={20} height={20} />
              </ImageBox>
              <ProfileItemText>
                <BoldText>Country: </BoldText> {customerProfile.Country}
              </ProfileItemText>
            </ProfileItem>

            <ProfileItem>
              <ImageBox>
                <ArrowrighttIcon width={20} height={20} />
              </ImageBox>
              <ProfileItemText>
                <BoldText>Province: </BoldText> {customerProfile.Province}
              </ProfileItemText>
            </ProfileItem>

            <ProfileItem>
              <ImageBox>
                <ArrowrighttIcon width={20} height={20} />
              </ImageBox>
              <ProfileItemText>
                <BoldText>City: </BoldText> {customerProfile.City}
              </ProfileItemText>
            </ProfileItem>

            <ProfileItem>
              <ImageBox>
                <ArrowrighttIcon width={20} height={20} />
              </ImageBox>
              <ProfileItemText>
                <BoldText>Citizenship: </BoldText> {customerProfile.Citizenship}
              </ProfileItemText>
            </ProfileItem>

            <ProfileItem>
              <ImageBox>
                <ArrowrighttIcon width={20} height={20} />
              </ImageBox>
              <ProfileItemText>
                <BoldText>Address: </BoldText> {customerProfile.StreetAddress}
              </ProfileItemText>
            </ProfileItem>
          </InfoList>

          <QRSection>
            <QRCode
              value={
                customerProfile.iscaseRejected !== '0'
                  ? `https://amlhlep.com/OnBoarding_AML/site/OTP.html?CUSTOMER_GID=${customerProfile.Email}`
                  : `https://amlhlep.com/OnBoarding_AML/site/waiting.html`
              }
              size={150}
            />
          </QRSection>

          <Actions>
            <ActionButton onPress={() => setShowModal(true)}>
              View ID Images
            </ActionButton>
            <ActionButton onPress={handleDownloadPDF}>
              Download PDF
            </ActionButton>
            <ActionButton onPress={handleOpenReportAPI}>
              Download Report
            </ActionButton>
          </Actions>
        </ProfileBox>

        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <CloseBtn onPress={() => setShowModal(false)}>×</CloseBtn>
              {customerProfile.IDFRONT_FILEPATH && (
                <IDImage
                  source={{
                    uri: `data:image/jpeg;base64,${customerProfile.IDFRONT_FILEPATH}`,
                  }}
                />
              )}
              {customerProfile.IDBACK_FILEPATH && (
                <IDImage
                  source={{
                    uri: `data:image/jpeg;base64,${customerProfile.IDBACK_FILEPATH}`,
                  }}
                />
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </View>
    </Container>
  );
};

export default ProfileScreen;
