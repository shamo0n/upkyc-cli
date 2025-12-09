import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Platform,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
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
import RNFS from 'react-native-fs';

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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/Routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  type PersonalInfoNavProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<PersonalInfoNavProp>();
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
  const [verificationStep, setVerificationStep] = useState(1);

  const [progressLabel, setProgressLabel] = useState('Starting...');
  const [showProgressBar, setShowProgressBar] = useState(false);
  // ===================== INIT =====================
  useEffect(() => {
    handleGetCountriesList();
  }, []);

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
    const newError: any = {};

    if (!formData.firstName) newError.firstName = 'First name is required';
    if (!formData.lastName) newError.lastName = 'Last name is required';
    if (!formData.dob) newError.dob = 'Date of birth is required';
    if (!formData.gender) newError.gender = 'Gender is required';
    if (!formData.citizenship) newError.citizenship = 'Citizenship is required';

    // If any errors found — update state and stop
    if (Object.keys(newError).length > 0) {
      setError(newError);
      Toast.show({
        type: 'error',
        text1: 'Please fill in all required fields',
      });
      return Promise.reject('Validation error');
    }

    // Clear errors before submit
    setError({});

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

    try {
      const response: any = await new Promise((resolve, reject) => {
        UpdatePersonalInfoAPI(body, (resp: any) => {
          if (resp) resolve(resp);
          else reject(new Error('No response from API'));
        });
      });

      const children = response?.responseBody?.children?.[0]?.children ?? [];
      const messageCode =
        children.find((c: any) => c.name === 'MessageCode')?.value || '';
      const message =
        children.find((c: any) => c.name === 'Message')?.value || '';
      const isErrorMessage =
        children.find((c: any) => c.name === 'IsErrorMessage')?.value ===
        'true';

      if (messageCode === '2' && !isErrorMessage) {
        Toast.show({
          type: 'success',
          text1: message || 'Personal Info Saved',
        });
        return true;
      } else {
        Toast.show({
          type: 'error',
          text1: message || 'Save Failed',
        });
        throw new Error(message || 'Save Failed');
      }
    } catch (error: any) {
      console.error('handlePersonalInformation error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to save personal info.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleContactInformation = async () => {
    if (!formData.mobile) {
      Toast.show({
        type: 'error',
        text1: 'Mobile number required',
        text2: 'Please enter your mobile number.',
      });
      return Promise.reject('Validation error');
    }
    const numericValue = formData.mobile.replace(/\D/g, '');
    if (numericValue.length < 10 || numericValue.length > 15) {
      Toast.show({
        type: 'error',
        text1: 'Mobile number must be 10–15 digits.',
      });
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
          Toast.show({
            type: 'success',
            text1: message || 'Contact Info Saved',
          });
          resolve(true);
        } else {
          Toast.show({
            type: 'error',
            text1: message || 'Failed to Save',
          });
          reject(false);
        }
      });
    });
  };

  const handleAddressInformation = async () => {
    const newError: any = {};

    const safeTrim = (val?: string | number) => (val ? String(val).trim() : '');

    const streetAddress = safeTrim(formData.streetAddress);
    const city = safeTrim(formData.city);
    const provinceOrState = safeTrim(formData.provinceOrState);
    const postalCode = safeTrim(formData.postalCode);
    const countryId = formData.countryId;
    console.log('formData.provinceOrState', formData.provinceOrState);
    console.log('@2----provinceOrState', provinceOrState);
    if (!streetAddress) newError.streetAddress = 'Street address is required';
    if (!city) newError.city = 'City is required';
    if (!countryId) newError.countryId = 'Country is required';
    if (!postalCode) newError.postalCode = 'Postal code is required';

    // ✅ Province/State validation — handles both dropdown & text
    if (!provinceOrState) {
      newError.provinceOrState = 'Province / State is required';
    }

    // ✅ Canada-specific postal code validation
    if (countryId === canadaId && postalCode) {
      const canadaPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      if (!canadaPostalRegex.test(postalCode)) {
        newError.postalCode = 'Invalid Canadian postal code. Example: A1A 1A1';
      }
    }

    // ✅ If there are any errors, block progression
    if (Object.keys(newError).length > 0) {
      setError(newError);
      Toast.show({
        type: 'error',
        text1: 'Please fill in all required fields correctly',
      });
      return Promise.reject('Validation error');
    }

    setError({}); // clear previous errors

    const body = {
      CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
      Email: authUser?.Email,
      StreetAddress: streetAddress,
      City: city,
      Province: provinceOrState,
      PostalCode: postalCode,
      CountryId: countryId,
      POBox: postalCode,
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
          Toast.show({
            type: 'success',
            text1: message || 'Address Saved',
          });
          resolve(true);
        } else {
          Toast.show({
            type: 'error',
            text1: message || 'Failed to Save',
          });
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
    faceData?: {
      score?: number;
      livenessScore?: number;
      similar?: boolean;
      livenessPassed?: boolean;
    },
  ) => {
    console.log('Uploading type:', imageType);
    console.log('faceData@@@@@:', faceData);
    console.log('similar:', faceData?.similar);
    console.log('score:', faceData?.score);
    console.log('livenessScore:', faceData?.livenessScore);
    console.log('livenessPassed:', faceData?.livenessPassed);

    try {
      setLoading(true);
      if (!idType) throw new Error('ID type not selected');

      await handleUpdateIdentificationInfoAPI(idType);
      if (!data.base64) throw new Error('Base64 data missing');

      // Save base64 to formData
      setFormData(prev => ({ ...prev, [imageType]: data.base64 }));

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

        MatchPercentage: faceData?.score, // Face similarity score
        livenessScore: faceData?.livenessScore, // Liveness score
        livenessResult: faceData?.livenessPassed, // Boolean (true/false)
      };

      console.log('Uploading to backend with:', body);

      SaveSignupDocumentAPI(body, (response: any) => {
        const children = response?.responseBody?.children || [];
        console.log('@children', children);

        const messageCode = children.find(
          (c: any) => c.name === 'MessageCode',
        )?.value;
        console.log('@messageCode', messageCode);

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
  const handleProofOfDocumentUpload = async () => {
    try {
      setLoading(true);

      if (!formData?.documentType)
        throw new Error('Please select a document type.');

      const document = formData?.document;
      if (!document?.uri) throw new Error('Please select a document.');

      let fileUri = document.fileCopyUri || document.uri; // fallback logic
      let inboxPathToDelete = null;
      console.log('Selected document URI:', fileUri);

      // ============ iOS "Inbox" file handling ============
      if (Platform.OS === 'ios' && fileUri.includes('Inbox')) {
        try {
          const inboxPath = decodeURIComponent(fileUri.replace('file://', ''));
          const exists = await RNFS.exists(inboxPath);

          if (exists) {
            const originalName = document.name?.trim() || 'document.pdf';
            const fileExt = originalName.includes('.')
              ? '.' + originalName.split('.').pop()
              : '';
            const baseName = originalName.replace(fileExt, '');
            let fileName = `${baseName}${fileExt}`;
            let destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

            let counter = 1;
            while (await RNFS.exists(destPath)) {
              fileName = `${baseName}_${counter}${fileExt}`;
              destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
              counter++;
            }

            await RNFS.copyFile(inboxPath, destPath);
            console.log('✅ iOS file copied to:', destPath);

            inboxPathToDelete = inboxPath;
            fileUri = destPath;
          } else {
            console.warn('❌ Inbox file not found or already removed.');
          }
        } catch (err) {
          console.log('⚠️ iOS file copy error:', err.message);
        }
      }

      // ============ Android "content://" handling (NO blob-util) ============
      if (Platform.OS === 'android' && fileUri.startsWith('content://')) {
        try {
          console.log(
            '📄 Copying Android content:// file to cache directory...',
          );

          const fileName = document.name || `document_${Date.now()}.tmp`;
          const destPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

          // Try to resolve using RNFS.stat
          const stat = await RNFS.stat(fileUri).catch(() => null);

          if (stat && stat.path && stat.isFile()) {
            console.log('✅ Using resolved path:', stat.path);
            await RNFS.copyFile(stat.path, destPath);
            fileUri = destPath;
          } else {
            console.log('⚠️ RNFS.stat failed, using base64 fallback...');
            // Fallback: read as base64 then write to cache
            const base64Data = await RNFS.readFile(fileUri, 'base64').catch(
              err => {
                console.log('⚠️ base64 read failed:', err.message);
                throw new Error('Could not read the selected file.');
              },
            );

            await RNFS.writeFile(destPath, base64Data, 'base64');
            console.log('✅ Wrote file manually to:', destPath);
            fileUri = destPath;
          }

          console.log('✅ Final Android local file path:', fileUri);
        } catch (e) {
          console.log('⚠️ Android URI copy error:', e.message);
          throw new Error('Cannot access selected document. Please try again.');
        }
      }

      // ============ Verify file exists ============
      const normalizedPath = fileUri.startsWith('file://')
        ? fileUri.replace('file://', '')
        : fileUri;

      console.log('Checking file existence at:', normalizedPath);
      const fileExists = await RNFS.exists(normalizedPath);
      console.log('File exists?', fileExists);

      if (!fileExists)
        throw new Error('The selected document could not be found on disk.');

      // ============ Convert to Base64 ============
      const base64Data = await RNFS.readFile(normalizedPath, 'base64');

      // ============ Prepare request body ============
      const body = {
        IDTypeID: 100,
        CUSTID_DIGITAL_GID: authUser?.CUSTID_DIGITAL_GID,
        Email: authUser?.Email,
        Doccument_type: formData.documentType,
        Document_NO: '',
        Document_issue_Date: '',
        Document_expiry_Date: '',
        doc_name: document.name || 'document.pdf',
        doc_Base64: base64Data,
        remarks: 'uploaded from digital onboarding',
        doc_MASTER_DETAILS: 'Proof of document',
      };

      // ============ API upload ============
      await new Promise((resolve, reject) => {
        SaveSignupDocumentAPI(body, response => {
          const children =
            response?.responseBody?.children?.[0]?.children || [];

          const getValue = key =>
            children.find(c => c.name === key)?.value || '';

          const messageCode = getValue('MessageCode');
          const message = getValue('Message');
          const isErrorMessage = getValue('IsErrorMessage');
          const statusId = getValue('StatusID');

          console.log('Parsed Values:', {
            messageCode,
            message,
            isErrorMessage,
            statusId,
          });

          if (messageCode === '2' && isErrorMessage === 'false') {
            Toast.show({
              type: 'success',
              text1: message || 'Document uploaded successfully!',
            });

            setIsUploadSuccessful(true);

            if (inboxPathToDelete) {
              RNFS.unlink(inboxPathToDelete)
                .then(() =>
                  console.log('🧹 Deleted Inbox temp file:', inboxPathToDelete),
                )
                .catch(err =>
                  console.log('⚠️ Inbox cleanup failed:', err.message),
                );
            }

            setTimeout(
              () => navigation.navigate('Dashboard', { statusId }),
              1000,
            );

            resolve(true);
          } else {
            reject(new Error(message || 'Upload failed.'));
          }
        });
      });
    } catch (err) {
      console.log('Upload Error:', err);
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: err?.message || 'Please try again',
      });
      setFormData(prev => ({
        ...prev,
        document: null,
        documentType: '',
      }));
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
      idFront: null,
      idBack: null,
      selfie: null,
    });
  };

  // Skip button: show progress and navigate to Dashboard after 3s
  const handleSkip = () => {
    setProgressLabel('Proceeding to Dashboard...');
    setShowProgressBar(true);

    setTimeout(
      () => navigation.navigate('Dashboard', { statusId: 'success' }),
      1000,
    );
  };

  const handleNext = async () => {
    try {
      let isValid = true;

      switch (currentStep) {
        case 1:
          isValid = await handlePersonalInformation().catch(() => false);
          break;
        case 2:
          isValid = await handleContactInformation().catch(() => false);
          break;
        case 3:
          isValid = await handleAddressInformation().catch(() => false);
          break;
        case 4:
          if (!idType) {
            Toast.show({
              type: 'error',
              text1: 'Please select an ID type.',
            });
            isValid = false;
          }
          break;
        case 5:
          if (!formData.selfie) {
            Toast.show({
              type: 'error',
              text1: 'Please upload a selfie before proceeding.',
            });
            isValid = false;
          }
          break;
      }

      if (!isValid) return; // stop here if validation failed

      setCurrentStep(prev => prev + 1);
    } catch (err) {
      console.warn(err);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. Please try again.',
      });
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
        <AppHeader showBack={currentStep !== 6} onBackPress={handleBack} />

        {showProgressBar && <ProgressLoadbar label={progressLabel} />}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              // alignItems: 'stretch',
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Box>
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
                    onUpload={(type, data, faceData) => {
                      console.log(
                        `[Parent onUpload] Received ${type}`,
                        data,
                        faceData,
                      );
                      handleImageUpload(type, data, faceData); // data is { uri, base64 }
                    }}
                    setParentLoader={setLoading}
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
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
                    onUpload={data => {
                      console.log('Document data received from child:', data);
                      setFormData(prev => ({
                        ...prev,
                        documentType: data.documentType,
                        documentName: data.documentName,
                        document: data.document?.base64 || data.document,
                        fileExtension: data.fileExtension,
                      }));
                    }}
                  />
                </>
              )}
              <ButtonRow>
                {/* Hide all buttons when currentStep === 5 */}
                {currentStep !== 5 && (
                  <>
                    {/* Left button: Cancel / Skip */}
                    <Button
                      onPress={currentStep === 6 ? handleSkip : handleCancel}
                    >
                      <ButtonText>
                        {currentStep === 6 ? 'Skip' : 'Cancel'}
                      </ButtonText>
                    </Button>

                    {/* Right button logic */}
                    {currentStep < 5 && (
                      <Button
                        onPress={handleNext}
                        disabled={currentStep === 4 && !idType}
                      >
                        <ButtonText>Next</ButtonText>
                      </Button>
                    )}

                    {currentStep === 6 && (
                      <Button
                        onPress={() => {
                          console.log('Before Upload:', formData);
                          handleProofOfDocumentUpload();
                        }}
                      >
                        <ButtonText>Next</ButtonText>
                      </Button>
                    )}
                  </>
                )}
              </ButtonRow>
            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
        <Toast />
      </Container>
    </Background>
  );
};

export default PersonalInformationScreen;
