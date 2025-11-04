// style.tsx
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { responsiveFontSize } from '../../Utils/responsive';

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  padding-vertical: 20px;
  padding-horizontal: 16px;
`;
export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 100px;
`;
export const DashboardBox = styled.View`
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  background-color: #2a4738;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 12px;
      shadow-opacity: 0.3;
      shadow-radius: 24px;
    `,
    android: `
      elevation: 8;
    `,
  })}
`;

export const ProfileBox = styled.View`
  align-items: flex-start;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  margin-bottom: 20px;
`;
export const WelcomeText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const StatusText = styled.Text`
  color: #4ade80; /* green for active */
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;
export const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 2px;
  border-color: #fff;
  margin-bottom: 10px;
`;

export const NameText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const EmailText = styled.Text`
  color: #ddd;
  font-size: 14px;
`;

export const Grid = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

export const Card = styled.TouchableOpacity`
  flex-basis: 45%;
  min-width: 150px;
  max-width: 220px;
  align-items: center;
  border-radius: 12px;
  padding-vertical: 24px;
  padding-horizontal: 16px;
  border: 1px solid rgba(254, 254, 254, 0.3);
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 12px;
`;

export const CardText = styled.Text`
  color: #fff;
  font-size: ${responsiveFontSize(12)}px;
  font-weight: 600;
`;
export const Centered = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
