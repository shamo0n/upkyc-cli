import React, { useState } from 'react';
import {
  StepContainer,
  Title,
  ButtonRow,
  IdButton,
  ButtonLabel,
} from './style';


const IDTypeComponent = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelectType = type => {
    setSelectedType(type);
    onSelect(type);
  };

  const buttons = [
    { type: 'id-card', label: 'ID Card' },
    { type: 'driving-license', label: 'License' },
    { type: 'passport', label: 'Passport' },
  ];

  return (
    <StepContainer>
      <Title>ID Type?</Title>
      <Title small>Please Select the ID Type</Title>

      <ButtonRow>
        {buttons.map(({ type, label }) => {
          return (
            <IdButton
              key={type}
              selected={selectedType === type}
              onPress={() => handleSelectType(type)}
            >
              {/* Render the correct icon */}
              <ButtonLabel selected={selectedType === type}>
                {label}
              </ButtonLabel>
            </IdButton>
          );
        })}
      </ButtonRow>
    </StepContainer>
  );
};

export default IDTypeComponent;
