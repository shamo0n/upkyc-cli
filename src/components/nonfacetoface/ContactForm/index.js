import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Row, InputGroup, Label, StyledTextInput, ErrorText } from './style';

const ContactForm = ({ formData, setFormData, email }) => {
  const [mobileError, setMobileError] = useState('');

  // Set default mobile value
  useEffect(() => {
    if (!formData.mobile) {
      setFormData({ ...formData, mobile: '+1' });
    }
  }, [formData, setFormData]);

  const handleMobileChange = value => {
    if (/^\+?\d*$/.test(value)) {
      if (value.includes('+') && value.indexOf('+') !== 0) {
        value = value.replace(/\+/g, '');
      }

      const numericValue = value.replace(/\D/g, '');

      if (numericValue.length <= 15) {
        setFormData({ ...formData, mobile: value });
        setMobileError('');
      }
    }
  };

  const handleMobileBlur = () => {
    const numericValue = formData.mobile.replace(/\D/g, '');
    if (numericValue.length < 10 || numericValue.length > 15) {
      setMobileError('Mobile number must be between 10-15 digits.');
    } else {
      setMobileError('');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <InputGroup>
        <Label>Mobile Number</Label>
        <StyledTextInput
          keyboardType="phone-pad"
          placeholder="+1 (555) 123-4567"
          placeholderTextColor="#ccc"
          value={formData.mobile}
          onChangeText={handleMobileChange}
          onBlur={handleMobileBlur}
          hasError={!!mobileError}
        />
        {mobileError ? <ErrorText>{mobileError}</ErrorText> : null}
      </InputGroup>

      <InputGroup>
        <Label>Email</Label>
        <StyledTextInput
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email || formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
        />
      </InputGroup>
    </ScrollView>
  );
};

export default ContactForm;
