// import React, { useContext, useEffect, useState } from 'react';
// import { ScrollView, Alert, Dimensions, View, Modal } from 'react-native';
// import { AuthContext } from '../../Contexts/AuthContext';
// import {
//   GetCustomerProfileCompleteAPI,
//   OpenReportAPI,
// } from '../../Helpers/API';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import QRCode from 'react-native-qrcode-svg';
// import Share from 'react-native-share';
// import {
//   Container,
//   ProfileBox,
//   InfoList,
//   IDActions,
//   IDActionButton,
//   Actions,
//   ButtonText,
//   ActionButton,
//   ModalOverlay,
//   ModalContent,
//   CloseBtn,
//   IDImage,
//   QRContainer,
//   QRBox,
//   QRSection,
//   ProfileItem,
//   ImageBox,
//   ProfileItemText,
//   BoldText,
//   CloseText,
//   IDImagesContainer,
//   ImageBlock,
//   DownloadButton,
// } from './style';
// import ProfileHeader from '../../components/ProfileHeader';
// import AppHeader from '../../components/AppHeader';
// import { RootStackParamList } from '../../components/Routes';
// import { RouteProp } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import {
//   ArrowrighttIcon,
//   DnloadIcon,
//   PDFDownloadIcon,
//   RshareIcon,
// } from '../../Assets/images/SVG';

// interface CustomerProfile {
//   FirstName?: string;
//   MiddleName?: string;
//   LastName?: string;
//   Gender?: string;
//   DOB?: string;
//   Phone?: string;
//   Country?: string;
//   Province?: string;
//   City?: string;
//   Citizenship?: string;
//   StreetAddress?: string;
//   SELFIE_FILEPATH?: string;
//   IDFRONT_FILEPATH?: string;
//   IDBACK_FILEPATH?: string;
//   Email?: string;
//   iscaseRejected?: string;
// }

// type ProfileScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'ProfileScreen'
// >;
// type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

// interface ProfileScreenProps {
//   navigation: ProfileScreenNavigationProp;
//   route: ProfileScreenRouteProp;
// }

// const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
//   const { authUser } = useContext(AuthContext);
//   const [customerProfile, setCustomerProfile] =
//     useState<CustomerProfile | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isMobile, setIsMobile] = useState(
//     Dimensions.get('window').width <= 768,
//   );

//   useEffect(() => {
//     if (authUser) fetchCustomerProfile();

//     const handleResize = () =>
//       setIsMobile(Dimensions.get('window').width <= 768);
//     const subscription = Dimensions.addEventListener('change', handleResize);

//     return () => subscription.remove();
//   }, [authUser]);

//   const fetchCustomerProfile = () => {
//     setLoading(true);
//     const body = {
//       CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
//       Email: authUser?.Email,
//     };

//     GetCustomerProfileCompleteAPI(body, (response: any) => {
//       setLoading(false);
//       const resultChildren =
//         response?.responseBody?.children?.[0]?.children || [];

//       if (!resultChildren.length) {
//         Alert.alert('No data', 'No profile data found');
//         return;
//       }

//       const extractValue = (name: string) =>
//         resultChildren.find((c: any) => c.name === name)?.value || '';

//       const profile: CustomerProfile = {
//         FirstName: extractValue('FIRST_NAME'),
//         MiddleName: extractValue('MIDLE_NAME'),
//         LastName: extractValue('LAST_NAME'),
//         Gender: extractValue('Gender'),
//         DOB: extractValue('DOB'),
//         Phone: extractValue('PHONE'),
//         Country: extractValue('COUNTRY'),
//         Province: extractValue('PROVINCE_OR_STATE'),
//         City: extractValue('CITY'),
//         Citizenship: extractValue('CITIZENSHIP'),
//         StreetAddress: extractValue('REGISTERED_OFFICE_ADDRESS'),
//         SELFIE_FILEPATH: extractValue('SELFIE_URL'),
//         IDFRONT_FILEPATH: extractValue('ID_FRONT_URL'),
//         IDBACK_FILEPATH: extractValue('ID_BACK_URL'),
//         Email: extractValue('EMAIL'),
//         iscaseRejected: extractValue('iscaseRejected'),
//       };

