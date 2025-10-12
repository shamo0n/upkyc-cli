import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  gap: 16px;
  width: 100%;
`;

export const Label = styled.Text`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const UploadButton = styled.TouchableOpacity`
  border: 1px solid #355042;
  padding: 10px 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  text-transform: none;
`;

export const FileNameText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  margin-top: 8px;
`;

export const PickerWrapper = styled.View`
  border: 1px solid #355042;
  border-radius: 8px;
  padding: 0px;
`;
