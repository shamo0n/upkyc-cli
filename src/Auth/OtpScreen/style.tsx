import styled from 'styled-components/native';
import { ImageBackground, Platform, ScrollView, View } from 'react-native';

export const ScrollContainer = styled(ScrollView)``;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
  padding: 10px;
`;

export const BackText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
// Background Image wrapper
export const Background = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const LoginBoxContainer = styled(View).attrs(() => ({
  // Platform-specific shadows
  style: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.35,
      shadowRadius: 30,
    },
    android: {
      elevation: 10,
    },
  }),
}))`
  width: 100%;
  padding: 24px; /* roughly 3rem */
  border-radius: 18px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.3);
  background-color: rgba(42, 71, 56, 0.82);
  align-items: center;
  justify-content: center;
`;

// ScrollView with content styles
export const Container = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})``;

export const OtpBox = styled(View).attrs(() => ({
  // Platform-specific shadows
  style: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.35,
      shadowRadius: 30,
    },
    android: {
      elevation: 10,
    },
  }),
}))`
  width: 100%;
  padding: 24px; /* roughly 3rem */
  border-radius: 18px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.3);
  background-color: rgba(42, 71, 56, 0.82);
  align-items: center;
  justify-content: center;
`;
export const OtpTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
`;

export const OtpInfo = styled.Text`
  color: #fff;
  margin-bottom: 30px;
  text-align: center;
`;

export const OtpBold = styled.Text`
  font-weight: bold;
`;

export const OtpInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;
`;

export const OtpInput = styled.TextInput`
  width: 50px;
  height: 50px;
  font-size: 22px;
  border-width: 2px;
  border-color: #fff;
  border-radius: 8px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  height: 50px;
  width: 100%;
  max-width: 150px;
  padding-vertical: 14px;
  border-radius: 5px;
  border-width: 1px;
  border-color: rgba(254, 254, 254, 0.27);
  background-color: #355042;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const ResendButton = styled.TouchableOpacity``;

export const ResendText = styled.Text`
  color: #fff;
  text-decoration: underline;
  font-weight: 700;
`;

export const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 10px;
`;
