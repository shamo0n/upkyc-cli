import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.7);
  justify-content: center;
  padding: 10px;
`;

export const InputGroup = styled.View`
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  color: #f7f7f7;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const StyledTextInput = styled.TextInput`
  border-width: 1px;
  border-color: #FEFEFE45;
  padding: 12px;
  border-radius: 5px;
  color: #f7f7f7;
  background-color: transparent;
`;

export const ButtonStyled = styled.TouchableOpacity`
  background-color: ${(props) => props.color || "green"};
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 15px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
