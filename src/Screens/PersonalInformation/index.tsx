import React, { useState, useEffect } from 'react';
import { ScrollView, ToastAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Box,
  Title,
  ButtonRow,
  Button,
  ButtonText,
  BackButton,
  Background,
} from './style';

import PersonalInformationForm from '../../components/nonfacetoface/PersonalInformationForm';
import ContactForm from '../../components/nonfacetoface/ContactForm';
import AddressForm from '../../components/nonfacetoface/AddressForm';
import IDDetailsComponent from '../../components/IDDetailsComponent';
import IDTypeComponent from '../../components/IDDetails/IDTypeComponent';
import DocumentUploadComponent from '../../components/DocumentUploadComponent';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../Contexts/AuthContext';

import {
  getCountriesListAPI,
  SaveSignupDocumentAPI,
  UpdateAddressInfoAPI,
  UpdateContactInfoAPI,
  UpdateIdentificationInfoAPI,
  UpdatePersonalInfoAPI,
} from '../../Helpers/API';
import ProgressLoadbar from '../../components/ProgressLoadbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import AppHeader from '../../components/AppHeader';

type FormDataType = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dob?: string | Date;
  gender?: string;
  citizenship?: string | number;
  mobile?: string;
  streetAddress?: string;
  city?: string;
  provinceOrState?: string;
  postalCode?: string;
  countryId?: string | number;
  idFront?: string;
  idBack?: string;
  selfie?: string;
};

type FaceData = {
  landmarks?: any[];
  liveness?: { score?: number; result?: string };
  score?: number;
};

