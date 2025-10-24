import React, { useEffect, useRef, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import { IdUploadIcon, SelectedIcon } from '../../Assets/images/SVG';
import { Camera } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';

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
  width: 258px;
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
  idFrontNew: string | null;
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
    idFrontNew: null,
  });

  const [selfieAttempts, setSelfieAttempts] = useState(0);
  const cameraRef = useRef<Camera | null>(null);
  const navigation = useNavigation();

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

  const pickImageFromPath = async (
    type: 'idFront' | 'idBack' | 'selfie',
    uri: string,
    base64data: string,
  ) => {
    console.log(`[pickImageFromPath] START - type: ${type}`);
    console.log('[pickImageFromPath] URI:', uri);

    try {
      setParentLoader?.(true);

      const finalBase64 = `data:image/jpeg;base64,${base64data}`;

      let idFrontLocalUri: string | undefined;
      if (type === 'selfie' && idImages.idFront) {
        try {
          const url = idImages.idFront.startsWith('data:')
            ? null
            : idImages.idFront;
          if (url) {
            const filename = 'idFront.jpg';
            const path = `${RNFS.CachesDirectoryPath}/${filename}`;
            await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
            idFrontLocalUri = `file://${path}`;
          } else {
            idFrontLocalUri = uri;
          }
        } catch (err) {
          console.error(
            '[pickImageFromPath] Failed to download ID Front:',
            err,
          );
          Toast.show({ type: 'error', text1: 'Failed to get ID Front.' });
          navigation.goBack();
          return;
        }
      }

      if (type === 'idFront' || type === 'selfie') {
        console.log(`[pickImageFromPath] Face detection for ${type}...`);
        try {
          const formData = new FormData();
          formData.append('photo', {
            uri,
            type: 'image/jpeg',
            name: `${type}.jpg`,
          } as any);

          const res = await fetch('https://api.luxand.cloud/photo/landmarks', {
            method: 'POST',
            headers: { token: LUXAND_TOKEN },
            body: formData,
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          if (!data?.landmarks?.length) {
            Toast.show({
              type: 'error',
              text1: 'No face detected. Retake photo.',
            });
            setIdImages(prev => ({ ...prev, [type]: null }));
            navigation.goBack();
            return;
          }
        } catch (err) {
          console.error('[pickImageFromPath] Face detection error:', err);
          Toast.show({ type: 'error', text1: 'Face detection failed.' });
          setIdImages(prev => ({ ...prev, [type]: null }));
          navigation.goBack();
          return;
        }
      }

      if (type === 'selfie') {
        console.log('[pickImageFromPath] Starting selfie verification...');
        const success = await verifySelfie(
          { uri, base64: base64data },
          idFrontLocalUri!,
        );
        if (!success) {
          // Selfie failed → clear state & go back
          setIdImages(prev => ({ ...prev, selfie: null }));
          navigation.goBack();
          return false;
        }
      }

      // Save captured image if everything passed
      setIdImages(prev => ({ ...prev, [type]: finalBase64 }));
      onUpload?.(type, { uri, base64: finalBase64 });
      Toast.show({ type: 'success', text1: `${type} uploaded successfully.` });
      return true;
    } catch (err) {
      console.error('[pickImageFromPath] ERROR:', err);
      Toast.show({ type: 'error', text1: 'Upload failed. Try again.' });
      setIdImages(prev => ({ ...prev, [type]: null }));
      navigation.goBack();
    } finally {
      console.log('[pickImageFromPath] END');
      setParentLoader?.(false);
    }
  };

  // ================= VERIFY SELFIE =================
  const verifySelfie = async (
    selfieAsset: { uri: string; base64: string },
    idFrontLocalUri: string,
  ) => {
    try {
      console.log('[verifySelfie] Verifying selfie...');

      const formData = new FormData();
      formData.append('face1', {
        uri: idFrontLocalUri,
        type: 'image/jpeg',
        name: 'idFront.jpg',
      } as any);
      formData.append('face2', {
        uri: selfieAsset.uri,
        type: 'image/jpeg',
        name: 'selfie.jpg',
      } as any);
      formData.append('threshold', '0.8');

      const res = await fetch('https://api.luxand.cloud/photo/similarity', {
        method: 'POST',
        headers: { token: LUXAND_TOKEN },
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log('[verifySelfie] Similarity response:', data);

      if (!data?.similar || data.score < 0.75) {
        Toast.show({
          type: 'error',
          text1: 'Selfie does not match your ID Front.',
        });
        return false;
      }

      // Liveness check
      const liveForm = new FormData();
      liveForm.append('photo', {
        uri: selfieAsset.uri,
        type: 'image/jpeg',
        name: 'selfie.jpg',
      } as any);
      const liveRes = await fetch('https://api.luxand.cloud/photo/liveness', {
        method: 'POST',
        headers: { token: LUXAND_TOKEN },
        body: liveForm,
      });
      const liveData = await liveRes.json();
      console.log('[verifySelfie] Liveness response:', liveData);

      if (liveData?.status !== 'success' || liveData?.liveness_score < 0.7) {
        Toast.show({ type: 'error', text1: 'Liveness check failed.' });
        return false;
      }

      console.log('[verifySelfie] ✅ Selfie verified.');
      return true;
    } catch (err) {
      console.error('[verifySelfie] ERROR:', err);
      Toast.show({ type: 'error', text1: 'Selfie verification failed.' });
      return false;
    }
  };
  return (
    <Container contentContainerStyle={{ alignItems: 'center' }}>
      <SectionTitle>Please Upload Your Documents</SectionTitle>
      {/* ID Front */}
      <UploadButton
        onPress={() => {
          console.log('[UploadButton] Pressed for ID Front upload');
          navigation.navigate('IDFrontCamera', {
            onReturn: async (photoPath: string) => {
              console.log('[IDFrontCamera onReturn] Photo path:', photoPath);

              const uri =
                Platform.OS === 'android' ? `file://${photoPath}` : photoPath;
              console.log('[IDFrontCamera onReturn] Converted URI:', uri);

              try {
                setParentLoader?.(true);
                console.log('[IDFrontCamera onReturn] Fetching image blob...');
                const response = await fetch(uri);
                const blob = await response.blob();

                console.log('[IDFrontCamera onReturn] Converting to base64...');
                const base64data = await new Promise<string>(
                  (resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64 = (reader.result as string).split(',')[1];
                      console.log(
                        '[IDFrontCamera onReturn] Base64 conversion success. Length:',
                        base64.length,
                      );
                      resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                  },
                );

                console.log(
                  '[IDFrontCamera onReturn] Calling pickImageFromPath...',
                );
                await pickImageFromPath('idFront', uri, base64data);
                console.log(
                  '[IDFrontCamera onReturn] pickImageFromPath completed.',
                );
              } catch (err) {
                console.error('[IDFrontCamera onReturn] ERROR:', err);
                Toast.show({
                  type: 'error',
                  text1: 'Failed to process captured image.',
                });
              } finally {
                console.log('[IDFrontCamera onReturn] Finished process.');
                setParentLoader?.(false);
              }
            },
          });
        }}
      >
        <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
        <UploadButtonText>Upload ID Front</UploadButtonText>
        {(idImages.idFrontNew || idImages.idFront) && (
          <SelectedIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </UploadButton>

      {/* {idImages.idFront && <PreviewImage source={{ uri: idImages.idFront }} />} */}
      {(idImages.idFrontNew || idImages.idFront) && (
        <PreviewImage
          source={{ uri: idImages.idFrontNew || idImages.idFront }}
        />
      )}

      {/* ID Back */}
      {!isPassport && (
        <>
          <UploadButton
            onPress={() => {
              console.log('[UploadButton] Pressed for ID Back upload');
              navigation.navigate('IDBackCamera', {
                onReturn: async (photoPath: string) => {
                  console.log('[IDBackCamera onReturn] Photo path:', photoPath);

                  const uri =
                    Platform.OS === 'android'
                      ? `file://${photoPath}`
                      : photoPath;
                  console.log('[IDBackCamera onReturn] Converted URI:', uri);

                  try {
                    setParentLoader?.(true);
                    console.log(
                      '[IDBackCamera onReturn] Fetching image blob...',
                    );
                    const response = await fetch(uri);
                    const blob = await response.blob();

                    console.log(
                      '[IDBackCamera onReturn] Converting to base64...',
                    );
                    const base64data = await new Promise<string>(
                      (resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64 = (reader.result as string).split(
                            ',',
                          )[1];
                          console.log(
                            '[IDBackCamera onReturn] Base64 conversion success. Length:',
                            base64.length,
                          );
                          resolve(base64);
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                      },
                    );

                    console.log(
                      '[IDBackCamera onReturn] Calling pickImageFromPath...',
                    );
                    await pickImageFromPath('idBack', uri, base64data);
                    console.log(
                      '[IDBackCamera onReturn] pickImageFromPath completed.',
                    );
                  } catch (err) {
                    console.error('[IDBackCamera onReturn] ERROR:', err);
                    Toast.show({
                      type: 'error',
                      text1: 'Failed to process captured image.',
                    });
                  } finally {
                    console.log('[IDBackCamera onReturn] Finished process.');
                    setParentLoader?.(false);
                  }
                },
              });
            }}
          >
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
      <UploadButton
        onPress={async () => {
          console.log('[UploadButton] Pressed for Selfie upload');

          const hasPermission = await requestCameraPermission();
          if (!hasPermission) {
            Toast.show({
              type: 'error',
              text1: 'Camera permission is required.',
            });
            return;
          }
          navigation.navigate('SelfieCamera', {
            label: 'Take a clear selfie for verification',
            onSelfieTaken: async (
              photoPath: string,
              updateStep?: (step: string) => void, // 👈 add this argument
            ) => {
              const uri =
                Platform.OS === 'android' ? `file://${photoPath}` : photoPath;

              try {
                setParentLoader?.(true);
                updateStep?.('Processing image...');

                // 1️⃣ Download as blob
                const response = await fetch(uri);
                const blob = await response.blob();

                // 2️⃣ Convert blob → base64
                updateStep?.('Converting to base64...');
                const base64data = await new Promise<string>(
                  (resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64 = (reader.result as string).split(',')[1];
                      resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                  },
                );

                // 3️⃣ Run face verification
                updateStep?.('Starting face detection...');
                const success = await pickImageFromPath(
                  'selfie',
                  uri,
                  base64data,
                );

                if (success) {
                  updateStep?.('✅ Face verified successfully!');
                  setIdImages(prev => ({ ...prev, selfie: uri }));
                } else {
                  updateStep?.('❌ Face verification failed. Try again.');
                  Toast.show({
                    type: 'error',
                    text1: 'Selfie does not match ID. Please retake.',
                  });
                }

                return success;
              } catch (err) {
                console.error('[SelfieCamera onReturn] ERROR:', err);
                Toast.show({
                  type: 'error',
                  text1: 'Failed to process selfie image.',
                });
                updateStep?.('Error processing selfie.');
                return false;
              } finally {
                setParentLoader?.(false);
              }
            },
          });
        }}
      >
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
