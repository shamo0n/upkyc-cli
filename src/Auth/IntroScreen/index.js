import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Linking, Text} from 'react-native';
import {connect} from 'react-redux';
import Logo from '../../components/Logo';
import {MainNavigationHeader} from '../../NewComponents';
import {Colors} from '../../Theme';
import colors from '../../Theme/Colors';
import {
  NewTicketSVG,
  UserdetailSVG,
  LeftarrowSVG,
  ReportSVG,
} from '../../Theme/SVG';
import {privacyPolicy} from 'src/Helpers/UserHelper';

import {
  Wrapper,
  Row,
  ButtonContainer,
  ButtonWrapper,
  ButtonText,
} from './style';

openURl = async url => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
const IntroScreen = props => {
  return (
    <Wrapper>
      <View
        style={{height: '75%', justifyContent: 'center', alignItems: 'center'}}>
        <Logo />
        <Text style={{fontSize: 32, textAlign: 'center'}}>
          Save when you send, receive & spend abroad
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            textAlign: 'center',
            marginTop: 20,
          }}>
          Trusted by over 13 million customers. Regulated by the FCA.
        </Text>
        <View style={styles.signupTextCont}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ContactUs')}>
            <Text style={styles.signupButton}> Contact us</Text>
          </TouchableOpacity>
          <Text style={{color: colors.MAIN_COLOR, fontSize: 18}}> , </Text>
          <TouchableOpacity
            onPress={() => {
              this.openURl(privacyPolicy);
            }}>
            <Text style={styles.signupButton}>PrivacyPolicy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextCont}></View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: '15%',
          alignItems: 'center',
        }}>
        <View>
          <TouchableOpacity
            style={{
              width: 180,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.MAIN_COLOR,
              borderRadius: 10,
              marginRight: 15,
            }}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={{color: '#fff', fontSize: 18}}>Log in</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 180,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.MAIN_COLOR,
              borderRadius: 10,
            }}
            onPress={() => props.navigation.navigate('Signup')}>
            <Text style={{color: '#fff', fontSize: 18}}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  signupTextCont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 5,
    flexDirection: 'row',
  },
  signupButton: {
    color: colors.MAIN_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
const mapStateToProps = state => {
  return {USER_DETAIL: state.USER_DETAIL};
};

export default connect(mapStateToProps)(IntroScreen);
