import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Dynamic scaling helpers
const horizontalPadding = width < 380 ? 16 : 24;
const verticalPadding = height < 700 ? 16 : 24;

export const BgImg = styled.ImageBackground`
  flex: 1;
  padding: ${verticalPadding}px ${horizontalPadding}px;
`;

export const PageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SupportBox = styled.View`
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: ${height < 700 ? 16 : 24}px;
  width: 90%;
  max-width: 400px;
  align-self: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
`;

export const LogoContainer = styled.Image`
  width: 80%;
  height: ${height < 700 ? 60 : 80}px;
  align-self: center;
  margin-bottom: 20px;
`;

export const Heading = styled.Text`
  font-size: ${width < 380 ? 18 : 20}px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

export const InfoCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: ${height < 700 ? 12 : 16}px 18px;
  border-radius: 10px;
  margin-bottom: 14px;
  gap: 12px;
`;

export const InfoText = styled.Text`
  color: #fff;
  font-size: ${width < 380 ? 14 : 16}px;
  flex: 1;
`;
