import React, { useState, useEffect } from 'react';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {
  Container,
  SectionTitle,
  UploadButton,
  UploadButtonText,
  PreviewImage,
} from './style';
import { IdCardIcon } from '../../Assets/images/SVG';

interface IDDetailsProps {
  idType: number;
  onUpload?: (
    type: 'idFront' | 'idBack' | 'selfie',
    base64: string,
    data: any,
  ) => void;
  idFrontPath?: string;
  idBackPath?: string;
  setParentLoader?: (loading: boolean) => void;
  onLivenessChecked?: (data: any) => void;
}

interface IDImages {
  idFront: string | null;
  idBack: string | null;
  selfie: string | null;
}

const IDDetailsComponentSec: React.FC<IDDetailsProps> = ({
  idType,
  onUpload,
  idFrontPath,
  idBackPath,
  setParentLoader,
}) => {
  const [idImages, setIdImages] = useState<IDImages>({
    idFront: idFrontPath || null,
    idBack: idBackPath || null,
    selfie: null,
  });

  useEffect(() => {
    setIdImages({
      idFront: idFrontPath || null,
      idBack: idBackPath || null,
      selfie: null,
    });
  }, [idFrontPath, idBackPath]);

  const pickImage = async (type: 'idFront' | 'idBack' | 'selfie') => {
    try {
      if (setParentLoader) setParentLoader(true);

      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      if (result.didCancel || !result.assets || result.assets.length === 0)
        return;

      const asset: Asset = result.assets[0];
      const base64Image = asset.base64
        ? `data:${asset.type};base64,${asset.base64}`
        : null;

      if (!base64Image) {
        Toast.show({ type: 'error', text1: 'Failed to read image.' });
        return;
      }

      if (type === 'idFront') {
        await runFaceDetection(asset.uri!, base64Image);
      } else if (type === 'selfie') {
        await checkSelfieMatch(base64Image);
      } else {
        setIdImages(prev => ({ ...prev, [type]: base64Image }));
        onUpload && onUpload(type, base64Image, null);
      }
    } catch (error) {
      console.error('Image pick error:', error);
      Toast.show({ type: 'error', text1: 'Image selection failed.' });
    } finally {
      if (setParentLoader) setParentLoader(false);
    }
  };

  const runFaceDetection = async (uri: string, base64: string) => {
    try {
      const data = new FormData();
      data.append('photo', {
        uri,
        type: 'image/jpeg',
        name: 'idFront.jpg',
      } as any);

      const response = await fetch('https://api.luxand.cloud/photo/landmarks', {
        method: 'POST',
        headers: { token: 'd8c4c17021224d80a82713129a62702e' },
        body: data,
      });

      const json = await response.json();

      if (json.landmarks?.length > 0) {
        setIdImages(prev => ({ ...prev, idFront: base64 }));
        onUpload && onUpload('idFront', base64, json);
        Toast.show({
          type: 'success',
          text1: 'ID Front uploaded successfully',
        });
      } else {
        setIdImages(prev => ({ ...prev, idFront: null }));
        Toast.show({
          type: 'error',
          text1: 'No face detected. Upload a valid ID Front.',
        });
      }
    } catch (error) {
      console.error('Face detection error:', error);
      setIdImages(prev => ({ ...prev, idFront: null }));
      Toast.show({ type: 'error', text1: 'Face detection failed.' });
    }
  };

  const checkSelfieMatch = async (base64Selfie: string) => {
    if (!idImages.idFront) {
      Toast.show({ type: 'error', text1: 'Upload ID Front first.' });
      return;
    }

    setIdImages(prev => ({ ...prev, selfie: base64Selfie }));
    onUpload && onUpload('selfie', base64Selfie, null);
    Toast.show({ type: 'success', text1: 'Selfie uploaded successfully' });
  };
  const isPassport = idType === 'passport';

  return (
    <Container>
      <SectionTitle>Please Upload the Following Documents</SectionTitle>

      {/* ID Front */}
      <UploadButton onPress={() => pickImage('idFront')}>
        <IdCardIcon width={20} height={20} />
        <UploadButtonText>Upload ID Front</UploadButtonText>
        {idImages.idFront && (
          <IdCardIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </UploadButton>
      {idImages.idFront && <PreviewImage source={{ uri: idImages.idFront }} />}

      {/* ID Back */}
      {!isPassport && (
        <>
          <UploadButton onPress={() => pickImage('idBack')}>
            <IdCardIcon width={20} height={20} />
            <UploadButtonText>Upload ID Back</UploadButtonText>
            {idImages.idBack && (
              <IdCardIcon
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
        <IdCardIcon width={20} height={20} />
        <UploadButtonText>Upload Selfie</UploadButtonText>
        {idImages.selfie && (
          <IdCardIcon style={{ position: 'absolute', right: 12, top: 10 }} />
        )}
      </UploadButton>
      {idImages.selfie && (
        <PreviewImage source={{ uri: idImages.selfie }} small />
      )}
    </Container>
  );
};

export default IDDetailsComponentSec;
