// style.tsx
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { responsiveFontSize } from '../../Utils/responsive';
import Animated, { FadeInUp } from 'react-native-reanimated';

// ----------------------------------------------------------
// GLOBALS
// ----------------------------------------------------------

const CardShadow = Platform.select({
  ios: `
    shadow-color: #000;
    shadow-offset: 0px 10px;
    shadow-opacity: 0.18;
    shadow-radius: 20px;
  `,
  android: `
    elevation: 8;
  `,
});

// Improved glass layer for card backgrounds
const GlassBackground = `
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
`;

// ----------------------------------------------------------
// CONTAINER
// ----------------------------------------------------------

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  padding: 20px 16px;
  background-color: rgba(0, 0, 0, 0.35);
`;

// ----------------------------------------------------------
// HEADER
// ----------------------------------------------------------

export const Header = styled.View`
  width: 100%;
  margin-top: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`;

// ----------------------------------------------------------
// DASHBOARD CARD
// ----------------------------------------------------------

export const AnimatedDashboardBox = styled(Animated.View)`
  width: 100%;
  max-width: 480px;
  padding: 26px;
  border-radius: 16px;
  background-color: #2a4738;
`;

// ----------------------------------------------------------
// PROFILE AREA
// ----------------------------------------------------------

export const ProfileBox = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.Image`
  width: 86px;
  height: 86px;
  border-radius: 43px;
  border-width: 2.2px;
  border-color: #ffffff;
  margin-bottom: 12px;
`;

export const WelcomeText = styled.Text`
  color: #e7f5ef;
  font-size: ${responsiveFontSize(15)}px;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const NameText = styled.Text`
  color: #ffffff;
  font-size: ${responsiveFontSize(18)}px;
  font-weight: 700;
  margin-bottom: 2px;
`;

export const EmailText = styled.Text`
  color: #b8cbc4;
  font-size: ${responsiveFontSize(12)}px;
  margin-bottom: 8px;
`;

export const StatusText = styled.Text`
  color: #4ade80;
  font-weight: 700;
  font-size: ${responsiveFontSize(12.5)}px;
`;

// ----------------------------------------------------------
// GRID (Services / Actions)
// ----------------------------------------------------------

export const Grid = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 16px;
  column-gap: 12px;
`;

// ----------------------------------------------------------
// CARD ITEM
// ----------------------------------------------------------

export const Card = styled.TouchableOpacity`
  width: 48%;
  padding: 18px 12px;
  border-radius: 14px;
  align-items: center;
  ${GlassBackground}
`;

export const CardText = styled.Text`
  color: #f8fffa;
  font-size: ${responsiveFontSize(12.5)}px;
  font-weight: 600;
  margin-top: 8px;
`;

// ----------------------------------------------------------
// CENTERED OVERLAY (Loader / Blocker)
// ----------------------------------------------------------

export const Centered = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
`;
