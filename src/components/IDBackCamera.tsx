import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppHeader from './AppHeader';

const { width } = Dimensions.get('window');
const FRAME_WIDTH = width * 0.85;
const FRAME_HEIGHT = FRAME_WIDTH * 0.63;

export default function IDBackCameraScreen() {
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const cameraRef = useRef<Camera>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const [capturedPhoto, setCapturedPhoto] = useState<any>(null);

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePhoto({ flash: 'off' });
    setCapturedPhoto(photo);
  };

  const retakePhoto = () => setCapturedPhoto(null);

  const savePhoto = () => {
    if (capturedPhoto?.path) {
      const callback = route.params?.onReturn;
      if (callback && typeof callback === 'function') {
        callback(capturedPhoto.path);
      }
      navigation.goBack();
    }
  };

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

          {/* Camera wrapped in frame container */}
          <View style={styles.frameContainer}>
            <Camera
              ref={cameraRef}
              style={styles.cameraPreview}
              device={device}
              isActive
              photo
            />

            {/* Glowing ID Frame */}
            <View style={styles.idFrame}>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </View>
          </View>

          {/* Instruction Overlay */}
          <Text style={styles.instructionText}>
            Align the **back side** of your ID within the frame
          </Text>

          {/* Capture Button */}
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
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={retakePhoto}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={savePhoto}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
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
    height: FRAME_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  headerOverlay: {
  position: 'absolute',
  top: 20,
  left: 20,
  width: '100%',
  zIndex: 999,
},
  idFrame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 50,
    height: 50,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#355042',
    borderRadius: 8,
    shadowColor: '#355042',
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 50,
    height: 50,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: '#355042',
    borderRadius: 8,
    shadowColor: '#355042',
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    width: 50,
    height: 50,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#355042',
    borderRadius: 8,
    shadowColor: '#355042',
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 50,
    height: 50,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#355042',
    borderRadius: 8,
    shadowColor: '#355042',
    shadowOpacity: 0.8,
    shadowRadius: 6,
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
  capturedImage: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    borderRadius: 16,
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
});
