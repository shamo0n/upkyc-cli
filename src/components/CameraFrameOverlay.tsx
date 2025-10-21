import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  visible: boolean;
  type: 'idFront' | 'idBack' | 'selfie';
  onCapture: () => void;
  onCancel: () => void;
}

const CameraFrameOverlay: React.FC<Props> = ({ visible, type, onCapture, onCancel }) => {
  const isSelfie = type === 'selfie';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isSelfie ? 'Align your face inside the oval' : 'Align your ID inside the box'}
          </Text>
        </View>

        <View style={styles.cameraFrameContainer}>
          {isSelfie ? (
            <View style={styles.ovalFrame} />
          ) : (
            <View style={styles.rectFrame} />
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.captureBtn} onPress={onCapture}>
            <Text style={styles.btnText}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000e8',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  header: { marginTop: 40 },
  title: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  cameraFrameContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  rectFrame: {
    width: width * 0.8,
    height: width * 0.5,
    borderWidth: 3,
    borderColor: '#00ff88',
    borderRadius: 12,
  },
  ovalFrame: {
    width: width * 0.6,
    height: width * 0.8,
    borderWidth: 3,
    borderColor: '#00ff88',
    borderRadius: width * 0.4,
  },
  footer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  captureBtn: {
    backgroundColor: '#00c853',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelBtn: {
    backgroundColor: '#ff5252',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default CameraFrameOverlay;
