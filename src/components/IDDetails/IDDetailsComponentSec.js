import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';
import { ReactComponent as IdCardIcon } from '../../assets/images/SVG/directbox-send.svg';
import { ReactComponent as SelectedIcon } from '../../assets/images/SVG/tick-circle.svg';

const Input = styled('input')({ display: 'none' });

const IDDetailsComponent = ({
  idType,
  onUpload,
  idFrontPath,
  idBackPath,
  setParentLoader,
  onLivenessResult,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [idImages, setIdImages] = useState({
    idFront: null,
    idBack: null,
    selfie: null,
  });
  const [selectedIDFrontImage, setSelectedIDFrontImage] = useState(null);
  const [selfieAttempts, setSelfieAttempts] = useState(0);

  useEffect(() => {
    setIdImages({
      idFront: idFrontPath || null,
      idBack: idBackPath || null,
      selfie: null,
    });
  }, [idFrontPath, idBackPath]);

  // ---------------- Helper: Face Detection ----------------
  const runFaceDetection = async file => {
    setParentLoader && setParentLoader(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const res = await fetch('https://api.luxand.cloud/photo/landmarks', {
        method: 'POST',
        headers: { token: 'd8c4c17021224d80a82713129a62702e' },
        body: formData,
      });
      const data = await res.json();
      return data.landmarks?.length > 0;
    } catch {
      return false;
    } finally {
      setParentLoader && setParentLoader(false);
    }
  };

  // ---------------- Image Upload (ID Front / ID Back) ----------------
  // const handleImageUpload = async (type, e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   setParentLoader && setParentLoader(true);

  //   try {
  //     const reader = new FileReader();
  //     reader.onloadend = async () => {
  //       const base64Image = reader.result;
  //       const base64String = base64Image.split(',')[1];

  //       // Crop image via server
  //       const cropRes = await fetch('https://amlhlep.com:44317/IMG_CROP', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ base64String }),
  //       });
  //       const cropData = await cropRes.json();
  //       const finalBase64Image = cropData?.cropped_image
  //         ? `data:image/png;base64,${cropData.cropped_image}`
  //         : base64Image;

  //       // Face detection: ID Front required
  //       if (type === 'idFront') {
  //         const faceDetected = await runFaceDetection(file);
  //         if (!faceDetected) {
  //           toast.error('No face detected. Please upload a valid ID Front.');
  //           return;
  //         }
  //       }

  //       setIdImages(prev => ({ ...prev, [type]: finalBase64Image }));
  //       if (type === 'idFront') setSelectedIDFrontImage(file);

  //       onUpload && onUpload(type, finalBase64Image, null);
  //       toast.success(
  //         type === 'idFront'
  //           ? 'ID Front uploaded successfully'
  //           : type === 'idBack'
  //           ? 'ID Back uploaded successfully'
  //           : 'Selfie uploaded successfully',
  //       );
  //     };
  //     reader.readAsDataURL(file);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err.message || 'Upload failed');
  //   } finally {
  //     setParentLoader && setParentLoader(false);
  //     e.target.value = '';
  //   }
  // };

  // ---------------- Selfie Upload ----------------
  const readFileAsDataURL = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (type, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setParentLoader && setParentLoader(true);

    try {
      const base64Image = await readFileAsDataURL(file);
      const base64String = base64Image.split(',')[1];

      const cropRes = await fetch('https://amlhlep.com:44317/IMG_CROP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64String }),
      });
      const cropData = await cropRes.json();
      const finalBase64Image = cropData?.cropped_image
        ? `data:image/png;base64,${cropData.cropped_image}`
        : base64Image;

      if (type === 'idFront') {
        const faceDetected = await runFaceDetection(file);
        if (!faceDetected) {
          toast.error('No face detected. Please upload a valid ID Front.');
          return;
        }
        setSelectedIDFrontImage(file);
      }

      setIdImages(prev => ({ ...prev, [type]: finalBase64Image }));
      onUpload && onUpload(type, finalBase64Image, null);
      toast.success(
        type === 'idFront'
          ? 'ID Front uploaded successfully'
          : type === 'idBack'
          ? 'ID Back uploaded successfully'
          : 'Selfie uploaded successfully',
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Upload failed');
    } finally {
      setParentLoader && setParentLoader(false);
      e.target.value = '';
    }
  };

  const handleSelfieUpload = async file => {
    if (
      !idImages.idFront ||
      ((idType === 4 || idType === 7) && !idImages.idBack)
    ) {
      toast.error('Please upload required ID documents first.');
      return;
    }

    const MAX_ATTEMPTS = 2;
    const attempt = selfieAttempts + 1;
    setParentLoader && setParentLoader(true);

    try {
      // Face detection
      const faceDetected = await runFaceDetection(file);
      if (!faceDetected) {
        toast.error('No face detected in selfie. Please try again.');
        return;
      }

      // Liveness check
      const livenessForm = new FormData();
      livenessForm.append('photo', file);
      const livenessRes = await fetch(
        'https://api.luxand.cloud/photo/liveness/v2',
        {
          method: 'POST',
          headers: { token: 'd8c4c17021224d80a82713129a62702e' },
          body: livenessForm,
        },
      );
      const liveness = await livenessRes.json();
      onLivenessResult && onLivenessResult(liveness);

      const failedLiveness =
        liveness.status !== 'success' || liveness.result === 'fake';
      if (failedLiveness && attempt < MAX_ATTEMPTS) {
        setSelfieAttempts(attempt);
        toast.error('Liveness check failed. Try again.');
        return;
      }

      // Face match
      if (!selectedIDFrontImage) {
        toast.error('ID Front required for face match.');
        return;
      }

      const matchForm = new FormData();
      matchForm.append('face1', selectedIDFrontImage);
      matchForm.append('face2', file);
      matchForm.append('threshold', '0.8');

      const matchRes = await fetch(
        'https://api.luxand.cloud/photo/similarity',
        {
          method: 'POST',
          headers: { token: 'd8c4c17021224d80a82713129a62702e' },
          body: matchForm,
        },
      );
      const matchData = await matchRes.json();
      const isMatched = matchData.similar === true;

      const base64Selfie = await readFileAsDataURL(file);
      if (isMatched || attempt >= MAX_ATTEMPTS) {
        setIdImages(prev => ({ ...prev, selfie: base64Selfie }));
        onUpload && onUpload('selfie', base64Selfie, { matchData, liveness });
        toast.success('Selfie uploaded successfully');
        setSelfieAttempts(0);
      } else {
        setSelfieAttempts(attempt);
        toast.error('Face does not match ID Front. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Selfie verification failed.');
    } finally {
      setParentLoader && setParentLoader(false);
    }
  };

  const renderImage = (src, alt, size = 300) => (
    <Box sx={{ mt: 2 }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: isMobile ? size * 0.8 : size,
          height: isMobile ? 180 * 0.8 : 180,
          objectFit: 'cover',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '10px',
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ textAlign: 'center', padding: isMobile ? 2 : 4 }}>
      <Typography variant="h5" sx={{ fontSize: '14px', color: 'white', mb: 1 }}>
        Please Upload Following Documents
      </Typography>

      <Stack direction="column" marginTop={3} spacing={2} alignItems="center">
        {/* ID Front */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Input
            id="idFront"
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload('idFront', e)}
          />
          <Button
            variant="contained"
            component="label"
            htmlFor="idFront"
            startIcon={<IdCardIcon />}
            sx={{
              backgroundColor: '#2A4738D1',
              border: '1px solid #FEFEFE12',
              color: '#FFFFFF',
              height: '40px',
              width: '258px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              position: 'relative',
              textTransform: 'none',
            }}
          >
            Upload ID Front
            {idImages.idFront && (
              <SelectedIcon
                sx={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </Button>
          {idImages.idFront && renderImage(idImages.idFront, 'ID Front')}
        </Box>

        {/* ID Back */}
        {(idType === 4 || idType === 7) && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Input
              id="idBack"
              type="file"
              accept="image/*"
              onChange={e => handleImageUpload('idBack', e)}
            />
            <Button
              variant="contained"
              component="label"
              htmlFor="idBack"
              startIcon={<IdCardIcon />}
              sx={{
                backgroundColor: '#2A4738D1',
                border: '1px solid #FEFEFE12',
                color: '#FFFFFF',
                height: '40px',
                width: '258px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                position: 'relative',
                textTransform: 'none',
              }}
            >
              Upload ID Back
              {idImages.idBack && (
                <SelectedIcon
                  sx={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
            </Button>
            {idImages.idBack && renderImage(idImages.idBack, 'ID Back')}
          </Box>
        )}

        {/* Selfie */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Input
            id="selfie"
            type="file"
            accept="image/*"
            capture="user"
            onChange={e => handleSelfieUpload(e.target.files?.[0])}
          />
          <Button
            variant="contained"
            component="label"
            htmlFor="selfie"
            startIcon={<IdCardIcon />}
            sx={{
              backgroundColor: '#2A4738D1',
              border: '1px solid #FEFEFE12',
              color: '#FFFFFF',
              height: '40px',
              width: '258px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              position: 'relative',
              textTransform: 'none',
            }}
          >
            Upload Selfiessss
            {idImages.selfie && (
              <SelectedIcon
                sx={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </Button>
          {idImages.selfie && renderImage(idImages.selfie, 'Selfie', 150)}
        </Box>
      </Stack>
    </Box>
  );
};

export default IDDetailsComponent;
