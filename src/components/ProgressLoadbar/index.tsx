import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import * as S from './style'; // your styled components

interface ProgressLoadbarProps {
  progress?: number;
  label?: string;
  onComplete?: () => void; // callback when animation finishes
  duration?: number; // optional custom duration
}

const ProgressLoadbar: React.FC<ProgressLoadbarProps> = ({
  progress = 100,
  label = 'Your KYC is Completed!',
  onComplete,
  duration = 1000,
}) => {
  const circleAnim = useRef(new Animated.Value(0)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence: circle animation → check animation
    Animated.sequence([
      Animated.timing(circleAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(checkAnim, {
        toValue: 1,
        duration: duration * 0.8, // slightly shorter
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Call onComplete if provided (e.g., to hide after animation)
      if (onComplete) onComplete();
    });
  }, [circleAnim, checkAnim, duration, onComplete]);

  const strokeDashoffsetCircle = circleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150.8, 0],
  });

  const strokeDashoffsetCheck = checkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [48, 0],
  });

  return (
    <S.Overlay>
      <S.Popup>
        <S.CircleContainer>
          <Svg width={130} height={130} viewBox="0 0 52 52">
            <S.AnimatedCircle
              cx="26"
              cy="26"
              r="24"
              stroke="#4caf50"
              strokeWidth={4}
              fill="none"
              strokeDasharray="150.8"
              strokeDashoffset={strokeDashoffsetCircle}
            />
            <S.AnimatedPath
              d="M14 27l7 7 16-16"
              stroke="#4caf50"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="48"
              strokeDashoffset={strokeDashoffsetCheck}
            />
          </Svg>
        </S.CircleContainer>
        <S.Message>{label}</S.Message>
      </S.Popup>
    </S.Overlay>
  );
};

export default ProgressLoadbar;
