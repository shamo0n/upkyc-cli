import styled from 'styled-components/native';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
const { width } = Dimensions.get('window');

// Scale based on screen width — works across all phones/tablets
const getResponsiveWidth = () => {
  if (width < 360) return width * 0.95; // very small phones
  if (width < 360) return width * 0.9; // normal phones
  if (width < 768) return width * 0.85; // large phones / small tablets
  if (width < 1024) return width * 0.7; // medium tablets
  return width * 0.55; // large tablets
};
const INPUT_HEIGHT = 48;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;
export const FormContainer = styled.View`
  width: 100%;
  min-width: 350px;
  align-self: center;
`;
export const InputGroup = styled.View`
  width: ${getResponsiveWidth()}px;
  margin-bottom: 16px;
  align-self: center;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-bottom: 6px;
`;

export const StyledTextInput = styled.TextInput<{ hasError?: boolean }>`
  width: ${getResponsiveWidth()}px;
  height: ${INPUT_HEIGHT}px;
  padding: 10px 14px;
  border-radius: 3px;
  color: #fff;
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? '#ff4d4d' : '#ffffff4d')};
  align-self: center;
`;

export const ErrorText = styled.Text`
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 4px;
`;

export const DatePickerButton = styled.TouchableOpacity`
  width: ${getResponsiveWidth()}px;
  height: ${INPUT_HEIGHT}px;
  padding: 10px 14px;
  border-radius: 3px;
  border-width: 1px;
  border-color: #ffffff4d;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`;

export const DateText = styled.Text`
  color: #fff;
`;
export const PickerWrapper = styled(View)<{
  hasBorder?: boolean;
  zIndexValue?: number;
}>`
  width: ${getResponsiveWidth()}px;
  height: ${INPUT_HEIGHT}px;
  border-width: ${({ hasBorder }) => (hasBorder ? 1 : 0)}px;
  border-color: #ffffff4d;
  border-radius: 3px;
  justify-content: center;
  padding-horizontal: 12px;
  align-self: center;

  /* REQUIRED for Android zIndex to work */
  position: relative;
  z-index: ${({ zIndexValue }) => zIndexValue || 1};
  elevation: ${({ zIndexValue }) => zIndexValue || 1};

  overflow: visible;
`;

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: getResponsiveWidth(),
    height: INPUT_HEIGHT,
    // backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    alignSelf: 'center',
    lineHeight: 20,
  },
  inputAndroid: {
    width: getResponsiveWidth(),
    height: INPUT_HEIGHT,
    // backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff4d',
    fontSize: 16,
    alignSelf: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  placeholder: {
    color: '#aaa',
  },
  iconContainer: {
    top: Platform.OS === 'ios' ? 14 : 12,
    right: 14,
  },
});
