import styled, { css } from 'styled-components/native';

// -----------------------------------------------------
// Shared Styles
// -----------------------------------------------------

const CardShadow = css`
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
  elevation: 6;
`;

const ButtonBase = css`
  padding-vertical: 12px;
  padding-horizontal: 18px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

// -----------------------------------------------------
// Main Container
// -----------------------------------------------------

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 22px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

// -----------------------------------------------------
// Profile Card
// -----------------------------------------------------

export const ProfileBox = styled.View`
  width: 92%;
  background-color: #2a4738;
  border-radius: 16px;
  padding: 20px;
  align-items: center;
  margin-top: 50px;
  ${CardShadow};
`;

export const InfoList = styled.View`
  width: 100%;
  margin-top: 18px;
  gap: 12px;
  align-items: center;
`;

export const ProfileItem = styled.View`
  width: 60%;
  flex-direction: row;
  gap: 14px;
  align-items: center;
  justify-content: center;
`;

export const ImageBox = styled.View`
  width: 24px;
  height: 24px;
  background-color: #6f8379;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

export const ArrowIcon = styled.Image`
  width: 22px;
  height: 22px;
`;

export const ProfileItemContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  flex-shrink: 1;
`;

export const BoldText = styled.Text`
  font-weight: 700;
  color: #f0f5f4;
  font-size: 14px;
  margin-right: 6px;
`;

export const ValueText = styled.Text`
  flex-shrink: 1;
  flex-wrap: wrap;
  color: #e0ece9;
  font-size: 14px;
  line-height: 20px;
`;

export const InfoText = styled.Text`
  color: #e5f4ef;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
`;

// -----------------------------------------------------
// Actions
// -----------------------------------------------------

export const IDActions = styled.View`
  margin-top: 16px;
  gap: 14px;
  align-items: center;
`;

export const IDActionButton = styled.TouchableOpacity`
  ${ButtonBase}
  width: 180px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background-color: rgba(255, 255, 255, 0.1);
`;

export const Actions = styled.View`
  gap: 14px;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  ${ButtonBase}
  ${CardShadow}
  width: 150px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: #2a4738;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  margin-left: 10px;
`;

// -----------------------------------------------------
// QR Section
// -----------------------------------------------------

export const QRContainer = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 92%;
  margin-top: 24px;
`;

export const QRSection = styled.View`
  align-items: center;
  gap: 10px;
`;

export const QRTitle = styled.Text`
  font-weight: 700;
  color: #def7ed;
  font-size: 17px;
`;

export const QRBox = styled.View`
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1.5px solid #0f172a;
  padding: 8px;
  justify-content: center;
  align-items: center;
  ${CardShadow};
`;

export const QRActions = styled.View`
  gap: 14px;
  align-items: center;
`;

// -----------------------------------------------------
// Modal (Modernized)
// -----------------------------------------------------

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 28px;

  /* Darker premium overlay */
  background-color: rgba(0, 0, 0, 0.85);
`;

export const ModalContent = styled.View`
  width: 92%;
  max-width: 460px;
  height: auto;
  max-height: 88%; /* prevents overflow, better than fixed 90% */

  border-radius: 20px;
  padding: 24px 22px;

  /* Premium modern glass / frosted effect */
  background-color: rgba(48, 72, 60, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(10px);

  /* Smooth, natural shadow */
  ${CardShadow};

  position: relative;
`;

/* Close Button */
export const CloseBtn = styled.Pressable`
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 10px;
  border-radius: 50px;

  /* Soft circular hover area */
`;

export const CloseText = styled.Text`
  font-size: 26px;
  color: #ffffff;
`;

// -----------------------------------------------------
// Images Section
// -----------------------------------------------------

export const IDImagesContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 14,
  },
}))``;

export const ImageBlock = styled.View`
  width: 45%;
  align-items: center;
`;

export const IDImage = styled.Image`
  width: 100%;
  border-radius: 12px;
  border-width: 1px;
  border-color: #dde2df;
  aspect-ratio: 1.5;
`;

// -----------------------------------------------------
// Compact Download Button
// -----------------------------------------------------

export const DownloadButton = styled.TouchableOpacity`
  ${ButtonBase}
  ${CardShadow}

  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100px; /* smaller width */
  padding-vertical: 8px;
  padding-horizontal: 5px;

  border-radius: 10px;

  background-color: rgba(255, 255, 255, 0.07);
  border: 0.5px solid rgba(255, 255, 255, 0.14);

  backdrop-filter: blur(4px);
`;

export const ButtonIcon = styled.Image`
  width: 16px; /* smaller icon */
  height: 16px;
  margin-right: 6px;
  resize-mode: contain;
`;

export const DButtonText = styled.Text`
  color: #ffffff;
  font-weight: 400;
  font-size: 8px;
  letter-spacing: 0.1px;
`;
