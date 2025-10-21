import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import { IdUploadIcon, SelectedIcon } from '../../Assets/images/SVG';

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const SectionTitle = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const UploadButton = styled.TouchableOpacity`
  background-color: #2a4738d1;
  border: 1px solid #fefefe12;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 10px;
  border-radius: 8px;
`;

const UploadButtonText = styled.Text`
  color: white;
  font-size: 14px;
`;

const PreviewImage = styled.Image<{ small?: boolean }>`
  width: ${({ small }) => (small ? '160px' : '260px')};
  height: ${({ small }) => (small ? '200px' : '160px')};
  border-radius: 8px;
  margin-top: 10px;
  border-width: 1px;
  border-color: #444;
`;

interface IDDetailsProps {
  idType: string;
  idFrontPath?: string;
  idBackPath?: string;
  formData?: any; // <-- ADD THIS
  setFormData?: React.Dispatch<React.SetStateAction<any>>; // <-- ADD THIS
  onUpload?: (
    type: 'idFront' | 'idBack' | 'selfie',
    data: { uri: string; base64: string },
  ) => void;
  setParentLoader?: (loading: boolean) => void;
}

interface IDImages {
  idFront: string | null;
  idBack: string | null;
  selfie: string | null;
}

const LUXAND_TOKEN = 'd8c4c17021224d80a82713129a62702e';
const MAX_ATTEMPTS = 2;

