import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // ✅ Updated import

const ButtonContainer = styled.Pressable`
  height: 50px;
  width: 100%;
  max-width: 150px;
  padding-vertical: 12px;
  border-radius: 5px;
  background-color: #355042;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  overflow: hidden;

  /* Shadow for iOS */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

  /* Shadow for Android */
  elevation: 5;
`;

// Text label
const ButtonText = styled(Animated.Text)`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

// Small arrow circle background
const ArrowContainer = styled(Animated.View)`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

interface AnimatedButtonProps {
  title: string;
  onPress?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ title, onPress }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.circle),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.circle),
      useNativeDriver: true,
    }).start();
    if (onPress) onPress();
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <ButtonContainer onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <ButtonText style={{ transform: [{ translateX }] }}>{title}</ButtonText>
      <ArrowContainer style={{ transform: [{ translateX }] }}>
        <Icon name="arrow-right" size={12} color="#fff" />
      </ArrowContainer>
    </ButtonContainer>
  );
};

export default AnimatedButton;
