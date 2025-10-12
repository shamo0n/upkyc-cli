import styled, {css} from 'styled-components/native';
import {Colors} from '../../Theme';
// import {Colors} from '../../Theme';

export const Input = styled.TextInput`
  flex: 1;
  padding-left: 15px;
  border-color: ${Colors.MAIN_COLOR};
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
  flex-direction: row;
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${Colors.MAIN_COLOR};
`;