//       setCustomerProfile(profile);
//     });
//   };

//   // const handleDownloadPDF = async () => {
//   //   console.log('handleDownloadPDF called'); // Log when function is invoked

//   //   if (!customerProfile) {
//   //     console.log('No customer profile found, aborting PDF generation');
//   //     return;
//   //   }

//   //   try {
//   //     console.log('Preparing HTML for PDF...');

//   //     const html = `
//   //     <html>
//   //       <body style="text-align:center;">
//   //         ${
//   //           customerProfile.IDFRONT_FILEPATH
//   //             ? `<img src="${
//   //                 customerProfile.IDFRONT_FILEPATH.startsWith('http')
//   //                   ? customerProfile.IDFRONT_FILEPATH
//   //                   : `data:image/jpeg;base64,${customerProfile.IDFRONT_FILEPATH}`
//   //               }" style="width:90%; margin-bottom:10px;" />`
//   //             : ''
//   //         }
//   //         ${
//   //           customerProfile.IDBACK_FILEPATH
//   //             ? `<img src="${
//   //                 customerProfile.IDBACK_FILEPATH.startsWith('http')
//   //                   ? customerProfile.IDBACK_FILEPATH
//   //                   : `data:image/jpeg;base64,${customerProfile.IDBACK_FILEPATH}`
//   //               }" style="width:90%;" />`
//   //             : ''
//   //         }
//   //       </body>
//   //     </html>
//   //   `;

//   //     console.log('HTML prepared:', html);

//   //     console.log('Generating PDF...');
//   //     const file = await RNHTMLtoPDF.generate({
//   //       html,
//   //       fileName: 'ID_Images',
//   //       base64: false, // filePath will be returned
//   //     });

//   //     console.log('PDF generated at filePath:', file.filePath);

//   //     console.log('Opening share dialog...');
//   //     await Share.open({
//   //       url: `file://${file.filePath}`,
//   //       type: 'application/pdf',
//   //       title: 'ID Images PDF',
//   //     });

//   //     console.log('PDF shared successfully!');
//   //   } catch (error) {
//   //     console.error('PDF generation error:', error);
//   //   }
//   // };

//   if (loading) {
//     return (
//       <Container source={require('../../Assets/images/mobilebg.jpg')}>
//         <AppHeader showBack onBackPress={() => navigation.goBack()} />
//         <LoadingSpinner />
//       </Container>
//     );
//   }

//   if (!customerProfile) {
//     return (
//       <Container source={require('../../Assets/images/mobilebg.jpg')}>
//         <AppHeader showBack onBackPress={() => navigation.goBack()} />
//         <View
//           style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//         >
//           <BoldText>No profile data found</BoldText>
//         </View>
//       </Container>
//     );
//   }

//   const fullName = [
//     customerProfile.FirstName,
//     customerProfile.MiddleName,
//     customerProfile.LastName,
//   ]
//     .filter(Boolean)
//     .join(' ');

//   return (
//     <Container source={require('../../Assets/images/mobilebg.jpg')}>
//       <AppHeader showBack onBackPress={() => navigation.goBack()} />
//       <ProfileBox>
//         <ProfileHeader
//           profilePic={customerProfile.SELFIE_FILEPATH}
//           fullName={fullName}
//         />
//         <IDActions>
//           <IDActionButton onPress={() => setShowModal(true)}>
//             <ButtonText>View ID Images</ButtonText>
//           </IDActionButton>
//         </IDActions>

