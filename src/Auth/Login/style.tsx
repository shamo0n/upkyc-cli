import styled from 'styled-components/native';

import { ImageBackground, Platform, View, ScrollView } from 'react-native';
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
// Background Image wrapper
export const Background = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(42, 71, 56, 0.82);
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

export const Logo = styled.Image`
  height: 60px;
  margin-bottom: 10px;
  max-width: 100%;
  resize-mode: contain;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 30px;
`;

export const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 14px;
  border-width: 1px;
  border-color: rgba(254, 254, 254, 0.07);
  border-radius: 5px;
  font-size: 16px; /* 1rem ≈ 16px in React Native */
  background-color: rgba(255, 255, 255, 0.18);
  color: #fff;
`;

export const Suggestions = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-top: 5px;
`;

export const SuggestionText = styled.Text`
  padding: 10px;
  color: #fff;
`;

export const ErrorText = styled.Text`
  color: #ff4d4d;
  font-size: 14px;
  margin-bottom: 10px;
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

export const Loader = styled.ActivityIndicator.attrs({
  color: '#fff',
})``;
