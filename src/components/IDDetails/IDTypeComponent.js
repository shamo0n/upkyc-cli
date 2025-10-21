import React, { useState } from 'react';
import {
  StepContainer,
  Title,
  ButtonRow,
  IdButton,
  ButtonLabel,
} from './style';
import {
  DrivingLicenseIcon,
  IdCardIcon,
  PassportIcon,
} from '../../Assets/images/SVG';

const IDTypeComponent = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelectType = type => {
    setSelectedType(type);
    onSelect(type);
  };
  const icons = {
    'id-card': IdCardIcon,
    'driving-license': DrivingLicenseIcon,
    passport: PassportIcon,
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
          const Icon = icons[type];

          return (
            <IdButton
              key={type}
              selected={selectedType === type}
              onPress={() => handleSelectType(type)}
            >
              {/* Render the correct icon */}
              {Icon && (
                <Icon
                  width={40}
                  height={40}
                  fill={selectedType ? '#E0F2F1' : '#CFD8DC'}
                />
              )}

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