//         <InfoList>
//           {[
//             { label: 'Gender', value: customerProfile.Gender },
//             { label: 'DOB', value: customerProfile.DOB },
//             { label: 'Phone', value: customerProfile.Phone },
//             { label: 'Country', value: customerProfile.Country },
//             { label: 'Province', value: customerProfile.Province },
//             { label: 'City', value: customerProfile.City },
//             { label: 'Citizenship', value: customerProfile.Citizenship },
//             { label: 'Address', value: customerProfile.StreetAddress },
//           ].map((item, idx) => (
//             <ProfileItem key={idx}>
//               <ImageBox>
//                 <ArrowrighttIcon width={12} height={12} />
//               </ImageBox>
//               <ProfileItemText>
//                 <BoldText>{item.label}: </BoldText> {item.value || '-'}
//               </ProfileItemText>
//             </ProfileItem>
//           ))}
//         </InfoList>

//         <QRContainer>
//           <QRSection>
//             <QRBox>
//               <QRCode
//                 value={
//                   customerProfile.iscaseRejected !== '0'
//                     ? `https://amlhlep.com/OnBoarding_AML/site/OTP.html?CUSTOMER_GID=${customerProfile.Email}`
//                     : `https://amlhlep.com/OnBoarding_AML/site/waiting.html`
//                 }
//                 size={60}
//               />
//             </QRBox>
//           </QRSection>
//           <Actions>
//             <ActionButton onPress={handleDownloadPDF}>
//               <DnloadIcon width={16} height={16} />
//               <ButtonText>Download / Share</ButtonText>
//             </ActionButton>
//           </Actions>
//         </QRContainer>
//       </ProfileBox>

//       {showModal && (
//         <Modal transparent animationType="fade">
//           <ModalOverlay>
//             <ModalContent>
//               <DownloadButton onPress={handleDownloadPDF}>
//                 <PDFDownloadIcon width={16} height={16} />
//                 <ButtonText>Download</ButtonText>{' '}
//               </DownloadButton>
//               <CloseBtn onPress={() => setShowModal(false)}>
//                 <CloseText>×</CloseText>
//               </CloseBtn>

//               <IDImagesContainer>
//                 {customerProfile.IDFRONT_FILEPATH && (
//                   <ImageBlock>
//                     <IDImage
//                       source={
//                         customerProfile.IDFRONT_FILEPATH.startsWith(
//                           'http://',
//                         ) ||
//                         customerProfile.IDFRONT_FILEPATH.startsWith('https://')
//                           ? { uri: customerProfile.IDFRONT_FILEPATH }
//                           : {
//                               uri: `data:image/jpeg;base64,${customerProfile.IDFRONT_FILEPATH}`,
//                             }
//                       }
//                     />
//                   </ImageBlock>
//                 )}
//                 {customerProfile.IDBACK_FILEPATH && (
//                   <ImageBlock>
//                     <IDImage
//                       source={
//                         customerProfile.IDBACK_FILEPATH.startsWith('http://') ||
//                         customerProfile.IDBACK_FILEPATH.startsWith('https://')
//                           ? { uri: customerProfile.IDBACK_FILEPATH }
//                           : {
//                               uri: `data:image/jpeg;base64,${customerProfile.IDBACK_FILEPATH}`,
//                             }
//                       }
//                     />
//                   </ImageBlock>
//                 )}
//               </IDImagesContainer>
//             </ModalContent>
//           </ModalOverlay>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default ProfileScreen;