const IDDetailsComponentSec: React.FC<IDDetailsProps> = ({
  idType,
  idFrontPath,
  idBackPath,
  formData,
  setFormData,
  onUpload,
  setParentLoader,
}) => {
  useEffect(() => {
    if (formData?.idFront || formData?.idBack) {
      setIdImages(prev => ({
        ...prev,
        idFront: formData.idFront || prev.idFront,
        idBack: formData.idBack || prev.idBack,
      }));
    }
  }, [formData]);
  const [idImages, setIdImages] = useState<IDImages>({
    idFront: idFrontPath || null,
    idBack: idBackPath || null,
    selfie: null,
  });

  const [selfieAttempts, setSelfieAttempts] = useState(0);

  const isPassport = idType === 'passport';

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
  const urlToBase64 = async (url: string): Promise<string> => {
    try {
      if (url.startsWith('data:')) return url.split(',')[1]; // already base64

      const response = await fetch(url);
      const blob = await response.blob();

      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = (reader.result as string).split(',')[1];
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error('URL to base64 conversion failed:', err);
      throw err;
    }
  };

  const pickImage = async (type: 'idFront' | 'idBack' | 'selfie') => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Toast.show({ type: 'error', text1: 'Camera permission denied' });
      return;
    }

    try {
      setParentLoader?.(true);

      const result = await launchCamera({
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.8,
        saveToPhotos: false,
      });

      if (result.didCancel || !result.assets?.length) return;

      const asset = result.assets[0];
      if (!asset.base64) throw new Error('Base64 data missing from camera');

      const mimeType = asset.type || 'image/jpeg';
      let finalBase64 = `data:${mimeType};base64,${asset.base64}`;

      // Crop ID front/back
      if (type === 'idFront' || type === 'idBack') {
        try {
          const cropRes = await fetch('https://liveexshield.ca:2020/IMG_CROP', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64String: asset.base64 }),
          });
          if (cropRes.ok) {
            const cropData = await cropRes.json();
            if (cropData?.cropped_image) {
              finalBase64 = `data:image/png;base64,${cropData.cropped_image}`;
            }
          }
        } catch (err) {
          console.warn('Crop API error', err);
        }
      }

      // Face detection for ID front / selfie
      if (type === 'idFront' || type === 'selfie') {
        const formData = new FormData();
        formData.append('photo', {
          uri: asset.uri!,
          type: 'image/jpeg',
          name: `${type}.jpg`,
        } as any);

        try {
          const faceRes = await fetch(
            'https://api.luxand.cloud/photo/landmarks',
            {
              method: 'POST',
              headers: { token: LUXAND_TOKEN },
              body: formData,
            },
          );
          const faceJson = await faceRes.json();
          if (!faceJson?.landmarks?.length) {
            Toast.show({
              type: 'error',
              text1: 'No face detected. Try again.',
            });
            return;
          }
        } catch (err) {
          console.warn('Face detection error', err);
        }
      }

      // Selfie verification (only if type === 'selfie')
      if (type === 'selfie') {
        let idFrontForSelfie: string | undefined;

        if (idImages.idFront) {
          if (idImages.idFront.startsWith('data:')) {
            idFrontForSelfie = idImages.idFront.split(',')[1];
          } else {
            // Convert URL → base64 automatically
            try {
              const base64FromUrl = await urlToBase64(idImages.idFront);
              idFrontForSelfie = base64FromUrl;
              setIdImages(prev => ({
                ...prev,
                idFront: `data:image/jpeg;base64,${base64FromUrl}`,
              }));
            } catch (err) {
              Toast.show({
                type: 'error',
                text1:
                  'Failed to convert ID Front URL to base64. Please re-upload.',
              });
              return;
            }
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'ID Front missing. Upload first.',
          });
          return;
        }

        const proceed = await verifySelfie(asset, idFrontForSelfie);
        if (!proceed) return;
      }

      setIdImages(prev => ({ ...prev, [type]: finalBase64 }));
      onUpload?.(type, { uri: asset.uri!, base64: finalBase64 });

      Toast.show({ type: 'success', text1: `${type} uploaded successfully.` });
    } catch (err: any) {
      console.error(err);
      Toast.show({ type: 'error', text1: err.message || 'Upload failed.' });
      setIdImages(prev => ({ ...prev, [type]: null }));
    } finally {
      setParentLoader?.(false);
    }
  };

  const verifySelfie = async (selfieAsset: any, idFrontBase64: string) => {
    const attempt = selfieAttempts + 1;
    try {
      // Similarity check
      const simForm = new FormData();
      simForm.append('photo1', {
        uri: selfieAsset.uri,
        type: 'image/jpeg',
        name: 'selfie.jpg',
      } as any);
      simForm.append('photo2', {
        uri: `data:image/jpeg;base64,${idFrontBase64}`,
        type: 'image/jpeg',
        name: 'idFront.jpg',
      } as any);
      const simRes = await fetch('https://api.luxand.cloud/photo/similarity', {
        method: 'POST',
        headers: { token: LUXAND_TOKEN },
        body: simForm,
      });
      const simData = await simRes.json();

      // Liveness check
      const liveForm = new FormData();
      liveForm.append('photo', {
        uri: selfieAsset.uri,
        type: 'image/jpeg',
        name: 'selfie.jpg',
      } as any);
      const liveRes = await fetch(
        'https://api.luxand.cloud/photo/liveness/v2',
        { method: 'POST', headers: { token: LUXAND_TOKEN }, body: liveForm },
      );
      const liveData = await liveRes.json();

      const failed = simData.similarity < 0.8 || !liveData.live;
      if (failed && attempt < MAX_ATTEMPTS) {
        setSelfieAttempts(attempt);
        setIdImages(prev => ({ ...prev, selfie: null }));
        Toast.show({
          type: 'error',
          text1: 'Selfie verification failed. Try again.',
        });
        return false;
      }

      if (!failed)
        Toast.show({ type: 'success', text1: 'Selfie verified successfully.' });
      else
        Toast.show({
          type: 'info',
          text1: 'Face not matched after 2 attempts, proceeding.',
        });

      setSelfieAttempts(0);
      return true;
    } catch (err) {
      console.error(err);
      setIdImages(prev => ({ ...prev, selfie: null }));
      setSelfieAttempts(0);
      Toast.show({ type: 'error', text1: 'Selfie verification failed.' });
      return false;
    }
  };

  return (
    <Container contentContainerStyle={{ alignItems: 'center' }}>
      <SectionTitle>Please Upload Your Documents</SectionTitle>

      {/* ID Front */}
      <UploadButton onPress={() => pickImage('idFront')}>
        <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
        <UploadButtonText>Upload ID Front</UploadButtonText>
        {idImages.idFront && (
          <SelectedIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </UploadButton>
      {idImages.idFront && <PreviewImage source={{ uri: idImages.idFront }} />}

      {/* ID Back */}
      {!isPassport && (
        <>
          <UploadButton onPress={() => pickImage('idBack')}>
            <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
            <UploadButtonText>Upload ID Back</UploadButtonText>
            {idImages.idBack && (
              <SelectedIcon
                style={{ position: 'absolute', right: 12, top: 10 }}
              />
            )}
          </UploadButton>
          {idImages.idBack && (
            <PreviewImage source={{ uri: idImages.idBack }} />
          )}
        </>
      )}

      {/* Selfie */}
      <UploadButton onPress={() => pickImage('selfie')}>
        <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
        <UploadButtonText>Upload Selfie</UploadButtonText>
        {idImages.selfie && (
          <SelectedIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </UploadButton>
      {idImages.selfie && (
        <PreviewImage source={{ uri: idImages.selfie }} small />
      )}
    </Container>
  );
};

export default IDDetailsComponentSec;
