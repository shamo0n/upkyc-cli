import styled, {css} from 'styled-components/native';
import {Colors} from '../../Theme';

export const Input = styled.TextInput`
  flex: 1;
  margin-left: 5px;
`;

export const Icon = styled.Image`
  ${props =>
    props.iconStyle
      ? css`
          width: ${props.iconStyle.width}px;
          height: ${props.iconStyle.height}px;
        `
      : css`
          width: 15px;
          height: 15px;
        `}
`;

export const Wrapper = styled.View`
  background-color: ${Colors.white};
  flex-direction: row;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding-horizontal: 10px;
  margin-vertical: 10px;
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  border-color: ${Colors.MAIN_COLOR};
`;

export const Loginlabel = styled.Text`
  margin-top: 10px;
  align-self: center;
  font-size: 34px;
  color: ${Colors.white};
  font-weight: 700;
`;
