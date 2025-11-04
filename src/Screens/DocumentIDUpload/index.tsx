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
import LoadingSpinner from '../../components/LoadingSpinner';

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
  const handleSkip = () =>
    navigation.navigate('Dashboard', { statusId: 'success' });
  const handleUpdateIdentificationInfoAPI = (idTypeValue: number | string) => {
    return new Promise<void>((resolve, reject) => {
      const body = {
        CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
        Email: authUser?.Email,
        IdentificationTypeID: idTypeValue,
        IdentificationTypeName:
          idType === 7
            ? 'Drivers Licence'
            : idType === 4
            ? 'Citizenship Card'
            : idType === 5
            ? 'Passport'
            : '',
      };
      UpdateIdentificationInfoAPI(body, (res: any) => {
        if (res?.responseBody?.children?.length) resolve();
        else reject('Failed to update ID info');
      });
    });
  };
  const handleIdUpload = async (
    imageType: string,
    base64Data: string,
    faceData?: any,
  ) => {
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

    const fd = faceData || formData.faceData;

    if (imageType === 'selfie') {
      const livenessResult = fd?.livenessStatus ?? 'unknown';
      const livenessScore = fd?.livenessScore ?? 0;
      const matchScore = fd?.similarityScore ?? 0;
      const similar = fd?.similar ?? false;

      console.log('@faceData', fd);
      console.log('@livenessResult', livenessResult);
      console.log('@livenessScore', livenessScore);
      console.log('@matchScore', matchScore);
      console.log('@similar', similar);

      if (
        !(
          livenessResult === 'success' &&
          livenessScore > 0.8 &&
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
        setFormData(prev => ({ ...prev, selfie: null }));
        return;
      }

      body.livenessResult = livenessResult;
      body.livenessScore = livenessScore;
      body.MatchPercentage = matchScore;
    }

    try {
      setLoading(true);
      await SaveSignupDocumentAPI(body, data => {
        const success =
          data?.IsErrorMessage === false ||
          data?.Success === true ||
          data?.Status?.toLowerCase?.() === 'success' ||
          !data?.Message?.toLowerCase?.().includes('error');

        if (success) {
          // Toast.show({ type: 'success', text1: `${cfg.desc} uploaded!` });

          // ✅ Navigate to dashboard after selfie upload success
          if (imageType === 'selfie') {
            setIsSelfieUploaded(true);
            setTimeout(() => {
              navigation.navigate('Dashboard', { statusId: 'success' });
            }, 800); // small delay for toast visibility
          }
        } else {
          Toast.show({
            type: 'error',
            text1: data?.Message || 'Upload failed',
          });
        }
      });
    } catch (err) {
      console.error('[Upload Error]', err);
      Toast.show({ type: 'error', text1: 'Upload failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (
    type: string,
    data: { uri: string; base64: string },
    faceData?: any,
  ) => {
    console.log('🆙 Upload complete:', type, data.uri);
    console.log('Received from child:', type, data, faceData);

    // ✅ Save to formData for later reference
    setFormData(prev => ({
      ...prev,
      [type]: data.base64,
      faceData: faceData || prev.faceData,
    }));

    // ✅ Continue upload immediately with provided data
    await handleUpdateIdentificationInfoAPI(idType);
    await handleIdUpload(type, data.base64, faceData);
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
      <AppHeader showBack={true} onBackPress={handleCancel} />
      {loading && <LoadingSpinner />}

      <Container>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'stretch',
            paddingHorizontal: 16,
            paddingBottom: 60,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Box>
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
