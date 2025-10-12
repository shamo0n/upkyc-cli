import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';

import {colors} from '../Helpers/UserHelper';

const propTypes = {
  mapElement: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
};

const defaultProps = {
  mapElement: n => {},
  onSubmitEditing: () => {},
  onChangeText: () => {},
  value: '',
  placeholder: '',
  maxLength: 200,
  keyboardType: 'default',
  secureTextEntry: false,
  label: '',
};

const styles = StyleSheet.create({
  inputView: {
    minWidth: '90%',
    //backgroundColor: colors.TEXT_FIELD_COLOR,
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 20,
    borderColor: colors.MAIN_COLOR,
    // width: 325,
  },
  inputText: {
    height: 50,
    color: colors.BLACK,
  },
});

class InputText extends React.Component {
  state = {
    value: '',
  };

  componentDidMount() {
    this.setState({
      value: this.props.value,
    });
  }

  onChangeText = value => {
    this.setState(
      {
        value,
      },
      () => {
        this.props.onChangeText(value);
      },
    );
  };

  render() {
    const {
      placeholder,
      secureTextEntry,
      keyboardType,
      maxLength,
      value,
      onChangeText,
      onSubmitEditing,
    } = this.props;
    return (
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={placeholder}
          // placeholderTextColor={colors.PLACE_HOLDER_TEXT}
          selectionColor="#999999"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType="next"
          value={this.state.value}
          onSubmitEditing={onSubmitEditing}
          onChangeText={this.onChangeText}
        />
      </View>
    );
  }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;
