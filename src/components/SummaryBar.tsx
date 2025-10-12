import React from "react";
import styled from "styled-components/native";

interface Props {
  total: number;
  yes: number;
  no: number;
  na: number;
}

const SummaryBar: React.FC<Props> = ({ total, yes, no, na }) => {
  return (
    <Text>
      Total: <Bold>{total}</Bold> | YES: <Green>{yes}</Green> | NO:{" "}
      <Red>{no}</Red> | N/A: <Bold>{na}</Bold>
    </Text>
  );
};

export default SummaryBar;

const Text = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const Green = styled.Text`
  color: greenyellow;
`;

const Red = styled.Text`
  color: orangered;
`;
