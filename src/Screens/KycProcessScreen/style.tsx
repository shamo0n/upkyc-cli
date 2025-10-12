import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const KycBox = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  padding: 24px;
  flex: 1;
  width: 90%;
  max-width: 450px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
`;
export const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
`;
export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

export const BackButton = styled.TouchableOpacity`
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

export const BackIcon = styled.Image`
  width: 20px;
  height: 20px;
  resize-mode: contain;
`;
