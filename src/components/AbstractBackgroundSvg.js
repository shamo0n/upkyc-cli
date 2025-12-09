import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Path, Rect } from 'react-native-svg';

const AbstractBackgroundSvg = ({ width = 800, height = 1400 }) => {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <SvgLinearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0" stopColor="#1b4b37" stopOpacity="1" />
          <Stop offset="1" stopColor="#0f2218" stopOpacity="1" />
        </SvgLinearGradient>
        <SvgLinearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0" stopColor="#153d2f" stopOpacity="0.95" />
          <Stop offset="1" stopColor="#0f2a1f" stopOpacity="0.95" />
        </SvgLinearGradient>
      </Defs>

      {/* base rect */}
      <Rect x="0" y="0" width={width} height={height} fill="url(#g1)" />

      {/* abstract curved layers */}
      <Path
        d={`M0 ${height*0.35} C ${width*0.25} ${height*0.25}, ${width*0.66} ${height*0.5}, ${width} ${height*0.4} 
            L ${width} ${height} L 0 ${height} Z`}
        fill="url(#g2)"
        opacity="0.16"
      />

      <Path
        d={`M0 ${height*0.6} C ${width*0.2} ${height*0.45}, ${width*0.6} ${height*0.75}, ${width} ${height*0.7}
            L ${width} ${height} L 0 ${height} Z`}
        fill="#062116"
        opacity="0.08"
      />

      {/* subtle top arc */}
      <Path
        d={`M0 ${height*0.12} C ${width*0.2} ${height*0.05}, ${width*0.8} ${height*0.2}, ${width} ${height*0.08}
            L ${width} 0 L 0 0 Z`}
        fill="#163b2f"
        opacity="0.06"
      />
    </Svg>
  );
};

export default AbstractBackgroundSvg;
