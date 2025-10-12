import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPopup: React.FC<Props> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel} // Android back button
    >
      <Overlay>
        <Box>
          <Title>Confirm Submission</Title>
          <Message>
            I hereby declare I filled all the questions. Please proceed by
            clicking yes.
          </Message>
          <Actions>
            <ActionButton onPress={onConfirm}>
              <ActionText>Yes</ActionText>
            </ActionButton>
            <ActionButton onPress={onCancel}>
              <ActionText>No</ActionText>
            </ActionButton>
          </Actions>
        </Box>
      </Overlay>
    </Modal>
  );
};

export default ConfirmPopup;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: rgba(110, 125, 108, 0.95);
  border-radius: 16px;
  padding: 25px;
  width: 85%;
  max-width: 400px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

const Message = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #355042;
  padding: 10px 50px;
  border-radius: 5px;
`;

const ActionText = styled.Text`
  color: white;
  font-weight: 600;
`;
