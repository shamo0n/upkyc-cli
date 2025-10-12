/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

import { Colors } from '../../Theme/';
import styles from './styles';

const NavigationHeader = ({ ...props }) => (
  <View style={{ width: '100%', backgroundColor: Colors.MAIN_COLOR }}>
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={props.LeftOnPress}
            style={styles.viewContainer}>
            {props.LeftIcon && props.LeftIcon}
          </TouchableOpacity>

          <View style={styles.headerView}>
            <Text style={{ ...styles.textStyle, ...styles.headerTextFont }}>
              {props.HeaderText}
            </Text>
          </View>

          <TouchableOpacity
            onPress={props.RightOnPress}
            style={{ ...styles.viewContainer, justifyContent: 'flex-end' }}>
            {props.RightIcon ? (
              props.RightIcon
            ) : (
              <View
                style={{
                  ...styles.imageStyle,
                  width: props.RightImageWidth ? props.RightImageWidth : 35,
                  height: props.RightImageHeight ? props.RightImageHeight : 35,
                }}
              />
            )}

            {props.RightText && (
              <Text style={styles.textStyle}> {props.RightText} </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </View>
);

export default NavigationHeader;
