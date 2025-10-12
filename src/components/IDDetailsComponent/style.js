import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 16px;
`;

export const UploadButton = styled.TouchableOpacity`
  background-color: #2a4738d1;
  border: 1px solid #fefefe12;
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 8px;
  width: 260px;
  align-items: center;
`;

export const UploadButtonText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const ImagePreview = styled.Image`
  width: 280px;
  height: 180px;
  border-radius: 8px;
  margin-vertical: 8px;
`;

export const CameraModal = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

export const CameraVideo = styled.View`
  width: 300px;
  height: 300px;
  background-color: black;
  border-radius: 12px;
  margin-bottom: 16px;
`;

export const CameraActions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: #2a4738;
  padding: 10px 16px;
  border-radius: 8px;
  margin: 0 8px;
`;

export const ActionButtonText = styled.Text`
  color: white;
  font-size: 14px;
`;
