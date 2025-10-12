import React, { useState } from 'react';
import { ScrollView, Platform, PermissionsAndroid } from 'react-native';
import styled from 'styled-components/native';
import { launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';

import { FormDataType } from '../../types'; // Make sure FormDataType is exported from a common file

// ========== STYLES ==========
const Container = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: #2a4738d1;
  border: 1px solid #fefefe12;
  height: 40px;
  width: 258px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 10px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
`;

const ImagePreview = styled.Image`
  width: 260px;
  height: 160px;
  border-radius: 8px;
  margin-top: 10px;
  border-width: 1px;
  border-color: #444;
`;

// ========== TYPES ==========
type LivenessResult = {
  isAlive?: boolean;
  score?: number;
};

type IDDetailsProps = {
  idType: string | number | null;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onUpload?: (
    type: keyof FormDataType,
    uri: string,
    result?: LivenessResult,
  ) => void;
  setParentLoader?: React.Dispatch<React.SetStateAction<boolean>>;
  onLivenessResult?: (result: LivenessResult) => void;
};

// ========== COMPONENT ==========
const IDDetailsComponent: React.FC<IDDetailsProps> = ({
  idType,
  formData,
  setFormData,
  onUpload,
  setParentLoader,
  onLivenessResult,
}) => {
  const [idImages, setIdImages] = useState({
    idFront: formData?.idFront || null,
    idBack: formData?.idBack || null,
    selfie: formData?.selfie || null,
  });

  const [selfieAttempts, setSelfieAttempts] = useState(0);
  const MAX_SELFIE_ATTEMPTS = 2;
  const isPassport = idType === 'passport';

  // ========== CAMERA PERMISSION ==========
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to take photos.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // ========== IMAGE PICKER ==========
  const pickImage = async (imageType: 'idFront' | 'idBack' | 'selfie') => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Toast.show({ type: 'error', text1: 'Camera permission denied' });
      return;
    }

    setParentLoader && setParentLoader(true);

    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
        includeBase64: true, // ✅ include base64
      });
      console.log('@FYCKJC', result.assets);
      if (!result.assets || result.assets.length === 0) return;

      const { uri, base64 } = result.assets[0];
      if (!uri) return;

      if (imageType === 'selfie') {
        if (!idImages.idFront || (!isPassport && !idImages.idBack)) {
          Toast.show({
            type: 'error',
            text1: 'Upload required ID documents first.',
          });
          return;
        }

        const faceDetected = await runFaceDetection(uri);
        if (!faceDetected) {
          Toast.show({ type: 'error', text1: 'No face detected in selfie.' });
          setIdImages(prev => ({ ...prev, selfie: null }));
          setFormData(prev => ({ ...prev, selfie: undefined }));
          return;
        }

        const liveness = await runLivenessCheck(uri);
        const faceMatched = await runFaceMatch(idImages.idFront, uri);

        if (!liveness?.isAlive || !faceMatched) {
          setSelfieAttempts(prev => prev + 1);
          setIdImages(prev => ({ ...prev, selfie: null }));
          setFormData(prev => ({ ...prev, selfie: undefined }));

          if (selfieAttempts + 1 < MAX_SELFIE_ATTEMPTS) {
            Toast.show({
              type: 'error',
              text1: 'Selfie failed verification. Please try again.',
            });
            return;
          } else {
            Toast.show({
              type: 'error',
              text1:
                'Selfie verification failed. Max attempts reached. You can still proceed if required.',
            });
          }
        }

        // Success
        setSelfieAttempts(0);
        setIdImages(prev => ({ ...prev, selfie: uri }));
        setFormData(prev => ({ ...prev, selfie: { uri, base64 } }));
        onUpload &&
          onUpload('selfie', { uri, base64 }, { liveness, faceMatched });
        onLivenessResult && onLivenessResult({ liveness, faceMatched });

        Toast.show({ type: 'success', text1: 'Selfie uploaded successfully.' });
      } else {
        // ID front/back
        setIdImages(prev => ({ ...prev, [imageType]: uri }));
        setFormData(prev => ({ ...prev, [imageType]: { uri, base64 } }));
        onUpload && onUpload(imageType, { uri, base64 });
        Toast.show({ type: 'success', text1: `${imageType} uploaded.` });
      }
    } catch (err) {
      console.error('Image upload error:', err);
      Toast.show({ type: 'error', text1: 'Failed to upload image.' });
    } finally {
      setParentLoader && setParentLoader(false);
    }
  };

  // ========== FAKE API CALLS ==========
  const runFaceDetection = async (uri: string) => {
    try {
      const data = new FormData();
      data.append('photo', {
        uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
      const res = await fetch('https://api.luxand.cloud/photo/landmarks', {
        method: 'POST',
        headers: { token: 'd8c4c17021224d80a82713129a62702e' },
        body: data,
      });
      const json = await res.json();
      return json.landmarks?.length > 0;
    } catch (err) {
      console.error('Face detection error:', err);
      return false;
    }
  };

  const runLivenessCheck = async (
    uri: string,
  ): Promise<LivenessResult | null> => {
    try {
      const res = await fetch('https://api.luxand.cloud/photo/liveness/v2', {
        method: 'POST',
        headers: {
          token: 'd8c4c17021224d80a82713129a62702e',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photo: uri }),
      });
      return await res.json();
    } catch (err) {
      console.error('Liveness check error:', err);
      return null;
    }
  };

  const runFaceMatch = async (idFrontUri: string, selfieUri: string) => {
    try {
      const res = await fetch('https://api.luxand.cloud/photo/similarity', {
        method: 'POST',
        headers: {
          token: 'd8c4c17021224d80a82713129a62702e',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          face1: idFrontUri,
          face2: selfieUri,
          threshold: 0.8,
        }),
      });
      const json = await res.json();
      return json.similar === true;
    } catch (err) {
      console.error('Face match error:', err);
      return false;
    }
  };

  return (
    <Container contentContainerStyle={{ alignItems: 'center' }}>
      <Title>Please Upload Your Documents</Title>

      <Button onPress={() => pickImage('idFront')}>
        <ButtonText>Upload ID Front</ButtonText>
      </Button>
      {idImages.idFront && <ImagePreview source={{ uri: idImages.idFront }} />}

      {!isPassport && (
        <>
          <Button onPress={() => pickImage('idBack')}>
            <ButtonText>Upload ID Back</ButtonText>
          </Button>
          {idImages.idBack && (
            <ImagePreview source={{ uri: idImages.idBack }} />
          )}
        </>
      )}

      <Button onPress={() => pickImage('selfie')}>
        <ButtonText>Upload Selfie</ButtonText>
      </Button>
      {idImages.selfie && <ImagePreview source={{ uri: idImages.selfie }} />}
    </Container>
  );
};

export default IDDetailsComponent;
