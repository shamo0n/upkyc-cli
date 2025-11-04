import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { InputGroup, Label, StyledTextInput, ErrorText } from './style';

interface Props {
  formData: {
    mobile?: string;
    email?: string;
  };
  setFormData: (data: any) => void;
  email: string;
  activeStep?: string; // optional if you're controlling steps
}

const ContactForm: React.FC<Props> = ({
  formData,
  setFormData,
  email,
  activeStep,
}) => {
  const [mobileError, setMobileError] = useState('');
  const mobileInputRef = useRef<TextInput>(null);

  // Focus mobile field automatically when entering this step
  useEffect(() => {
    const timer = setTimeout(() => {
      mobileInputRef.current?.focus();
    }, 300); // small delay ensures keyboard opens correctly
    return () => clearTimeout(timer);
  }, [activeStep]); // if your form uses steps, pass active step here

  // Initialize default mobile if missing
  useEffect(() => {
    if (!formData?.mobile) {
      setFormData({ ...formData, mobile: '+1' });
    }
  }, []);

  const handleMobileChange = (value: string) => {
    if (/^\+?\d*$/.test(value)) {
      if (value.includes('+') && value.indexOf('+') !== 0) {
        value = '+' + value.replace(/\+/g, '');
      }

      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 15) {
        setFormData({ ...formData, mobile: value });
        setMobileError('');
      }
    }
  };

  const handleMobileBlur = () => {
    const numericValue = (formData?.mobile || '').replace(/\D/g, '');
    if (numericValue.length < 10 || numericValue.length > 15) {
      setMobileError('Mobile number must be between 10–15 digits.');
    } else {
      setMobileError('');
    }
  };

  return (
    <View>
      {/* Mobile Number */}
      <InputGroup>
        <Label>Mobile Number</Label>
        <StyledTextInput
          ref={mobileInputRef}
          keyboardType="phone-pad"
          placeholder="+1 (555) 123-4567"
          placeholderTextColor="#ccc"
          value={formData?.mobile || ''}
          onChangeText={handleMobileChange}
          onBlur={handleMobileBlur}
          editable={true}
          hasError={!!mobileError}
        />
        {mobileError ? <ErrorText>{mobileError}</ErrorText> : null}
      </InputGroup>

      {/* Email (non-editable) */}
      <InputGroup>
        <Label>Email</Label>
        <StyledTextInput
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email || formData?.email || ''}
          editable={false}
          selectTextOnFocus={false}
        />
      </InputGroup>
    </View>
  );
};

export default ContactForm;