const PersonalInformationScreen = () => {
  const navigation = useNavigation();
  const { authUser } = useAuth();

  // ===================== STATES =====================
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({});
  const [citizenships, setCitizenships] = useState<any[]>([]);
  const [genders] = useState(['Male', 'Female', 'Other']);
  const [error, setError] = useState<any>({});
  const [idType, setIdType] = useState<number | null>(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [canadaId, setCanadaId] = useState<string | null>(null);

  const [progressLabel, setProgressLabel] = useState('Starting...');
  const [showProgressBar, setShowProgressBar] = useState(false);
  // ===================== INIT =====================
  useEffect(() => {
    handleGetCountriesList();
  }, []);

  const showToast = (message: string) => {
    if (Platform.OS === 'android')
      ToastAndroid.show(message, ToastAndroid.SHORT);
    else console.log('Toast:', message);
  };

  // ===================== GET COUNTRIES =====================
  const handleGetCountriesList = async () => {
    getCountriesListAPI((response: any) => {
      try {
        const itemListNode =
          response?.responseBody?.children?.[0]?.children?.find(
            (child: any) => child.name === 'itemList',
          );

        const countriesList =
          itemListNode?.children?.map((item: any) => {
            const idNode = item.children.find((c: any) => c.name === 'Id');
            const valueNode = item.children.find(
              (c: any) => c.name === 'Value',
            );
            return {
              countryId: idNode?.value ?? '',
              countryName: valueNode?.value ?? '',
            };
          }) || [];

        setCitizenships(countriesList);
      } catch (err) {
        console.warn('Error parsing countries response:', err);
        setCitizenships([]);
      }
    });
  };

  // ===================== DATE FORMAT =====================
  const formatDate = (date: string | number | Date): string => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ===================== API HANDLERS =====================
  const handlePersonalInformation = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dob ||
      !formData.gender
    ) {
      showToast('Please fill in all fields.');
      return Promise.reject('Validation error');
    }

    const body = {
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
      FirstName: formData.firstName,
      MiddleName: formData.middleName || '',
      LastName: formData.lastName,
      DOB: formatDate(formData.dob),
      Gender: formData.gender,
      CitizenshipCountryId: formData.citizenship || 0,
    };

    setLoading(true);
    return new Promise<boolean>((resolve, reject) => {
      UpdatePersonalInfoAPI(body, (response: any) => {
        setLoading(false);
        const children = response?.responseBody?.children?.[0]?.children || [];
        const messageCode = children.find(
          (c: any) => c.name === 'MessageCode',
        )?.value;
        const message =
          children.find((c: any) => c.name === 'Message')?.value || '';

        if (messageCode === '2') {
          showToast(message || 'Personal Info Saved');
          resolve(true);
        } else {
          showToast(message || 'Save Failed');
          reject(false);
        }
      });
    });
  };

  const handleContactInformation = async () => {
    if (!formData.mobile) {
      showToast('Please enter your mobile number.');
      return Promise.reject('Validation error');
    }
    const numericValue = formData.mobile.replace(/\D/g, '');
    if (numericValue.length < 10 || numericValue.length > 15) {
      showToast('Mobile number must be 10–15 digits.');
      return Promise.reject('Validation error');
    }

    const body = {
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
      Phone: formData.mobile,
    };

    setLoading(true);
    return new Promise<boolean>((resolve, reject) => {
      UpdateContactInfoAPI(body, (response: any) => {
        setLoading(false);
        const children = response?.responseBody?.children?.[0]?.children || [];
        const messageCode = children.find(
          (c: any) => c.name === 'MessageCode',
        )?.value;
        const message =
          children.find((c: any) => c.name === 'Message')?.value || '';

        if (messageCode === '2') {
          showToast(message || 'Contact Info Saved');
          resolve(true);
        } else {
          showToast(message || 'Failed to Save');
          reject(false);
        }
      });
    });
  };

  const handleAddressInformation = async () => {
    const body = {
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
      StreetAddress: formData.streetAddress,
      City: formData.city,
      Province: formData.provinceOrState || '',
      PostalCode: formData.postalCode || '',
      CountryId: formData.countryId || '',
      POBox: formData.postalCode || '',
    };

    setLoading(true);
    return new Promise<boolean>((resolve, reject) => {
      UpdateAddressInfoAPI(body, (response: any) => {
        setLoading(false);
        const children = response?.responseBody?.children?.[0]?.children || [];
        const messageCode = children.find(
          (c: any) => c.name === 'MessageCode',
        )?.value;
        const message =
          children.find((c: any) => c.name === 'Message')?.value || '';

        if (messageCode === '2') {
          showToast(message || 'Address Saved');
          resolve(true);
        } else {
          showToast(message || 'Failed to Save');
          reject(false);
        }
      });
    });
  };
  const handleSelectIdType = type => {
    // console.log("SELECTEDTYPE>>><<<<<<<", type);
    if (type === 'id-card') {
      setIdType(4);
    } else if (type === 'driving-license') {
      setIdType(7);
    } else if (type === 'passport') {
      setIdType(5);
    }
  };

  // ===================== IMAGE UPLOAD =====================
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
  const handleImageUpload = async (
    imageType: 'idFront' | 'idBack' | 'selfie',
    data: { uri: string; base64: string },
    faceData?: FaceData,
  ) => {
    console.log('Uploading type:', imageType);

    try {
      setLoading(true);
      if (!idType) throw new Error('ID type not selected');

      // Update identification info before upload
      await handleUpdateIdentificationInfoAPI(idType);
      if (!data.base64) throw new Error('Base64 data missing');

      // Prepare upload body
      const cleanBase64 = data.base64.replace(
        /^data:image\/[a-z]+;base64,/,
        '',
      );
      const body: any = {
        IDTypeID:
          imageType === 'idFront' ? 97 : imageType === 'idBack' ? 98 : 99,
        CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
        Email: authUser?.Email,
        Doccument_type: imageType === 'selfie' ? 'selfie' : 'idcard',
        Document_NO: '',
        Document_issue_Date: '',
        Document_expiry_Date: '',
        doc_name:
          imageType === 'idFront'
            ? 'idfront.png'
            : imageType === 'idBack'
            ? 'idback.png'
            : 'selfie.png',
        doc_Base64: cleanBase64,
        remarks: 'uploaded from digital onboarding',
        doc_MASTER_DETAILS:
          imageType === 'selfie' ? 'Selfie Image' : `ID ${imageType} image`,
        livenessScore: faceData?.liveness?.score,
        livenessResult: faceData?.liveness?.result,
        MatchPercentage: faceData?.score,
      };

      console.log('Uploading to backend...');
      SaveSignupDocumentAPI(body, (response: any) => {
        const children = response?.responseBody?.children || [];
        const messageCode = children.find(
          (c: any) => c.name === 'MessageCode',
        )?.value;
        const message =
          children.find((c: any) => c.name === 'Message')?.value || '';

        if (messageCode === '2') {
          Toast.show({
            type: 'success',
            text1:
              message ||
              (imageType === 'idFront'
                ? 'ID Front uploaded successfully'
                : imageType === 'idBack'
                ? 'ID Back uploaded successfully'
                : 'Selfie uploaded successfully'),
          });
          if (imageType === 'selfie') {
            setIsUploadSuccessful(true);
            setCurrentStep(prevStep => prevStep + 1);
          }
        } else {
          throw new Error(message || 'Upload failed');
        }
        //   if (imageType === 'selfie') setIsUploadSuccessful(true);
        // } else {
        //   throw new Error(message || 'Upload failed');
        // }
      });
    } catch (err: any) {
      console.error('handleImageUpload error:', err);
      Toast.show({
        type: 'error',
        text1: err?.message || 'Upload failed',
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleImageUpload = async (
  //   imageType: 'idFront' | 'idBack' | 'selfie',
  //   data: { uri: string; base64?: string },
  //   faceData?: FaceData,
  // ) => {
  //   console.log('Type:', imageType);
  //   console.log('URI:', data.uri);
  //   console.log('Base64:', data.base64);

  //   try {
  //     setLoading(true);
  //     if (!idType) throw new Error('ID type not selected');

  //     await handleUpdateIdentificationInfoAPI(idType);

  //     // Save base64 to formData
  //     setFormData(prev => ({ ...prev, [imageType]: data.base64 }));

  //     // Clean the base64 string for API
  //     const cleanBase64 = data.base64?.replace(
  //       /^data:image\/[a-z]+;base64,/,
  //       '',
  //     );
  //     if (!cleanBase64) throw new Error('Base64 data is missing');

  //     const body: any = {
  //       IDTypeID:
  //         imageType === 'idFront' ? 97 : imageType === 'idBack' ? 98 : 99,
  //       CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
  //       Email: authUser?.Email,
  //       Doccument_type: imageType === 'selfie' ? 'selfie' : 'idcard',
  //       Document_NO: '',
  //       Document_issue_Date: '',
  //       Document_expiry_Date: '',
  //       doc_name:
  //         imageType === 'idFront'
  //           ? 'idfront.png'
  //           : imageType === 'idBack'
  //           ? 'idback.png'
  //           : 'selfie.png',
  //       doc_Base64: cleanBase64,
  //       remarks: 'uploaded from digital onboarding',
  //       doc_MASTER_DETAILS:
  //         imageType === 'selfie' ? 'Selfie Image' : `ID ${imageType} image`,
  //       livenessScore: faceData?.liveness?.score,
  //       livenessResult: faceData?.liveness?.result,
  //       MatchPercentage: faceData?.score,
  //     };

  //     SaveSignupDocumentAPI(body, (response: any) => {
  //       const children = response?.responseBody?.children || [];
  //       const messageCode = children.find(
  //         (c: any) => c.name === 'MessageCode',
  //       )?.value;
  //       const message =
  //         children.find((c: any) => c.name === 'Message')?.value || '';

  //       if (messageCode === '2') {
  //         showToast(message || `${imageType} uploaded successfully`);
  //         if (imageType === 'selfie') setIsUploadSuccessful(true);
  //       } else {
  //         throw new Error(message || 'Upload failed');
  //       }
  //     });
  //   } catch (err: any) {
  //     console.error(err);
  //     showToast(err?.message || 'Upload failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleProofOfDocumentUpload = async (
    base64Data?: string,
    imageType?: string,
  ) => {
    console.log('Form Data on Submit:', formData);

    if (!formData.documentType) {
      const errorMsg = 'Please select a document type before proceeding.';
      setError(errorMsg);
      Toast.show({ type: 'error', text1: errorMsg });
      return;
    }

    if (!formData.document) {
      const errorMsg = 'Please select document before proceeding.';
      setError(errorMsg);
      Toast.show({ type: 'error', text1: errorMsg });
      return;
    }

    // Remove Base64 prefix
    const removeBase64Prefix = (base64String?: string) => {
      if (
        base64String &&
        base64String.match(
          /^data:(image\/(png|jpeg|jpg|gif|bmp|webp)|application\/pdf);base64,/,
        )
      ) {
        return base64String.split(',')[1];
      }
      console.error('Invalid base64 string');
      return null;
    };

    const cleanBase64 = removeBase64Prefix(formData.document);
    if (!cleanBase64) {
      const errorMsg = 'Invalid image format.';
      setError(errorMsg);
      Toast.show({ type: 'error', text1: errorMsg });
      return;
    }

    setError('');
    setLoading(true);

    const body = {
      IDTypeID: imageType || '100',
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
      Doccument_type: formData.documentType,
      Document_NO: '',
      Document_issue_Date: '',
      Document_expiry_Date: '',
      doc_MASTER_DETAILS: 'proof of document',
      remarks: 'Uploaded from digital onboarding',
      doc_name: formData.documentName,
      doc_Base64: cleanBase64,
      MatchPercentage: '',
    };

    try {
      await SaveSignupDocumentAPI(body, (response: any) => {
        console.log('Response Body:', response);

        if (!response || !response.responseBody?.children) {
          const errorMsg =
            "We couldn't load your data. Please refresh or try again later.";
          setError(errorMsg);
          Toast.show({ type: 'error', text1: errorMsg });
          return;
        }

        const responseBody = response.responseBody.children;
        const messageCode = responseBody.find(
          (child: any) => child.name === 'MessageCode',
        )?.value;
        const isErrorMessage = responseBody.find(
          (child: any) => child.name === 'IsErrorMessage',
        )?.value;
        const message =
          responseBody.find((child: any) => child.name === 'Message')?.value ||
          'An error occurred.';
        const messageDetails =
          responseBody.find((child: any) => child.name === 'MessageDetails')
            ?.value || '';

        if (messageCode === '2' && isErrorMessage === 'false') {
          Toast.show({
            type: 'success',
            text1: message || 'Document uploaded successfully!',
          });
          setIsUploadSuccessful(true);

          setTimeout(() => {
            navigation.navigate('Login'); // React Navigation
          }, 1000);
        } else {
          const errorMsg = `${message} ${messageDetails}`;
          setError(errorMsg);
          Toast.show({ type: 'error', text1: errorMsg });
        }
      });
    } catch (err: any) {
      console.error(err);
      const errorMsg = err?.message || 'Upload failed';
      setError(errorMsg);
      Toast.show({ type: 'error', text1: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  // Cancel button: reset form and go to Login screen
  const handleCancel = () => {
    navigation.navigate('Login'); // Navigate to Login screen
    setCurrentStep(1); // Start from first step
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dob: '',
      mobile: '',
      email: '',
      confirmEmail: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
      countryId: '',
      streetAddress: '',
      poBox: '',
      provinceOrState: '',
      IdentificationTypeName:
        idType === 7
          ? 'Drivers Licence'
          : idType === 4
          ? 'Citizenship Card'
          : idType === 5
          ? 'Passport'
          : '',
    });
  };

  // Skip button: show progress and navigate to Dashboard after 3s
  const handleSkip = () => {
    setProgressLabel('Proceeding to Dashboard...');
    setShowProgressBar(true);

    setTimeout(() => {
      navigation.navigate('Login'); // Navigate to Dashboard screen
    }, 3000);
  };

  const handleNext = async () => {
    try {
      switch (currentStep) {
        case 1:
          await handlePersonalInformation();
          break;
        case 2:
          await handleContactInformation();
          break;
        case 3:
          await handleAddressInformation();
          break;
        case 4:
          if (!idType) return showToast('Please select an ID type.');
          break;
        case 5:
          if (!formData.selfie)
            return showToast('Please upload selfie before proceeding.');
          break;
      }
      setCurrentStep(prev => prev + 1);
    } catch (err) {
      console.warn(err);
      showToast('Something went wrong. Please try again.');
    }
  };

  const handleBack = () => {
    if (currentStep === 1) navigation.navigate('Login');
    else setCurrentStep(prev => prev - 1);
  };

  // ===================== RENDER =====================
  return (
    <Background source={require('../../Assets/images/mobilebg.jpg')}>
      {loading && <LoadingSpinner />}

      <Container>
        <AppHeader showBack={true} onBackPress={handleBack} />

        {showProgressBar && <ProgressLoadbar label={progressLabel} />}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          {/* <BackButton onPress={handleBack}>
            <ButtonText>Back</ButtonText>
          </BackButton> */}

          <Box style={{ width: '100%', alignSelf: 'center' }}>
            {currentStep === 1 && (
              <>
                <Title>Personal Information</Title>
                <PersonalInformationForm
                  formData={formData}
                  setFormData={setFormData}
                  error={error}
                  setError={setError}
                  genders={genders}
                  citizenships={citizenships}
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <Title>Contact Information</Title>
                <ContactForm
                  formData={formData}
                  setFormData={setFormData}
                  email={authUser?.Email}
                />
              </>
            )}
            {currentStep === 3 && (
              <>
                <Title>Address Information</Title>
                <AddressForm
                  formData={formData}
                  setFormData={setFormData}
                  error={error}
                  setError={setError}
                  canadaId={canadaId}
                  setCanadaId={setCanadaId}
                />
              </>
            )}
            {currentStep === 4 && (
              <>
                <Title>ID Details</Title>
                <IDTypeComponent onSelect={handleSelectIdType} />
              </>
            )}
            {currentStep === 5 && (
              <>
                <Title>Upload Images</Title>
                <IDDetailsComponent
                  idType={idType}
                  formData={formData}
                  setFormData={setFormData}
                  onUpload={
                    (type, data, faceData) =>
                      handleImageUpload(type, data, faceData) // data is { uri, base64 }
                  }
                  setParentLoader={setLoading}
                  authUser={authUser}
                />
              </>
            )}

            {currentStep === 6 && (
              <>
                <Title>Document Upload</Title>
                <DocumentUploadComponent
                  formData={formData}
                  setFormData={setFormData}
                  onUpload={() => {}}
                />
              </>
            )}

            <ButtonRow>
              {/* Left button: Cancel / Skip */}
              <Button onPress={currentStep === 6 ? handleSkip : handleCancel}>
                <ButtonText>{currentStep === 6 ? 'Skip' : 'Cancel'}</ButtonText>
              </Button>

              {/* Right button: Next */}
              {currentStep < 6 && (
                <Button
                  onPress={() => {
                    if (currentStep === 6) {
                      handleProofOfDocumentUpload();
                    } else {
                      handleNext();
                    }
                  }}
                  disabled={currentStep === 4 && !idType} // keep your original disabled check
                >
                  <ButtonText>Next</ButtonText>
                </Button>
              )}
            </ButtonRow>
          </Box>
        </ScrollView>
        <Toast />
      </Container>
    </Background>
  );
};

export default PersonalInformationScreen;
