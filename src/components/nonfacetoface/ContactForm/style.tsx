import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

// Responsive width logic
const { width } = Dimensions.get('window');
export const getResponsiveWidth = () => {
  if (width <= 320) return width * 0.95; // very small phones
  if (width <= 375) return width * 0.9; // small phones
  if (width <= 414) return width * 0.85; // medium phones
  if (width <= 768) return width * 0.75; // large phones / small tablets
  if (width <= 1024) return width * 0.7; // medium tablets
  return width * 0.55; // large tablets / desktops
};

const INPUT_WIDTH = getResponsiveWidth();
const INPUT_HEIGHT = 48;

// Layout
export const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px;
  width: 100%;
  justify-content: center;
`;

export const InputGroup = styled.View`
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  color: #f7f7f7;
  font-size: 14px;
  margin-bottom: 5px;
`;

// Define prop type for hasError
interface StyledInputProps {
  hasError?: boolean;
}

export const StyledTextInput = styled.TextInput<StyledInputProps>`
  background-color: transparent;
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? 'red' : '#FEFEFE45')};
  border-radius: 5px;
  padding: 12px;
  color: #f7f7f7;
  width: 100%;
  height: ${INPUT_HEIGHT}px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 2px;
`;
