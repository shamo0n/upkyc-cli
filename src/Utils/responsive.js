// utils/responsive.js
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const responsiveFontSize = (fontSize) => {
  // 375 is base width (iPhone 11/12)
  const scale = width / 375;
  const newSize = fontSize * scale;
  // optional limit to avoid extreme scaling
  return Math.round(Math.min(Math.max(newSize, fontSize * 0.85), fontSize * 1.3));
};