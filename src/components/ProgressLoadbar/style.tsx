import styled from "styled-components/native";
import { Animated, Dimensions } from "react-native";
import { Circle, Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}px;
  height: ${height}px;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Popup = styled(Animated.View)`
  width: 280px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 50px 40px;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.37;
  shadow-radius: 32px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.18);
  align-items: center;
`;

export const CircleContainer = styled.View`
  width: 130px;
  height: 130px;
  margin-bottom: 30px;
`;

export const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Message = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 25px;
`;
