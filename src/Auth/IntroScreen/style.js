import styled from 'styled-components/native';

import {Colors} from '../../Theme';

export const Wrapper = styled.View`
  background-color: ${Colors.WHITE};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.Text`
  color: palevioletred;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const ButtonContainer = styled.View`
  width: 90%;
  margin-left: 4%;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  width: 100%;
  padding-vertical: 10px;
  border-radius: 10px;
  background-color: ${Colors.MAIN_COLOR};

  flex-direction: column;
  align-items: center;
`;
//shadow-color: #000;
// shadow-opacity: 0.41;
// shadow-radius: 10px;
// elevation: 14;

export const ButtonText = styled.Text`
  text-align: center;
  align-items: center;
  color: ${Colors.white};
  border-radius: 10px;
  margin-top: 10px;
  height: 40px;
  position: relative;
`;

export const ButtonImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const QrContainer = styled.View`
  align-items: center;
`;
