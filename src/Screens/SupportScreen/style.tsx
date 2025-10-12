import styled from 'styled-components/native';
import { Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export const PageContainer = styled.View`
  flex: 1;
  padding: 100px;

`;
export const BgImg = styled.ImageBackground`
  flex: 1;
  padding: 20px;
`;
export const HeaderBar = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const BackText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const SupportBox = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 20px;
  height: 60%;
  width: 100%;
  max-width: 380px;
  align-self: center;
  backdrop-filter: blur(10px);
`;

export const LogoContainer = styled.Image`
  width: 100%;
  height: 70px;
  align-self: center;
  margin-bottom: 16px;
`;

export const Heading = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin: 20px;
`;

export const InfoCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 20px;
  border-radius: 10px;
  margin-bottom: 12px;
  gap: 12px;
`;

export const InfoText = styled.Text`
  color: #fff;
  font-size: 16px;
  flex: 1;
`;
