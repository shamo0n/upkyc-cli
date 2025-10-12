import React from 'react';
import { StyleSheet, View } from 'react-native';
import Routes from './components/Routes';
import { connect } from 'react-redux';

class Main extends React.Component {
  render() {
    // Safely read isLoggedIn from Redux (default false if missing)
    const isLoggedIn = this.props.authData?.isLoggedIn ?? false;

    return (
      <View style={styles.container}>
        <Routes isLoggedIn={isLoggedIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Correct mapping of reducer state
const mapStateToProps = state => ({
  authData: state.authData, // since you combinedReducers({ authData, loginUser })
});

export default connect(mapStateToProps)(Main);
