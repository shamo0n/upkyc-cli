import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { launchCamera, ImagePickerResponse } from "react-native-image-picker";
import Svg, { Rect, Ellipse } from "react-native-svg";

type FrameMode = "idFront" | "idBack" | "faceOval";

interface IDCaptureScreenProps {
  setFormData: React.Dispatch<
    React.SetStateAction<{
      idFront?: string;
      idBack?: string;
      selfie?: string;
      [key: string]: any;
    }>
  >;
}

const IDCaptureScreen: React.FC<IDCaptureScreenProps> = ({ setFormData }) => {
  const [frameMode, setFrameMode] = useState<FrameMode>("idFront");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const takePicture = async () => {
    const result: ImagePickerResponse = await launchCamera({
      mediaType: "photo",
      cameraType: frameMode === "faceOval" ? "front" : "back",
      quality: 0.8,
      saveToPhotos: false,
    });

    const uri = result?.assets?.[0]?.uri;
    if (uri) {
      setPhotoUri(uri);

      // maintain your existing data binding
      setFormData((prev) => {
        if (frameMode === "idFront") return { ...prev, idFront: uri };
        if (frameMode === "idBack") return { ...prev, idBack: uri };
        return { ...prev, selfie: uri };
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Overlay Frames */}
      <View style={styles.frameContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 100 200" preserveAspectRatio="xMidYMid slice">
          {frameMode === "idFront" && (
            <Rect
              x="8"
              y="40"
              width="84"
              height="60"
              rx="3"
              ry="3"
              strokeWidth="0.8"
              stroke="white"
              fill="rgba(255,255,255,0.03)"
            />
          )}
          {frameMode === "idBack" && (
            <>
              <Rect
                x="8"
                y="40"
                width="84"
                height="60"
                rx="3"
                ry="3"
                strokeWidth="0.8"
                stroke="white"
                fill="rgba(255,255,255,0.03)"
              />
              <Rect
                x="10"
                y="46"
                width="80"
                height="10"
                rx="1"
                ry="1"
                strokeWidth="0.6"
                stroke="white"
                fill="rgba(255,255,255,0.02)"
              />
            </>
          )}
          {frameMode === "faceOval" && (
            <Ellipse
              cx="50"
              cy="90"
              rx="25"
              ry="32"
              strokeWidth="0.8"
              stroke="white"
              fill="rgba(255,255,255,0.02)"
            />
          )}
        </Svg>
      </View>

      {/* Preview */}
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={styles.previewImage}
          resizeMode="cover"
        />
      )}

      {/* Mode Buttons */}
      <View style={styles.modeRow}>
        <TouchableOpacity
          style={[styles.modeBtn, frameMode === "idFront" && styles.modeActive]}
          onPress={() => setFrameMode("idFront")}
        >
          <Text style={styles.modeText}>ID Front</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, frameMode === "idBack" && styles.modeActive]}
          onPress={() => setFrameMode("idBack")}
        >
          <Text style={styles.modeText}>ID Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, frameMode === "faceOval" && styles.modeActive]}
          onPress={() => setFrameMode("faceOval")}
        >
          <Text style={styles.modeText}>Face Oval</Text>
        </TouchableOpacity>
      </View>

      {/* Capture Button */}
      <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
        <Text style={styles.captureText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IDCaptureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  frameContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "60%",
    borderRadius: 10,
    marginVertical: 10,
  },
  modeRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  modeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  modeActive: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  modeText: {
    color: "white",
    fontWeight: "600",
  },
  captureBtn: {
    marginTop: 20,
    backgroundColor: "#1e90ff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  captureText: {
    color: "white",
    fontWeight: "700",
  },
});
