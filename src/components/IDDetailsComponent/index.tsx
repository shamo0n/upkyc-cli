import React, { useState } from 'react';
import { ScrollView, Platform, PermissionsAndroid } from 'react-native';
import styled from 'styled-components/native';
import { launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { FormDataType } from '../../types';
import { IdUploadIcon, SelectedIcon } from '../../Assets/images/SVG';

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

const SelfieImagePreview = styled.Image`
  width: 160px;
  height: 200px;
  border-radius: 8px;
  margin-top: 10px;
  border-width: 1px;
  border-color: #444;
`;

// ========== TYPES ==========
type LivenessResult = { isAlive?: boolean; score?: number };

type IDDetailsProps = {
  idType: string | number | null;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onUpload?: (
    type: keyof FormDataType,
    data: { uri: string; base64: string },
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
  const [idImages, setIdImages] = useState<{
    idFront: string | null;
    idBack: string | null;
    selfie: string | null;
    idFrontUri?: string; // real URI for API upload
  }>({
    idFront: formData?.idFront?.base64 || null,
    idBack: formData?.idBack?.base64 || null,
    selfie: formData?.selfie?.base64 || null,
    idFrontUri: formData?.idFront?.uri || undefined,
  });

  const [selfieAttempts, setSelfieAttempts] = useState(0);
  const MAX_ATTEMPTS = 2;
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

  const pickImage = async (type: 'idFront' | 'idBack' | 'selfie') => {
    console.log(`[PickImage] Starting for ${type}`);

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Toast.show({ type: 'error', text1: 'Camera permission denied' });
      return;
    }

    try {
      setParentLoader?.(true);
      console.log('[PickImage] Launching camera...');

      const result = await launchCamera({
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.8,
        saveToPhotos: false,
      });

      if (result.didCancel || !result.assets?.length) {
        console.log('[PickImage] Cancelled or no image selected');
        return;
      }

      const asset = result.assets[0];
      if (!asset.base64) throw new Error('Base64 data missing from camera');

      const mimeType = asset.type || 'image/jpeg';
      const base64Full = `data:${mimeType};base64,${asset.base64}`;
      const cleanBase64 = asset.base64;

      let finalBase64 = base64Full;

      // --- Crop API fallback ---
      if (type === 'idFront' || type === 'idBack') {
        try {
          const cropResponse = await fetch(
            'https://liveexshield.ca:2020/IMG_CROP',
            // 'https://amlhlep.com:44317//IMG_CROP',

            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ base64String: cleanBase64 }),
            },
          );

          if (cropResponse.ok) {
            const cropData = await cropResponse.json();
            if (cropData?.cropped_image) {
              finalBase64 = `data:image/png;base64,${cropData.cropped_image}`;
              console.log('[PickImage] Cropping successful');
            } else {
              console.warn(
                '[PickImage] Crop API returned empty, using original image',
              );
            }
          } else {
            console.warn('[PickImage] Crop API failed, using original image');
          }
        } catch (err) {
          console.warn('[PickImage] Crop API error, using original image', err);
        }
      }

      // --- Face detection (ID Front / Selfie) ---
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
              headers: { token: 'd8c4c17021224d80a82713129a62702e' },
              body: formData,
            },
          );
          const faceJson = await faceRes.json();
          if (!faceJson?.landmarks?.length) {
            Toast.show({
              type: 'error',
              text1: 'No face detected. Please try again.',
            });
            setIdImages(prev => ({ ...prev, [type]: null }));
            setFormData(prev => ({ ...prev, [type]: null }));
            return;
          }
        } catch (err) {
          console.warn(
            '[PickImage] Face detection error, continuing anyway',
            err,
          );
        }
      }

      if (type === 'selfie') {
        const idFrontBase64 =
          idImages.idFront?.split(',')[1] || formData?.idFront?.base64;

        if (!idFrontBase64) {
          Toast.show({
            type: 'error',
            text1: 'ID front image missing, please upload first.',
          });
          return;
        }

        const proceed = await verifySelfie(asset, idFrontBase64);
        if (!proceed) return;
      }

      // --- Update state and parent ---
      setIdImages(prev => ({ ...prev, [type]: finalBase64 }));
      setFormData(prev => ({
        ...prev,
        [type]: { uri: asset.uri!, base64: finalBase64 },
      }));
      onUpload?.(type, { uri: asset.uri!, base64: finalBase64 });

      Toast.show({ type: 'success', text1: `${type} uploaded successfully.` });
    } catch (err: any) {
      console.error('[PickImage] Error:', err);
      Toast.show({
        type: 'error',
        text1: err.message || 'Upload failed. Try again.',
      });
      setIdImages(prev => ({ ...prev, [type]: null }));
      setFormData(prev => ({ ...prev, [type]: null }));
    } finally {
      setParentLoader?.(false);
    }
  };

  // ========== SELFIE VERIFICATION ==========
  const verifySelfie = async (selfieAsset: any, idFrontBase64: string) => {
    const attempt = selfieAttempts + 1;
    try {
      // --- Similarity API ---
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
        headers: { token: 'd8c4c17021224d80a82713129a62702e' },
        body: simForm,
      });
      const simData = await simRes.json();

      // --- Liveness API ---
      const liveForm = new FormData();
      liveForm.append('photo', {
        uri: selfieAsset.uri,
        type: 'image/jpeg',
        name: 'selfie.jpg',
      } as any);

      const liveRes = await fetch(
        'https://api.luxand.cloud/photo/liveness/v2',
        {
          method: 'POST',
          headers: { token: 'd8c4c17021224d80a82713129a62702e' },
          body: liveForm,
        },
      );
      const liveData = await liveRes.json();
      console.log('liveData', liveData);
      const failed = simData.similarity < 0.8 || !liveData.live;

      if (failed && attempt < MAX_ATTEMPTS) {
        setSelfieAttempts(attempt);
        setIdImages(prev => ({ ...prev, selfie: null }));
        setFormData(prev => ({ ...prev, selfie: null }));
        Toast.show({
          type: 'error',
          text1: 'Liveness check failed. Try again.',
        });
        return false;
      }

      if (!failed)
        Toast.show({ type: 'success', text1: 'Selfie verified successfully.' });
      else
        Toast.show({
          type: 'info',
          text1: '⚠️ Face not matched after 2 attempts, proceeding anyway.',
        });

      setSelfieAttempts(0);
      return true;
    } catch (err: any) {
      console.error('[verifySelfie]', err);
      setIdImages(prev => ({ ...prev, selfie: null }));
      setFormData(prev => ({ ...prev, selfie: null }));
      setSelfieAttempts(0);
      Toast.show({
        type: 'error',
        text1: err.message || 'Selfie verification failed.',
      });
      return false;
    }
  };

  // ========== UI ==========
  return (
    <Container contentContainerStyle={{ alignItems: 'center' }}>
      <Title>Please Upload Your Documents</Title>

      <Button onPress={() => pickImage('idFront')}>
        <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
        <ButtonText>Upload ID Front</ButtonText>
        {idImages.idFront && (
          <SelectedIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </Button>
      {idImages.idFront && <ImagePreview source={{ uri: idImages.idFront }} />}

      {!isPassport && (
        <>
          <Button onPress={() => pickImage('idBack')}>
            <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
            <ButtonText>Upload ID Back</ButtonText>
            {idImages.idBack && (
              <SelectedIcon
                style={{ position: 'absolute', right: 12, top: 10 }}
              />
            )}
          </Button>
          {idImages.idBack && (
            <ImagePreview source={{ uri: idImages.idBack }} />
          )}
        </>
      )}

      <Button onPress={() => pickImage('selfie')}>
        <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
        <ButtonText>Upload Selfie</ButtonText>
        {idImages.selfie && (
          <SelectedIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </Button>

      {idImages.selfie && (
        <SelfieImagePreview source={{ uri: idImages.selfie }} />
      )}
    </Container>
  );
};

export default IDDetailsComponent;
