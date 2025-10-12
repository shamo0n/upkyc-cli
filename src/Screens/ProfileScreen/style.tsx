import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

export const ProfileBox = styled.View`
  background-color: #2a3a2f;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  margin-bottom: 20px;
`;

export const InfoList = styled.View`
  margin-top: 20px;
  width: 100%;
`;

export const ProfileItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
`;

export const ImageBox = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #677b70;
  border-radius: 4px;
  width: 18px;
  height: 18px;
`;

export const ArrowIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const ProfileItemText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const InfoText = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: #355042;
  padding: 10px;
  border-radius: 8px;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  width: 90%;
  align-items: center;
`;

export const CloseBtn = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const IDImage = styled.Image`
  width: 250px;
  height: 150px;
  margin-vertical: 10px;
  resize-mode: contain;
`;

export const QRSection = styled.View`
  margin-vertical: 20px;
`;
