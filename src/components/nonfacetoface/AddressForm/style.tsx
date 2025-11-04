import styled from 'styled-components/native';
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// ---------- Responsive width calculation ----------
const { width } = Dimensions.get('window');

const getResponsiveWidth = (): number => {
  if (width < 360) return width * 0.95;
  if (width < 360) return width * 0.9;
  if (width < 768) return width * 0.85;
  if (width < 1024) return width * 0.7;
  return width * 0.55;
};

const INPUT_HEIGHT = 48;

// ---------- TypeScript interfaces for props ----------
interface InputProps {
  hasError?: boolean;
}

interface ButtonProps {
  color?: string;
}

// ---------- Styled Components ----------
export const FormContainer = styled.View`
  width: 100%;
  min-width: 350px;
  align-self: center;
`;
export const Container = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const InputGroup = styled.View`
  width: ${getResponsiveWidth()}px;
  margin-bottom: 16px;
  align-self: center;
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
  z-index: ${({ zIndexValue }) => zIndexValue || 1};
`;

export const Label = styled(Text)`
  font-size: 14px;
  color: #fff;
  margin-bottom: 6px;
`;
export const PSStyledTextInput = styled(TextInput)<InputProps>`
  width: ${getResponsiveWidth()}px;
  padding: 12px;
  border-radius: 3px;
  color: #fff;
  border-width: 1px;
  border-color: ${props => (props.hasError ? '#ff4d4d' : '#ffffff4d')};
  align-self: center;
`;
export const StyledTextInput = styled(TextInput)<InputProps>`
  width: ${getResponsiveWidth()}px;
  padding: 12px;
  border-radius: 3px;
  color: #fff;
  border-width: 1px;
  border-color: ${props => (props.hasError ? '#ff4d4d' : '#ffffff4d')};
  align-self: center;
`;

export const ErrorText = styled(Text)`
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 4px;
`;

export const ButtonStyled = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${props => props.color || '#355042'};
  padding: 12px;
  border-radius: 3px;
  margin-bottom: 16px;
  width: 100%;
  min-width: 450px;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

// ---------- RN Picker Select Styles (for react-native-picker-select) ----------
export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: getResponsiveWidth(),
    height: 50,
    color: '#fff',
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff4d',
    fontSize: 16,
    alignSelf: 'center',
    lineHeight: 20,
  },
  inputAndroid: {
    width: getResponsiveWidth(),
    height: 50,
    color: '#fff',
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff4d',
    fontSize: 16,
    alignSelf: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  placeholder: {
    color: '#fff',
  },
  iconContainer: {
    top: Platform.OS === 'ios' ? 14 : 12,
    right: 14,
  },
});
