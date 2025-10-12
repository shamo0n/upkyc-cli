import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';

import {colors} from '../Helpers/UserHelper';

const propTypes = {
  mapElement: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  defaultValue: PropTypes.string,
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
  defaultValue: '',
  placeholder: '',
  maxLength: 200,
  keyboardType: 'default',
  secureTextEntry: false,
  label: '',
};

class InputText_Box extends React.Component {
  state = {
    value: '',
    defaultValue: '',
  };

  componentDidMount() {
    this.setState({
      value: this.props.value,
      defaultValue: this.props.value,
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
      inputTextStyle,
      inputViewStyle,
      editable,
      secureTextEntry,
      keyboardType,
      maxLength,
      defaultValue,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
    } = this.props;
    return (
      <View style={inputViewStyle}>
        <TextInput
          style={{...inputTextStyle, paddingLeft: 10}}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={placeholder}
          // placeholderTextColor={colors.PLACE_HOLDER_TEXT}
          selectionColor="#999999"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType="next"
          value={value}
          defaultValue={defaultValue}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          onChangeText={this.onChangeText}
          onBlur={onBlur}
        />
      </View>
    );
  }
}

InputText_Box.defaultProps = defaultProps;

InputText_Box.propTypes = propTypes;

export default InputText_Box;
