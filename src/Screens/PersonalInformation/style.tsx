import { ImageBackground, View } from 'react-native';
import styled from 'styled-components/native';

export const Background = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
`;
export const Container = styled(View)`
  flex: 1;
  width: 100%;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.View`
  width: 0%;
  max-width: 526px;
  padding: 32px 24px;
  background-color: rgba(42, 71, 56, 0.82);
  border-radius: 12px;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
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
