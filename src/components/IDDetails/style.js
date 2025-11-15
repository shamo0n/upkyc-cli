import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

// Container for step
export const StepContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

// Title text
export const Title = styled.Text`
  font-size: ${props => (props.small ? '16px' : '24px')};
  font-weight: bold;
  font-family: 'Montserrat';
  color: #fff;
  margin-bottom: 20px;
`;

// Row of buttons
export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  gap: ${isSmallScreen ? '5px' : '3px'};
`;

// Individual ID button
export const IdButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  min-width: 100px;
  max-width: 150px;
  height: 110px;
  margin-right: 2px;
  border-radius: 8px;
  border-width: 2px;
  border-color: ${props => (props.selected ? '#4F6659' : '#FEFEFE4D')};
  background-color: ${props => (props.selected ? '#355042' : 'transparent')};

  /* Shadows */
  shadow-color: ${props => (props.selected ? '#4F6659' : 'transparent')};
  shadow-offset: 0px 0px;
  shadow-opacity: ${props => (props.selected ? 0.8 : 0)};
  shadow-radius: ${props => (props.selected ? 10 : 0)};
  elevation: ${props => (props.selected ? 5 : 0)};
`;

// Button label
export const ButtonLabel = styled.Text`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Montserrat';
  color: ${props => (props.selected ? '#E0F2F1' : '#F7F7F7')};
`;

// For smaller screens you can also add media queries using Dimensions if needed