import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  Alert,
  Dimensions,
  View,
  Modal,
  Platform,
} from 'react-native';
import { AuthContext } from '../../Contexts/AuthContext';
import { GetCustomerProfileCompleteAPI } from '../../Helpers/API';
import LoadingSpinner from '../../components/LoadingSpinner';
import QRCode from 'react-native-qrcode-svg';
import RNHTMLtoPDF from 'react-native-html-to-pdf-fix';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

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
  const [isMobile, setIsMobile] = useState(
    Dimensions.get('window').width <= 768,
  );

  useEffect(() => {
    if (authUser) fetchCustomerProfile();

    const handleResize = () =>
      setIsMobile(Dimensions.get('window').width <= 768);
    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription.remove();
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

  const handleDownloadPDF = async () => {
    if (!customerProfile) return;

    try {
      const html = `
      <html>
        <body style="text-align:center;">
          ${
            customerProfile.IDFRONT_FILEPATH
              ? `<img src="${
                  customerProfile.IDFRONT_FILEPATH.startsWith('http')
                    ? customerProfile.IDFRONT_FILEPATH
                    : `data:image/jpeg;base64,${customerProfile.IDFRONT_FILEPATH}`
                }" style="width:90%; margin-bottom:10px;" />`
              : ''
          }
          ${
            customerProfile.IDBACK_FILEPATH
              ? `<img src="${
                  customerProfile.IDBACK_FILEPATH.startsWith('http')
                    ? customerProfile.IDBACK_FILEPATH
                    : `data:image/jpeg;base64,${customerProfile.IDBACK_FILEPATH}`
                }" style="width:90%;" />`
              : ''
          }
        </body>
      </html>
    `;

      console.log('Generating PDF...');
      const result = await RNHTMLtoPDF.convert({
        html,
        fileName: 'ID_Images',
        directory: 'Documents',
      });

      console.log('PDF generated at:', result.filePath);

      if (!result.filePath) {
        throw new Error('PDF filePath is null');
      }

      // Read PDF file as base64
      const pdfBase64 = await RNFS.readFile(result.filePath, 'base64');
      console.log('pdfBase64', pdfBase64);
      // Share using base64 (works on Android & iOS)
      await Share.open({
        title: 'ID Images PDF',
        url: `data:application/pdf;base64,${pdfBase64}`,
        type: 'application/pdf',
        failOnCancel: false,
      });

      console.log('PDF shared successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  if (loading) {
    return (
      <Container source={require('../../Assets/images/mobilebg.jpg')}>
        <AppHeader showBack onBackPress={() => navigation.goBack()} />
        <LoadingSpinner />
      </Container>
    );
  }

  if (!customerProfile) {
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
  }

  const fullName = [
    customerProfile.FirstName,
    customerProfile.MiddleName,
    customerProfile.LastName,
  ]
    .filter(Boolean)
    .join(' ');

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

        <QRContainer>
          <QRSection>
            <QRBox>
              <QRCode
                value={
                  customerProfile.iscaseRejected !== '0'
                    ? `https://amlhlep.com/OnBoarding_AML/site/OTP.html?CUSTOMER_GID=${customerProfile.Email}`
                    : `https://amlhlep.com/OnBoarding_AML/site/waiting.html`
                }
                size={60}
              />
            </QRBox>
          </QRSection>
          <Actions>
            <ActionButton onPress={handleDownloadPDF}>
              <DnloadIcon width={16} height={16} />
              <ButtonText>Download / Share</ButtonText>
            </ActionButton>
          </Actions>
        </QRContainer>
      </ProfileBox>

      {showModal && (
        <Modal transparent animationType="fade">
          <ModalOverlay>
            <ModalContent>
              <DownloadButton onPress={handleDownloadPDF}>
                <PDFDownloadIcon width={16} height={16} />
                <ButtonText>Download</ButtonText>
              </DownloadButton>
              <CloseBtn onPress={() => setShowModal(false)}>
                <CloseText>×</CloseText>
              </CloseBtn>

              <IDImagesContainer>
                {customerProfile.IDFRONT_FILEPATH && (
                  <ImageBlock>
                    <IDImage
                      source={
                        customerProfile.IDFRONT_FILEPATH.startsWith('http')
                          ? { uri: customerProfile.IDFRONT_FILEPATH }
                          : {
                              uri: `data:image/jpeg;base64,${customerProfile.IDFRONT_FILEPATH}`,
                            }
                      }
                    />
                  </ImageBlock>
                )}
                {customerProfile.IDBACK_FILEPATH && (
                  <ImageBlock>
                    <IDImage
                      source={
                        customerProfile.IDBACK_FILEPATH.startsWith('http')
                          ? { uri: customerProfile.IDBACK_FILEPATH }
                          : {
                              uri: `data:image/jpeg;base64,${customerProfile.IDBACK_FILEPATH}`,
                            }
                      }
                    />
                  </ImageBlock>
                )}
              </IDImagesContainer>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </Container>
  );
};

export default ProfileScreen;
