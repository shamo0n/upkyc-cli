import React, { useEffect, useState, useMemo, useCallback } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  validateAccountNumber,
  validateName,
  validateNumber,
} from '../../../Utils/util';
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
import { View } from 'react-native';

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

  return (
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
        <PickerWrapper>
          <DropDownPicker
            open={genderOpen}
            value={genderValue}
            items={genderItems}
            setOpen={setGenderOpen}
            setValue={setGenderValue}
            setItems={setGenderItems}
            onOpen={onGenderOpen}
            searchable={true}
            disableBorderRadius={true}
            searchPlaceholder="Search Gender..."
            placeholder="Select Gender"
            onChangeValue={value => handleInputChange('gender', value)}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#fff',
              borderWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            }}
            textStyle={{
              // color: '#fff',
              fontSize: 16,
            }}
            searchTextInputStyle={{
              color: '#fff',
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            placeholderStyle={{
              color: '#ccc',
            }}
            listItemContainerStyle={{
              backgroundColor: 'transparent',
            }}
          />
        </PickerWrapper>
        {error.gender && <ErrorText>{error.gender}</ErrorText>}
      </InputGroup>

      {/* ✅ DATE PICKER */}
      <InputGroup>
        <Label>Date of Birth</Label>
        <DatePickerButton onPress={() => setShowDatePicker(true)}>
          <DateText>
            {formData.dob ? formData.dob : 'Select Date of Birth'}
          </DateText>
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
        <PickerWrapper>
          <DropDownPicker
            open={citizenshipOpen}
            value={citizenshipValue}
            items={citizenshipItems}
            setOpen={setCitizenshipOpen}
            setValue={setCitizenshipValue}
            setItems={setCitizenshipItems}
            onOpen={onCitizenshipOpen}
            searchable={true}
            searchPlaceholder="Search Citizenship..."
            placeholder="Select Citizenship"
            onChangeValue={value => handleInputChange('citizenship', value)}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#fff',
              borderWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            }}
            textStyle={{
              // color: '#fff',
              fontSize: 16,
            }}
            searchTextInputStyle={{
              color: '#fff',
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            placeholderStyle={{
              color: '#ccc',
            }}
            listItemContainerStyle={{
              backgroundColor: 'transparent',
            }}
          />
        </PickerWrapper>
        {error.citizenship && <ErrorText>{error.citizenship}</ErrorText>}
      </InputGroup>
    </FormContainer>
  );
};

export default PersonalInformationForm;
