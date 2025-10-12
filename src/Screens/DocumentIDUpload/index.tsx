import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import IDDetailsComponent from '../IDDetailsComponentSec';
import DocumentUploadComponent from '../../components/DocumentUploadComponent';

import {
  Container,
  FormContainer,
  Title,
  ButtonRow,
  UploadButton,
  UploadButtonText,
  Button,
  ButtonText,
  Background,
  BackButton,
} from './style';
import { RootStackParamList } from '../../components/Routes';
import AppHeader from '../../components/AppHeader';

// ========== TYPES ==========
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DocumentIDUpload'
>;
type RouteProps = RouteProp<RootStackParamList, 'DocumentIDUpload'>;

// ========== COMPONENT ==========
const DocumentIDUpload: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const [currentStep, setCurrentStep] = useState<number>(5);
  const [formData, setFormData] = useState<any>({});
  const [idType, setIdType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Handlers
  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleSkip = () => navigation.navigate('Dashboard');
  const handleCancel = () => navigation.goBack();

  const handleImageUpload = (type: string, data: any) => {
    setFormData(prev => ({ ...prev, [type]: data }));
  };

  const handleDocumentUpload = (data: any) => {
    setFormData(prev => ({
      ...prev,
      document: data.document,
      documentType: data.documentType,
      documentName: data.documentName,
      documentExt: data.documentExt,
    }));
  };

  return (
    <Background source={require('../../Assets/images/mobilebg.jpg')}>
      <Container>
        <AppHeader showBack={true} onBackPress={() => navigation.goBack()} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
              width: '100%',
              
            }}
          >
            {currentStep === 5 && (
              <>
                <Title>ID Details</Title>
                <IDDetailsComponent
                  idType={idType}
                  formData={formData}
                  setFormData={setFormData}
                  onUpload={handleImageUpload}
                  setParentLoader={setLoading}
                />
              </>
            )}

            {currentStep === 6 && (
              <>
                <Title>Document Upload</Title>
                <DocumentUploadComponent
                  formData={formData}
                  setFormData={setFormData}
                  onUpload={handleDocumentUpload}
                />
              </>
            )}

            {/* <ButtonRow>
              <Button onPress={currentStep === 6 ? handleSkip : handleCancel}>
                <ButtonText>{currentStep === 6 ? 'Skip' : 'Cancel'}</ButtonText>
              </Button>

              <Button
                onPress={handleNext}
                disabled={currentStep === 5 && !formData.idFront}
              >
                <ButtonText>Next</ButtonText>
              </Button>
            </ButtonRow> */}
          </View>
        </ScrollView>
      </Container>
    </Background>
  );
};

export default DocumentIDUpload;
