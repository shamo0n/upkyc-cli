import React, { useEffect, useState, useMemo, useCallback } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  validateAccountNumber,
  validateName,
  validateNumber,
} from '../../../Utils/util';
import { Dropdown } from 'react-native-element-dropdown';
import {
  FormContainer,
  InputGroup,
  Label,
  StyledTextInput,
  ErrorText,
  DatePickerButton,
  DateText,
  PickerWrapper,
} from './style';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

interface Props {
  formData: any;
  setFormData: any;
  error: any;
  setError: any;
  genders: string[];
  citizenships: { countryId: string; countryName: string }[];
}

const PersonalInformationForm: React.FC<Props> = ({
  formData,
  setFormData,
  error,
  setError,
  genders,
  citizenships,
}) => {
  const today = new Date();
  const defaultDob = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  // ✅ All useState hooks are defined at top level, in the same order every render
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(formData.gender || null);
  const [genderItems, setGenderItems] = useState<
    { label: string; value: string }[]
  >([]);

  const [citizenshipOpen, setCitizenshipOpen] = useState(false);
  const [citizenshipValue, setCitizenshipValue] = useState(
    formData.citizenship || null,
  );
  const [citizenshipItems, setCitizenshipItems] = useState<
    { label: string; value: string }[]
  >([]);

  // ✅ useEffects always stay in same order
  useEffect(() => {
    if (!formData.dob) {
      setFormData((prev: any) => ({
        ...prev,
        dob: defaultDob.toISOString().split('T')[0],
      }));
    }
  }, [formData.dob, setFormData]);

  const genderOptions = useMemo(
    () => genders?.map(gender => ({ label: gender, value: gender })) || [],
    [genders],
  );

  const citizenshipOptions = useMemo(
    () =>
      citizenships?.map(c => ({
        label: c.countryName,
        value: c.countryId,
      })) || [],
    [citizenships],
  );

  useEffect(() => {
    setGenderItems(genderOptions);
  }, [genderOptions]);

  useEffect(() => {
    setCitizenshipItems(citizenshipOptions);
  }, [citizenshipOptions]);

  // ✅ Ensure only one dropdown is open at a time
  const onGenderOpen = useCallback(() => {
    setCitizenshipOpen(false);
  }, []);

  const onCitizenshipOpen = useCallback(() => {
    setGenderOpen(false);
  }, []);

  const handleInputChange = (name: string, value: any) => {
    let errorMessage = '';
    const today = new Date();

    if (['firstName', 'middleName', 'lastName'].includes(name)) {
      errorMessage = validateName(value);
    } else if (name === 'age') {
      errorMessage = validateNumber(value);
    } else if (name === 'accountno') {
      errorMessage = validateAccountNumber(value);
    } else if (name === 'dob') {
      const selectedDate = new Date(value);
      const minAgeDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(),
      );
      if (selectedDate > minAgeDate) {
        errorMessage = 'You must be at least 18 years old.';
      }
    }

    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setError((prev: any) => ({ ...prev, [name]: errorMessage }));
  };
  const formatDate = (date: string | number | Date): string => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formattedDob = formatDate(formData.dob);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FormContainer>
        <InputGroup>
          <Label>First Name</Label>
          <StyledTextInput
            value={formData.firstName || ''}
            onChangeText={text => handleInputChange('firstName', text)}
            placeholder="First Name"
            placeholderTextColor="#ccc"
            hasError={!!error.firstName}
          />
          {error.firstName && <ErrorText>{error.firstName}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Middle Name</Label>
          <StyledTextInput
            value={formData.middleName || ''}
            onChangeText={text => handleInputChange('middleName', text)}
            placeholder="Middle Name"
            placeholderTextColor="#ccc"
            hasError={!!error.middleName}
          />
          {error.middleName && <ErrorText>{error.middleName}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Last Name</Label>
          <StyledTextInput
            value={formData.lastName || ''}
            onChangeText={text => handleInputChange('lastName', text)}
            placeholder="Last Name"
            placeholderTextColor="#ccc"
            hasError={!!error.lastName}
          />
          {error.lastName && <ErrorText>{error.lastName}</ErrorText>}
        </InputGroup>

        {/* ✅ GENDER PICKER */}
        <InputGroup>
          <Label>Select Gender</Label>
          <PickerWrapper zIndexValue={2500} hasBorder={true}>
            <Dropdown
              data={genderItems}
              value={genderValue}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              search={false} // <-- turn off search
              maxHeight={200}
              onChange={item => {
                setGenderValue(item.value);
                handleInputChange('gender', item.value || '');
              }}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
                paddingHorizontal: 0,
              }}
              placeholderStyle={{
                color: '#fff',
                fontSize: 16,
              }}
              selectedTextStyle={{
                color: '#fff',
                fontSize: 16,
              }}
              itemTextStyle={{
                color: '#355042',
                fontSize: 16,
              }}
              itemContainerStyle={{
                backgroundColor: '#fff',
              }}
              containerStyle={{
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingVertical: 6,
                elevation: 10,
                zIndex: 99999,
              }}
              activeColor="transparent"
            />
          </PickerWrapper>

          {error.gender && <ErrorText>{error.gender}</ErrorText>}
        </InputGroup>

        {/* ✅ DATE PICKER */}
        <InputGroup>
          <Label>Date of Birth</Label>
          <DatePickerButton onPress={() => setShowDatePicker(true)}>
            <DateText>{formattedDob || 'Select Date of Birth'}</DateText>
          </DatePickerButton>
          {error.dob && <ErrorText>{error.dob}</ErrorText>}

          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={formData.dob ? new Date(formData.dob) : defaultDob}
            onConfirm={date => {
              handleInputChange('dob', date.toISOString().split('T')[0]);
              setShowDatePicker(false);
            }}
            onCancel={() => setShowDatePicker(false)}
            maximumDate={
              new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate(),
              )
            }
          />
        </InputGroup>

        {/* ✅ CITIZENSHIP PICKER */}
        <InputGroup>
          <Label>Select Citizenship</Label>
          <PickerWrapper zIndexValue={3000} hasBorder={true}>
            <Dropdown
              data={citizenshipItems}
              labelField="label"
              valueField="value"
              value={citizenshipValue}
              onChange={item => handleInputChange('citizenship', item.value)}
              placeholder="Select Citizenship"
              searchPlaceholder="Search Citizenship... "
              search
              maxHeight={250}
              style={{
                backgroundColor: 'transparent',
                height: 50,
                borderColor: '#fff',
                paddingHorizontal: 12,
              }}
              placeholderStyle={{ color: '#fff' }}
              selectedTextStyle={{ color: '#fff' }}
              itemTextStyle={{ color: '#355042' }}
              containerStyle={{
                borderRadius: 8,
              }}
            />
          </PickerWrapper>
          {error.citizenship && <ErrorText>{error.citizenship}</ErrorText>}
        </InputGroup>
      </FormContainer>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInformationForm;
