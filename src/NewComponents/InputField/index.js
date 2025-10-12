import React from 'react';
import {Wrapper, Input, Icon} from './styles';
import {Colors} from '../../Theme';

const InputField = ({placeholder, icon, iconStyle, onChangeText, ...props}) => {
  return (
    <Wrapper>
      {icon && icon}
      <Input
        placeholder={placeholder}
        placeholderTextColor={Colors.themeGreyText}
        onChangeText={onChangeText}
        {...props}
      />
    </Wrapper>
  );
};

export default InputField;
