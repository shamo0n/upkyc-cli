import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AbstractBackgroundGradient = () => {
  return (
    <View style={styles.container}>
      {/* Base gradient */}
      <LinearGradient
        colors={['#0d2c20', '#1a4736', '#173227']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Pattern: Large curved wave */}
      <View style={[styles.wave, styles.wave1]} />

      {/* Pattern: Secondary wave */}
      <View style={[styles.wave, styles.wave2]} />

      {/* Big abstract blob */}
      <View style={[styles.blob, styles.blob1]} />

      {/* Glow wash for blending */}
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'transparent']}
        style={styles.glow}
      />

      {/* Noise overlay */}
      <View style={styles.noise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  /* WAVE PATTERNS */
  wave: {
    position: 'absolute',
    backgroundColor: 'rgba(32, 84, 63, 0.35)',
    borderRadius: 400,
  },

  wave1: {
    width: 600,
    height: 260,
    left: -180,
    top: -60,
    transform: [{ rotate: '-35deg' }],
  },

  wave2: {
    width: 720,
    height: 300,
    right: -260,
    top: 120,
    opacity: 0.28,
    transform: [{ rotate: '25deg' }],
  },

  /* BLOBS */
  blob: {
    position: 'absolute',
    backgroundColor: 'rgba(20, 61, 48, 0.35)',
    borderRadius: 300,
  },

  blob1: {
    width: 500,
    height: 380,
    bottom: -160,
    left: -140,
    opacity: 0.25,
    transform: [{ rotate: '-12deg' }],
  },

  /* GLOW */
  glow: {
    position: 'absolute',
    width: '130%',
    height: '130%',
    top: '-10%',
    left: '-10%',
    opacity: 0.07,
  },

  /* NOISE */
  noise: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.018,
  },
});

export default AbstractBackgroundGradient;
