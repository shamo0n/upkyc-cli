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
`;

export const ImageBox = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #677b70;
  margin-right: 10px;
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
export const IDActions = styled.View`
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;
export const IDActionButton = styled.TouchableOpacity`
  background-color: transparent;
  border: 1px solid rgba(254, 254, 254, 0.3); /* #FEFEFE4D */
  padding-vertical: 10px;
  padding-horizontal: 16px;
  border-radius: 6px;
  width: 160px;
  align-items: center;
  justify-content: center;
`;
export const Actions = styled.View`
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: #355042;
  padding-vertical: 10px;
  padding-horizontal: 16px;
  border: 1px solid rgba(254, 254, 254, 0.3);
  border-radius: 6px;
  width: 130px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  shadow-offset: 0px 4px;
  elevation: 4;
`;
export const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px;
`;

// Container for QR Section + Actions
export const QRContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
  width: 350px;
  justify-content: center;
`;

// QR Section
export const QRSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const QRTitle = styled.Text`
  font-weight: 600;
  color: #e3fcef;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const QRBox = styled.View`
  width: 70px;
  height: 70px;
  padding: 6px;
  background-color: #ffffff;
  border: 2px solid #0f172a;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  shadow-offset: 0px 6px;
`;

// Actions Section
export const QRActions = styled.View`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

// Modal overlay
export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

// Modal content box
export const ModalContent = styled.View`
  background-color: rgba(74, 102, 85, 0.86); /* #4a6655db */
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  shadow-offset: 0px 8px;
  elevation: 8;
  position: relative;
`;

// Close button
export const CloseBtn = styled.Pressable`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border-radius: 50px;
  padding: 4px;
  justify-content: center;
  align-items: center;
`;

// Close button text
export const CloseText = styled.Text`
  font-size: 34px;
  color: #ffffff;
`;

// Container for images
export const IDImagesContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
}))``;

// Individual image block
export const ImageBlock = styled.View`
  width: 45%;
  margin: 8px;
  align-items: center;
`;

// ID Image
export const IDImage = styled.Image`
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1.5;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ccc;
`;
// Button container
export const DownloadButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #355042;
  padding-vertical: 10px;
  padding-horizontal: 16px;
  border-radius: 6px;
  width: 120px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  shadow-offset: 0px 4px;
  elevation: 4;
`;

// Button text
export const DButtonText = styled.Text`
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  margin-left: 8px;
`;

// Button icon
export const ButtonIcon = styled.Image`
  width: 20px;
  height: 20px;
  resize-mode: contain;
`;
