import styled from 'styled-components/native';
import { ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
export const Background = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Container = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
`;

export const Box = styled.View`
  width: 100%;
  max-width: 600px;
  padding: 24px 20px;
  background-color: rgba(42, 71, 56, 0.82);
  border-radius: 12px;
  align-self: center;
  margin-top: 40px;
`;
// Inner form container
export const FormContainer = styled(View)`
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  align-items: center;
`;

// Title
export const Title = styled(Text)`
  font-size: 22px;
  color: #f7f7f7;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

// Upload Button
export const UploadButton = styled(TouchableOpacity)`
  background-color: #2a4738d1;
  border: 1px solid #fefefe12;
  padding: 12px 16px;
  margin-vertical: 8px;
  border-radius: 8px;
  width: 260px;
  align-items: center;
`;

export const UploadButtonText = styled(Text)`
  color: white;
  font-size: 14px;
`;

// Image preview
export const ImagePreview = styled(Image)`
  width: 280px;
  height: 180px;
  border-radius: 8px;
  margin-vertical: 8px;
`;


// Skip / Cancel button
export const SkipButton = styled(TouchableOpacity)`
  background-color: #0f1738;
  padding: 10px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;





export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
  gap: 10px;
`;

export const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex: 1;
  max-width: 150px;
  height: 50px;
  background-color: #355042;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-transform: none;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
