import React, { useState, useEffect } from 'react';
import {
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  InputGroup,
  StyledTextInput,
  Label,
  PickerWrapper,
  PSStyledTextInput,
  FormContainer,
} from './style';
import {
  getCountriesListAPI,
  getProvince_or_StateListAPI,
} from '../../../Helpers/API';

interface CountryOrProvince {
  label: string;
  value: string;
}

interface FormData {
  streetAddress: string;
  city: string;
  countryId: string;
  provinceOrState: string;
  provinceOrStateId?: string;
  postalCode: string;
}

interface ErrorState {
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  countryId?: string;
  provinceOrState?: string;
  [key: string]: string | undefined;
}

interface AddressFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setError: React.Dispatch<React.SetStateAction<ErrorState>>;
  error: ErrorState;
  setCanadaId: React.Dispatch<React.SetStateAction<string>>;
  canadaId: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  setFormData,
  setError,
  error,
  setCanadaId,
  canadaId,
}) => {
  const [citizenships, setCitizenships] = useState<CountryOrProvince[]>([]);
  const [provinces, setProvinces] = useState<CountryOrProvince[]>([]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [provinceOpen, setProvinceOpen] = useState(false);

  useEffect(() => {
    handleGetCountriesList();
  }, []);

  const handleGetCountriesList = async () => {
    getCountriesListAPI((response: any) => {
      try {
        const itemListNode =
          response?.responseBody?.children?.[0]?.children?.find(
            (child: any) => child.name === 'itemList',
          );

        const countriesList: CountryOrProvince[] =
          itemListNode?.children?.map((item: any) => {
            const idNode = item.children.find((c: any) => c.name === 'Id');
            const valueNode = item.children.find(
              (c: any) => c.name === 'Value',
            );
            return {
              label: valueNode?.value ?? '',
              value: idNode?.value ?? '',
            };
          }) || [];

        setCitizenships(countriesList);

        const canada = countriesList.find(c => c.label === 'Canada');
        if (canada) setCanadaId(canada.value);
      } catch {
        setCitizenships([]);
      }
    });
  };

  const handleGetProvinces = (countryId: string) => {
    if (!countryId) {
      setProvinces([]);
      return;
    }

    getProvince_or_StateListAPI({ nCountryID: countryId }, (response: any) => {
      try {
        const itemListNode =
          response?.responseBody?.children?.[0]?.children?.find(
            (child: any) => child.name === 'itemList',
          );

        const provinceList: CountryOrProvince[] =
          itemListNode?.children?.map((item: any) => {
            const idNode = item.children.find((c: any) => c.name === 'Id');
            const valueNode = item.children.find(
              (c: any) => c.name === 'Value',
            );
            return {
              label: valueNode?.value ?? '',
              value: idNode?.value ?? '',
            };
          }) || [];

        setProvinces(provinceList);
      } catch {
        setProvinces([]);
      }
    });
  };

  const handleCountryChange = (countryId: string) => {
    setFormData(prev => ({
      ...prev,
      countryId,
      provinceOrState: '',
      provinceOrStateId: '',
    }));
    handleGetProvinces(countryId);
  };

  const validateField = (field: keyof FormData, value: string) => {
    const safeValue = (value || '').trim();
    let message = '';

    if (!safeValue) {
      message = `${field
        .replace(/([A-Z])/g, ' $1')
        .replace('Id', '')} is required`;
    } else if (
      field === 'postalCode' &&
      canadaId &&
      formData.countryId === canadaId
    ) {
      const canadaPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      if (!canadaPostalRegex.test(safeValue)) {
        message = 'Invalid Canadian postal code. Example: A1A 1A1';
      }
    }

    setError(prev => ({ ...prev, [field]: message }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FormContainer>
        {/* Street Address */}
        <InputGroup>
          <Label>Street Address</Label>
          <StyledTextInput
            value={formData.streetAddress}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, streetAddress: text }));
              validateField('streetAddress', text);
            }}
            onBlur={() =>
              validateField('streetAddress', formData.streetAddress)
            }
            placeholder="Street Address"
            placeholderTextColor="#ccc"
            hasError={!!error.streetAddress}
          />
          {error.streetAddress && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {error.streetAddress}
            </Text>
          )}
        </InputGroup>

        {/* City */}
        <InputGroup>
          <Label>City</Label>
          <StyledTextInput
            value={formData.city}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, city: text }));
              validateField('city', text);
            }}
            onBlur={() => validateField('city', formData.city)}
            placeholder="City"
            placeholderTextColor="#ccc"
            hasError={!!error.city}
          />
          {error.city && (
            <Text style={{ color: 'red', marginTop: 4 }}>{error.city}</Text>
          )}
        </InputGroup>

        {/* Country Dropdown */}
        <InputGroup>
          <Label>Country</Label>
          <PickerWrapper zIndexValue={4000} hasBorder={true}>
            <DropDownPicker
              open={countryOpen}
              setOpen={setCountryOpen}
              value={formData.countryId}
              items={citizenships}
              dropDownDirection="TOP"
              searchable
              placeholder="Select Country"
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
                elevation: 4000,
                shadowOpacity: 0,
              }}
              dropDownContainerStyle={{
                backgroundColor: '#fff',
                borderWidth: 0,
                elevation: 5000,
                shadowOpacity: 0,
                borderColor: '#fff',
                zIndex: 6000,
                ...(Platform.OS === 'android' && { marginTop: 4 }),
              }}
              arrowIconStyle={{ tintColor: '#fff' }}
              textStyle={{ color: '#fff', fontSize: 16 }}
              searchTextInputStyle={{
                color: '#355042',
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              placeholderStyle={{ color: '#fff' }}
              listItemLabelStyle={{ color: '#355042' }}
              listItemContainerStyle={{ backgroundColor: 'transparent' }}
              onSelectItem={item => {
                handleCountryChange(item.value);
                validateField('countryId', item.value);
              }}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </PickerWrapper>
          {error.countryId && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {error.countryId}
            </Text>
          )}
        </InputGroup>

        {/* Province / State */}
        <InputGroup>
          <Label>Province / State</Label>
          {formData.countryId === canadaId && provinces.length > 0 ? (
            <PickerWrapper hasBorder={true}>
              <DropDownPicker
                open={provinceOpen}
                setOpen={setProvinceOpen}
                value={
                  provinces.find(p => p.label === formData.provinceOrState)
                    ?.value ||
                  formData.provinceOrStateId ||
                  null
                }
                items={provinces}
                dropDownDirection="TOP"
                placeholder="Select Province / State"
                onSelectItem={item => {
                  setFormData(prev => ({
                    ...prev,
                    provinceOrState: item.label,
                    provinceOrStateId: item.value,
                  }));
                  setTimeout(() => {
                    validateField('provinceOrState', item.label);
                  }, 0);
                }}
                onClose={() =>
                  validateField('provinceOrState', formData.provinceOrState)
                }
                style={{ backgroundColor: 'transparent', borderWidth: 0 }}
                dropDownContainerStyle={{
                  backgroundColor: '#fff',
                  borderWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderColor: '#fff',
                }}
                arrowIconStyle={{ tintColor: '#fff' }}
                textStyle={{ color: '#fff', fontSize: 16 }}
                searchTextInputStyle={{
                  color: '#355042',
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                placeholderStyle={{ color: '#fff' }}
                listItemLabelStyle={{ color: '#355042' }}
                listItemContainerStyle={{ backgroundColor: 'transparent' }}
                zIndex={9999}
              />
            </PickerWrapper>
          ) : (
            <PickerWrapper hasBorder={false}>
              <PSStyledTextInput
                value={formData.provinceOrState}
                onChangeText={text => {
                  setFormData(prev => ({ ...prev, provinceOrState: text }));
                  validateField('provinceOrState', text);
                }}
                onBlur={() =>
                  validateField('provinceOrState', formData.provinceOrState)
                }
                placeholder="Province / State"
                placeholderTextColor="#ccc"
                style={{
                  borderColor: error.provinceOrState ? 'red' : '#ffffff4d',
                  borderWidth: 1,
                }}
              />
            </PickerWrapper>
          )}
          {error.provinceOrState && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {error.provinceOrState}
            </Text>
          )}
        </InputGroup>

        {/* Postal Code */}
        <InputGroup>
          <Label>Postal Code</Label>
          <StyledTextInput
            value={formData.postalCode}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, postalCode: text }));
              validateField('postalCode', text);
            }}
            onBlur={() => validateField('postalCode', formData.postalCode)}
            placeholder="Postal Code"
            placeholderTextColor="#ccc"
            hasError={!!error.postalCode}
          />
          {error.postalCode && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {error.postalCode}
            </Text>
          )}
        </InputGroup>
      </FormContainer>
    </TouchableWithoutFeedback>
  );
};

export default AddressForm;
