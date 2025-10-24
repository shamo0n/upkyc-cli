import React, { useState } from 'react';
import { ScrollView, Platform, PermissionsAndroid } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { IdUploadIcon, SelectedIcon } from '../../Assets/images/SVG';
import { useNavigation } from '@react-navigation/native';

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

// ========== TYPES & PROPS ==========
type UploadCallback = (
  type: 'idFront' | 'idBack' | 'selfie',
  data: { uri: string; base64: string },
  faceData?: any,
) => void;

const LUXAND_TOKEN = 'd8c4c17021224d80a82713129a62702e';

const IDDetailsComponent = ({
  setParentLoader,
  currentStep,
  setCurrentStep,
  onUpload,
}: {
  setParentLoader?: (v: boolean) => void;
  currentStep?: number;
  setCurrentStep?: (step: number) => void;
  onUpload?: UploadCallback;
}) => {
  const [idImages, setIdImages] = useState({
    idFront: null as string | null,
    idBack: null as string | null,
    selfie: null as string | null,
  });
  const [selfieAttempts, setSelfieAttempts] = useState(0);
  const navigation = useNavigation();

  // ========== PERMISSIONS ==========
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

  // ========== URI -> base64 ==========
  const uriToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // ========== VERIFY SELFIE (returns details - does NOT touch UI/navigation) ==========
  const verifySelfie = async (selfieUri: string, idFrontUri: string) => {
    // returns { similar: boolean, score?: number, livenessPassed: boolean, livenessScore?: number }
    const result = {
      similar: false,
      score: 0,
      livenessPassed: false,
      livenessScore: 0,
    };

    try {
      console.log('[verifySelfie] similarity check -', idFrontUri, selfieUri);

      const simForm = new FormData();
      simForm.append('face1', {
        uri: idFrontUri,
        type: 'image/jpeg',
        name: 'idFront.jpg',
      } as any);
      simForm.append('face2', {
        uri: selfieUri,
        type: 'image/jpeg',
        name: 'selfie.jpg',
      } as any);

      const simRes = await fetch('https://api.luxand.cloud/photo/similarity', {
        method: 'POST',
        headers: { token: LUXAND_TOKEN },
        body: simForm,
      });
      const simData = await simRes.json();
      console.log('[verifySelfie] Similarity response:', simData);
      result.similar = !!simData?.similar;
      result.score = Number(simData?.score || 0);

      // If similarity is very low we can skip liveness call, but we still run it if you want both checks always
      // Run liveness only when similarity passes threshold OR optionally always
      const liveForm = new FormData();
      liveForm.append('photo', {
        uri: selfieUri,
        type: 'image/jpeg',
        name: 'selfie.jpg',
      } as any);

      const liveRes = await fetch(
        'https://api.luxand.cloud/photo/liveness/v2',
        {
          method: 'POST',
          headers: { token: LUXAND_TOKEN },
          body: liveForm,
        },
      );
      const liveData = await liveRes.json();
      console.log('[verifySelfie] Liveness response:', liveData);
      result.livenessPassed = liveData?.status === 'success';
      result.livenessScore = Number(liveData?.liveness_score || 0);

      return result;
    } catch (err) {
      console.error('[verifySelfie] ERROR', err);
      // Return conservative failure result
      return result;
    }
  };

  // ========== pickImageFromPath - returns boolean (success) ==========
  const pickImageFromPath = async (
    type: 'idFront' | 'idBack' | 'selfie',
    uri: string,
    base64: string,
    updateStep?: (s: string) => void,
  ): Promise<boolean> => {
    try {
      setParentLoader?.(true);
      console.log(`[pickImageFromPath] Type=${type} URI=${uri}`);

      // --- ID front/back: just set + notify parent (no extra checks here) ---
      if (type === 'idFront' || type === 'idBack') {
        setIdImages(prev => ({ ...prev, [type]: uri }));
        if (typeof onUpload === 'function') {
          onUpload(type, { uri, base64: `data:image/jpeg;base64,${base64}` });
        }
        Toast.show({
          type: 'success',
          text1: `${type} uploaded successfully.`,
        });
        return true;
      }

      // --- SELFIE: do verification logic & upload conditionally ---
      if (type === 'selfie') {
        // if ID front not present -> show message and abort
        const idFrontUri = idImages.idFront;
        if (!idFrontUri) {
          Toast.show({
            type: 'error',
            text1: 'Please capture/upload ID front before taking selfie.',
          });
          return false;
        }

        // first attempt: run checks
        if (selfieAttempts === 0) {
          updateStep?.('Running face similarity and liveness checks...');
          const v = await verifySelfie(uri, idFrontUri);
          console.log('[pickImageFromPath] verifySelfie result:', v);

          const SIM_THRESHOLD = 0.75;
          const LIVENESS_THRESHOLD = 0.7;

          const simOk = v.similar && v.score >= SIM_THRESHOLD;
          const liveOk =
            v.livenessPassed && v.livenessScore >= LIVENESS_THRESHOLD;

          if (simOk && liveOk) {
            // Passed both checks - upload
            setIdImages(prev => ({ ...prev, selfie: uri }));
            if (typeof onUpload === 'function') {
              onUpload(
                'selfie',
                { uri, base64: `data:image/jpeg;base64,${base64}` },
                {
                  score: v.score,
                  livenessScore: v.livenessScore,
                  similar: v.similar,
                  livenessPassed: v.livenessPassed,
                },
              );
            }
            Toast.show({
              type: 'success',
              text1: 'Selfie verified and uploaded.',
            });
            setSelfieAttempts(0);
            // optionally advance step in parent when selfie is uploaded
            setCurrentStep?.(
              typeof currentStep === 'number' ? currentStep + 1 : undefined,
            );
            return true;
          }

          // If either check failed -> don't upload yet, increment attempt and return false so camera stays for retry
          setSelfieAttempts(1);
          let reason = 'Selfie verification failed.';
          if (!simOk && !liveOk)
            reason = 'Face not matched and liveness failed.';
          else if (!simOk) reason = 'Face does not match ID front.';
          else reason = 'Liveness check failed.';

          Toast.show({
            type: 'error',
            text1: reason,
            text2:
              'Please retake your selfie. Second attempt will be accepted.',
          });

          // return false -> SelfieCamera will keep camera open for retry
          return false;
        }

        // second attempt: accept and upload regardless of checks
        if (selfieAttempts >= 1) {
          setIdImages(prev => ({ ...prev, selfie: uri }));
          if (typeof onUpload === 'function') {
            onUpload(
              'selfie',
              { uri, base64: `data:image/jpeg;base64,${base64}` },
              undefined,
            );
          }
          Toast.show({
            type: 'info',
            text1: 'Second attempt accepted — selfie uploaded.',
            text2:
              'If verification failed previously, the selfie is accepted manually.',
          });
          // reset attempts
          setSelfieAttempts(0);
          setCurrentStep?.(
            typeof currentStep === 'number' ? currentStep + 1 : undefined,
          );
          return true;
        }
      }

      // fallback
      return false;
    } catch (err) {
      console.error('[pickImageFromPath] ERROR', err);
      Toast.show({ type: 'error', text1: 'Failed to process image.' });
      return false;
    } finally {
      setParentLoader?.(false);
    }
  };

  // ========== NAVIGATION TO CAMERA ==========
  const navigateToCamera = (
    screen: string,
    type: 'idFront' | 'idBack' | 'selfie',
  ) => {
    if (type === 'selfie') {
      navigation.navigate('SelfieCamera', {
        onSelfieTaken: async (
          photoPath: string,
          updateStep?: (s: string) => void,
        ) => {
          try {
            setParentLoader?.(true);
            updateStep?.('Processing selfie...');
            const uri =
              Platform.OS === 'android' ? `file://${photoPath}` : photoPath;
            const base64 = await uriToBase64(uri);
            const ok = await pickImageFromPath(
              'selfie',
              uri,
              base64,
              updateStep,
            );
            // return ok to camera (SelfieCamera expects boolean)
            return ok;
          } catch (err) {
            console.error('[SelfieCamera onSelfieTaken] ERROR:', err);
            Toast.show({ type: 'error', text1: 'Selfie processing failed.' });
            return false;
          } finally {
            setParentLoader?.(false);
          }
        },
      });
    } else {
      // ID front / back cameras use onReturn convention
      navigation.navigate(screen, {
        onReturn: async (photoPath: string) => {
          try {
            setParentLoader?.(true);
            const uri =
              Platform.OS === 'android' ? `file://${photoPath}` : photoPath;
            const base64 = await uriToBase64(uri);
            await pickImageFromPath(type, uri, base64);
          } catch (err) {
            console.error(`[${type}Camera onReturn] ERROR:`, err);
            Toast.show({ type: 'error', text1: 'Error processing image.' });
          } finally {
            setParentLoader?.(false);
          }
        },
      });
    }
  };

  // ========== UI ==========
  return (
    <Container contentContainerStyle={{ alignItems: 'center' }}>
      <Title>Upload Your ID Documents</Title>

      {/* ID Front */}
      <Button onPress={() => navigateToCamera('IDFrontCamera', 'idFront')}>
        <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
        <ButtonText>Take ID Front</ButtonText>
        {idImages.idFront && (
          <SelectedIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </Button>
      {idImages.idFront && <ImagePreview source={{ uri: idImages.idFront }} />}

      {/* ID Back */}
      <Button onPress={() => navigateToCamera('IDBackCamera', 'idBack')}>
        <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
        <ButtonText>Take ID Back</ButtonText>
        {idImages.idBack && (
          <SelectedIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </Button>
      {idImages.idBack && <ImagePreview source={{ uri: idImages.idBack }} />}

      {/* Selfie */}
      <Button onPress={() => navigateToCamera('SelfieCamera', 'selfie')}>
        <IdUploadIcon style={{ marginRight: 10 }} width={20} height={20} />
        <ButtonText>Take Selfie</ButtonText>
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
