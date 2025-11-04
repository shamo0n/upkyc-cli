import { ImageBackground, View } from 'react-native';
import styled from 'styled-components/native';

export const Background = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Container = styled(View)`
  flex: 1;
  width: 100%;
  padding: 20px;
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

export const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
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
  height: 50px;
  background-color: ${({ disabled }) => (disabled ? '#4a6a59' : '#355042')};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  text-transform: none;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackIcon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
export const BackText = styled.Text`
  font-size: 16px;
  color: #fff;
`;