import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Header as HeaderBar} from 'react-native-elements';
import {colors} from '../Helpers/UserHelper';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/auth.actions';

import {
  Home,
  Paws,
  Calendar,
  Notification,
  CashWidthDrawel,
  LoginSVG,
  CashDeposit,
  WPSSVG,
  OnlineTracSVG,
  DocVerificationSVG,
  BillPaymentsSVG,
  OthersSVG,
  InvestmentSVG,
  CloseSVG,
  LogoutSVG,
  PhoneSVG,
  EmailSVG,
  UserSVG,
} from '../Theme/SVG';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutUser = () => {
    this.props.dispatch(logoutUser());
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View>
        <HeaderBar
          centerComponent={{
            text: this.props.name,
            style: {color: colors.WHITE, fontWeight: 'bold', fontSize: 15},
          }}
          rightComponent={
            <View>
              <TouchableOpacity onPress={() => this.logoutUser}>
                <LogoutSVG width={20} height={20} fill={colors.BLACK} />
              </TouchableOpacity>
            </View>
          }
          containerStyle={{
            backgroundColor: colors.MAIN_COLOR,
            height: 60,
          }}
        />
      </View>
    );
  }
}

Header.defaultProps = {
  name: 'Live Ex',
};

mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(Header);
