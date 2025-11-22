import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppHeader from './AppHeader';

const { width } = Dimensions.get('window');
const FRAME_WIDTH = width * 0.75;

export default function SelfieCameraScreen() {
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'front');
  const cameraRef = useRef<Camera>(null);
  const navigation = useNavigation();
  const route = useRoute();

  const [capturedPhoto, setCapturedPhoto] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState<string | null>(null); // 🆕 Added
  const [showButtons, setShowButtons] = useState(true);

  // 🔆 Animated glow
  const glowAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [glowAnim]);

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#35504255', '#00FF8855'],
  });

  // 📸 Capture photo
  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePhoto({
      flash: 'off',
      qualityPrioritization: 'quality',
      skipMetadata: true,
      orientation: 'portrait', // 👈 Forces portrait mode capture
    });
    setCapturedPhoto(photo);
  };

  // 🔁 Retake
  const retakePhoto = () => {
    setCapturedPhoto(null);
    setIsVerifying(false);
    setVerificationStep(null);
  };

  //  Save / Verify selfie
  const savePhoto = async () => {
    if (!capturedPhoto?.path) return;

    const callback = route.params?.onSelfieTaken; // expects async (photoPath, updateStep) => boolean
    if (callback && typeof callback === 'function') {
      try {
        setIsVerifying(true);
        setVerificationStep('Starting face detection...');

        // Pass our step updater to the callback
        const success = await callback(capturedPhoto.path, (step: string) =>
          setVerificationStep(step),
        );

        if (!success) {
          setVerificationStep('Verification failed ❌');
          setTimeout(() => {
            navigation.goBack(); // go back even on failure
          }, 100);
        } else {
          setVerificationStep('Verified successfully ✅');
          setShowButtons(false);
          setTimeout(() => {
            navigation.goBack(); // go back on success
          }, 100);
        }
      } catch (err) {
        console.log('[SelfieCameraScreen] Callback error:', err);
        setVerificationStep('Something went wrong ❌');
        setTimeout(() => {
          navigation.goBack(); // go back even on error
        }, 100);
      } finally {
        setIsVerifying(false);
      }
    } else {
      navigation.goBack();
    }
  };

  //  Render
  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerOverlay}>
        <AppHeader showBack={true} onBackPress={() => navigation.goBack()} />
      </View>
      {!capturedPhoto ? (
        <>
          <View style={styles.frameContainer}>
            <Camera
              ref={cameraRef}
              style={styles.cameraPreview}
              device={device}
              isActive
              photo
            />
            <Animated.View
              style={[
                styles.selfieFrame,
                { borderColor: glowColor, shadowColor: glowColor },
              ]}
            >
              <View style={styles.dottedBorder} />
            </Animated.View>
          </View>

          <Text style={styles.instructionText}>
            Align your face inside the circle
          </Text>

          <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
            <View style={styles.innerButton}>
              <Text style={styles.captureText}>Capture</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.frameContainer}>
            <Image
              source={{ uri: `file://${capturedPhoto.path}` }}
              style={styles.cameraPreview}
              resizeMode="cover"
            />
          </View>

          {isVerifying ? (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <ActivityIndicator size="large" color="#00FF88" />
              {verificationStep && (
                <Text style={styles.verificationLabel}>{verificationStep}</Text>
              )}
            </View>
          ) : (
            showButtons && (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={retakePhoto}
                  disabled={isVerifying}
                >
                  <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={savePhoto}
                  disabled={isVerifying}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0F24',
  },
  frameContainer: {
    width: FRAME_WIDTH,
    height: FRAME_WIDTH,
    borderRadius: FRAME_WIDTH / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
  },
  selfieFrame: {
    position: 'absolute',
    width: FRAME_WIDTH,
    height: FRAME_WIDTH,
    borderRadius: FRAME_WIDTH / 2,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  headerOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: '100%',
    zIndex: 999,
  },
  dottedBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: FRAME_WIDTH / 2,
    borderWidth: 2,
    borderColor: '#00FF88',
    borderStyle: 'dotted',
  },
  instructionText: {
    position: 'absolute',
    top: 60,
    textAlign: 'center',
    color: '#E5E5E5',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  captureButton: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#355042',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  innerButton: {
    width: 90,
    height: 90,
    backgroundColor: '#355042',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  primaryButton: {
    width: 120,
    height: 50,
    backgroundColor: '#355042',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    width: 120,
    height: 50,
    borderColor: '#355042',
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  verificationLabel: {
    marginTop: 10,
    color: '#00FF88',
    fontSize: 16,
    fontWeight: '500',
  },
});
