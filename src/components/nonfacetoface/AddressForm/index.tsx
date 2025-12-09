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
import { Dropdown } from 'react-native-element-dropdown';

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
            <Dropdown
              data={citizenships}
              value={formData.countryId}
              labelField="label"
              valueField="value"
              placeholder="Select Country"
              search={true}
              searchPlaceholder="Search Country..."
              maxHeight={250}
              onChange={item => {
                handleCountryChange(item.value);
                validateField('countryId', item.value);
              }}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 0,
                paddingHorizontal: 0,
                zIndex: 3000,
              }}
              containerStyle={{
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingVertical: 6,
                elevation: 5000,
                zIndex: 6000,
                ...(Platform.OS === 'android' && { marginTop: 4 }), // Replaces dropDownDirection="TOP"
              }}
              placeholderStyle={{
                color: '#fff',
                fontSize: 16,
              }}
              selectedTextStyle={{
                color: '#fff',
                fontSize: 16,
              }}
              inputSearchStyle={{
                color: '#355042',
                backgroundColor: 'transparent',
              }}
              itemTextStyle={{
                color: '#355042',
                fontSize: 16,
              }}
              itemContainerStyle={{
                backgroundColor: 'transparent',
              }}
              activeColor="transparent"
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
              <Dropdown
                data={provinces}
                labelField="label"
                valueField="value"
                placeholder="Select Province / State"
                value={
                  provinces.find(p => p.label === formData.provinceOrState)
                    ?.value ||
                  formData.provinceOrStateId ||
                  null
                }
                search={true}
                searchPlaceholder="Search Province / State..."
                maxHeight={250}
                onChange={item => {
                  setFormData(prev => ({
                    ...prev,
                    provinceOrState: item.label,
                    provinceOrStateId: item.value,
                  }));

                  setTimeout(() => {
                    validateField('provinceOrState', item.label);
                  }, 0);
                }}
                onBlur={() =>
                  validateField('provinceOrState', formData.provinceOrState)
                }
                /* MAIN FIELD STYLING */
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                  paddingHorizontal: 0,
                  zIndex: 9999,
                }}
                /* DROPDOWN PANEL */
                containerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 6,
                  paddingVertical: 6,
                  elevation: 10,
                  zIndex: 9999,
                }}
                /* TEXT STYLING */
                placeholderStyle={{
                  color: '#fff',
                  fontSize: 16,
                }}
                selectedTextStyle={{
                  color: '#fff',
                  fontSize: 16,
                }}
                inputSearchStyle={{
                  color: '#355042',
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                itemTextStyle={{
                  color: '#355042',
                  fontSize: 16,
                }}
                itemContainerStyle={{
                  backgroundColor: 'transparent',
                }}
                activeColor="transparent"
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
