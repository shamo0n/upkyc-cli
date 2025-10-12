import React from 'react';
import {ButtonWrapper, ButtonText} from './style';

const ImageButton = ({...props}) => (
  <ButtonWrapper color={props.color} onPress={props.buttonOnPress}>
    <ButtonText>{props.buttonText}</ButtonText>
  </ButtonWrapper>
);

export default ImageButton;
