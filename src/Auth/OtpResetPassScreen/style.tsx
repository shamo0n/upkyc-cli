// Screens/Auth/OtpResetPassScreen.styles.ts
import styled from 'styled-components/native';

export const Background = styled.ImageBackground`
  flex: 1;
  resize-mode: cover;
  justify-content: center;
  align-items: center;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const LoginBoxContainer = styled.View`
  flex: 1;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  background-color: #0f1738;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 20px;
  margin-top: 20px;
`;

export const BackText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const OtpTitle = styled.Text`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const OtpInfo = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-bottom: 20px;
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
  border-radius: 8px;
  border-width: 2px;
  border-color: #ccc;
  color: #fff;
  font-size: 22px;
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-radius: 25px;
  background-color: #b1e94f;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: #0f1738;
  font-weight: bold;
  font-size: 18px;
`;

export const ResendButton = styled.TouchableOpacity`
  margin-top: 15px;
`;

export const ResendText = styled.Text`
  color: #b1e94f;
  font-weight: bold;
`;

export const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 10px;
`;

export const InfoContainer = styled.View`
  margin-top: 30px;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

export const AppName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #0f1738;
`;

export const AppDescription = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #8f8e8e;
`;
