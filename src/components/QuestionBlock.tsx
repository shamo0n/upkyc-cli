import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  index: number;
  question: string;
  answer: string;
  onChange: (value: string) => void;
}

const QuestionBlock: React.FC<Props> = ({
  index,
  question,
  answer,
  onChange,
}) => {
  return (
    <>
      <Container>
        <QuestionText>{`${index + 1}. ${question}`}</QuestionText>
      </Container>
      <OptionsRow>
        {['YES', 'NO', 'N/A'].map(opt => (
          <OptionButton
            key={opt}
            selected={answer === opt}
            onPress={() => onChange(opt)}
          >
            <OptionText selected={answer === opt}>{opt}</OptionText>
          </OptionButton>
        ))}
      </OptionsRow>
    </>
  );
};

export default QuestionBlock;

const Container = styled.View`
  margin-bottom: 20px;
  background-color: #355042;
  padding: 10px;
  border-radius: 8px;
`;

const QuestionText = styled.Text`
  color: white;
  font-size: 14px;
  margin-bottom: 8px;
`;

const OptionsRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 8px;
`;

const OptionButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#66AE7B' : '#355042')};
  padding: 6px 12px;
  border-radius: 6px;
`;

const OptionText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? '#000' : '#fff')};
  font-size: 12px;
`;
