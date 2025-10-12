import styled from 'styled-components/native';
import { Text, TouchableOpacity, Image, ScrollView } from 'react-native';

export const Container = styled(ScrollView)`
  flex: 1;
  padding: 16px;
`;

export const SectionTitle = styled(Text)`
  font-size: 14px;
  color: white;
  margin-bottom: 12px;
  text-align: center;
`;

export const UploadButton = styled(TouchableOpacity)<{ selected?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #2a4738d1;
  border: 1px solid #fefefe12;
  height: 40px;
  width: 260px;
  border-radius: 8px;
  margin-bottom: 10px;
  position: relative;
`;

export const UploadButtonText = styled(Text)`
  color: white;
  font-size: 12px;
`;

export const PreviewImage = styled(Image)<{ small?: boolean }>`
  width: 260px;
  height: ${props => (props.small ? '150px' : '180px')};
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;
