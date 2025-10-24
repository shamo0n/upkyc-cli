import React, { useState, useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import IDDetailsComponent from '../IDDetailsComponentSec';
import DocumentUploadComponent from '../../components/DocumentUploadComponent';
import { AuthContext } from '../../Contexts/AuthContext';
import {
  SaveSignupDocumentAPI,
  UpdateIdentificationInfoAPI,
} from '../../Helpers/API';

import {
  Container,
  Title,
  ButtonRow,
  Button,
  ButtonText,
  Background,
  Box,
} from './style';
import { RootStackParamList } from '../../components/Routes';
import AppHeader from '../../components/AppHeader';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DocumentIDUpload'
>;
type RouteProps = RouteProp<RootStackParamList, 'DocumentIDUpload'>;

const DocumentIDUpload: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { authUser } = useContext(AuthContext);

  const { step, idType: passedIdType, idFront, idBack } = route.params || {};

  const [currentStep, setCurrentStep] = useState<number>(step || 5);
  const [idType, setIdType] = useState<string>(passedIdType || '');
  const [formData, setFormData] = useState<any>({
    idFront: idFront || null,
    idBack: idBack || null,
    selfie: null,
    document: null,
    documentType: '',
    documentName: '',
    documentExt: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isSelfieUploaded, setIsSelfieUploaded] = useState(false);

  useEffect(() => {
    console.log('Received navigation params:', route.params);
  }, [route.params]);

  const handleCancel = () => navigation.goBack();
  const handleSkip = () => navigation.navigate('Dashboard');

  // Update Identification Info API
  const handleUpdateIdentificationInfoAPI = async () => {
    if (!idType) return;
    const body = {
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
      IdentificationTypeID: idType,
      IdentificationTypeName:
        idType === '7'
          ? 'Drivers Licence'
          : idType === '4'
          ? 'Citizenship Card'
          : idType === '5'
          ? 'Passport'
          : '',
    };

    try {
      await UpdateIdentificationInfoAPI(body);
    } catch (err) {
      console.error('Error updating identification info:', err);
    }
  };

  // Upload individual ID/selfie images
  const handleIdUpload = async (imageType: string, base64Data: string) => {
    const idMap = {
      idFront: { IDTypeID: 97, name: 'idfront.png', desc: 'ID Card Front' },
      idBack: { IDTypeID: 98, name: 'idback.png', desc: 'ID Card Back' },
      selfie: { IDTypeID: 99, name: 'selfie.png', desc: 'Selfie Image' },
    };
    const cfg = idMap[imageType];
    if (!cfg) return;

    const body: any = {
      IDTypeID: cfg.IDTypeID,
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
      Doccument_type: imageType,
      Document_NO: '',
      Document_issue_Date: '',
      Document_expiry_Date: '',
      doc_name: cfg.name,
      remarks: 'uploaded from digital onboarding',
      doc_MASTER_DETAILS: cfg.desc,
      doc_Base64: base64Data.replace(/^data:image\/[a-z]+;base64,/, ''),
    };

    // Additional Selfie Verification Checks
    if (imageType === 'selfie') {
      const faceData = formData.faceData; // Assuming faceData is set in IDDetailsComponent
      const livenessResult = faceData?.liveness?.result ?? 'unknown';
      const livenessScore = faceData?.liveness?.score ?? 0;
      const matchScore = faceData?.match?.score ?? 0;
      const similar = faceData?.match?.similar ?? false;

      if (
        !(
          livenessResult === 'real' &&
          livenessScore >= 0.8 &&
          matchScore > 0.5 &&
          similar
        )
      ) {
        Toast.show({
          type: 'error',
          text1: `Selfie verification failed. Liveness: ${livenessResult} (${livenessScore.toFixed(
            2,
          )}), Match: ${matchScore.toFixed(2)}`,
        });
        setFormData((prev: any) => ({ ...prev, selfie: null }));
        return;
      }

      body.livenessResult = livenessResult;
      body.livenessScore = livenessScore;
      body.MatchPercentage = matchScore;
    }

    try {
      setLoading(true);
      await SaveSignupDocumentAPI(body, data => {
        console.log('[SaveSignupDocumentAPI Response]', data);
        if (!data?.IsErrorMessage) {
          Toast.show({ type: 'success', text1: `${cfg.desc} uploaded!` });
        } else {
          Toast.show({
            type: 'error',
            text1: data?.Message || 'Upload failed',
          });
        }
      });

      if (imageType === 'selfie') setIsSelfieUploaded(true);
    } catch (err) {
      console.error('[Upload Error]', err);
      Toast.show({ type: 'error', text1: 'Upload failed' });
    } finally {
      setLoading(false);
    }
  };

  // Unified Image Upload Handler
  // const handleImageUpload = async (type: string, data: any, faceData?: any) => {
  //   setFormData(prev => ({ ...prev, [type]: data, faceData }));
  //   await handleUpdateIdentificationInfoAPI();
  //   await handleIdUpload(type, data);
  // };
  const handleImageUpload = async (
    type: string,
    data: { uri: string; base64: string },
    faceData?: any,
  ) => {
    console.log('🆙 Upload complete:', type, data.uri);

    setFormData(prev => ({ ...prev, [type]: data.base64, faceData }));
    await handleUpdateIdentificationInfoAPI();
    await handleIdUpload(type, data.base64);
  };

  const handleDocumentUpload = (data: any) => {
    if (!data.documentType || !data.document) {
      Toast.show({ type: 'error', text1: 'Please select a document and type' });
      return;
    }
    setFormData(prev => ({
      ...prev,
      document: data.document,
      documentType: data.documentType,
      documentName: data.documentName,
      documentExt: data.documentExt,
    }));
  };

  const handleNext = () => {
    if (currentStep === 5) {
      if (!formData.idFront || !formData.idBack || !isSelfieUploaded) {
        Toast.show({
          type: 'error',
          text1: 'Please upload all required images',
        });
        return;
      }
    }
    if (currentStep === 6 && (!formData.document || !formData.documentType)) {
      Toast.show({
        type: 'error',
        text1: 'Please upload document before proceeding',
      });
      return;
    }
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  return (
    <Background source={require('../../Assets/images/mobilebg.jpg')}>
      <Container>
        <AppHeader showBack={true} onBackPress={handleCancel} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <Box style={{ width: '100%' }}>
            {currentStep === 5 && (
              <>
                <Title>Upload ID & Selfie</Title>
                <IDDetailsComponent
                  idType={idType}
                  idFrontPath={formData.idFront || idFront}
                  idBackPath={formData.idBack || idBack}
                  formData={formData}
                  setFormData={setFormData}
                  onUpload={handleImageUpload}
                  setParentLoader={setLoading}
                />
              </>
            )}
            {currentStep === 6 && (
              <>
                <Title>Upload Documents</Title>
                <DocumentUploadComponent
                  formData={formData}
                  setFormData={setFormData}
                  onUpload={handleDocumentUpload}
                />
              </>
            )}
            <ButtonRow>
              <Button onPress={currentStep === 6 ? handleSkip : handleCancel}>
                <ButtonText>{currentStep === 6 ? 'Skip' : 'Cancel'}</ButtonText>
              </Button>
              <Button
                onPress={handleNext}
                disabled={
                  (currentStep === 5 &&
                    (!formData.idFront ||
                      !formData.idBack ||
                      !isSelfieUploaded)) ||
                  (currentStep === 6 &&
                    (!formData.document || !formData.documentType))
                }
              >
                <ButtonText>Next</ButtonText>
              </Button>
            </ButtonRow>
          </Box>
        </ScrollView>
      </Container>
      <Toast />
    </Background>
  );
};

export default DocumentIDUpload;
