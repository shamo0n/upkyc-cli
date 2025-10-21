import React, { useState, useEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import {
  InputGroup,
  StyledTextInput,
  Label,
  PickerWrapper,
  PSStyledTextInput,
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
  postalCode: string;
}

interface ErrorState {
  postalCode?: string;
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

  const [loadingCountry, setLoadingCountry] = useState(false);
  const [loadingProvince, setLoadingProvince] = useState(false);

  // Load countries on mount
  useEffect(() => {
    handleGetCountriesList();
  }, []);

  const handleGetCountriesList = async () => {
    setLoadingCountry(true);
    getCountriesListAPI((response: any) => {
      console.log('Countries API response:', response);

      try {
        const itemListNode =
          response?.responseBody?.children?.[0]?.children?.find(
            (child: any) => child.name === 'itemList',
          );

        if (!itemListNode?.children?.length) {
          setCitizenships([]);
          return;
        }

        const countriesList: CountryOrProvince[] = itemListNode.children.map(
          (item: any) => {
            const idNode = item.children.find((c: any) => c.name === 'Id');
            const valueNode = item.children.find(
              (c: any) => c.name === 'Value',
            );
            return {
              label: valueNode?.value ?? '',
              value: idNode?.value ?? '',
            };
          },
        );

        console.log('Parsed countries list:', countriesList);
        setCitizenships(countriesList);

        const canada = countriesList.find(c => c.label === 'Canada');
        if (canada) setCanadaId(canada.value);
      } catch (err) {
        console.warn('Error parsing countries response:', err);
        setCitizenships([]);
      } finally {
        setLoadingCountry(false);
      }
    });
  };

  const handleCountryChange = (countryId: string) => {
    console.log('Selected countryId:', countryId);
    setFormData(prev => ({ ...prev, countryId, provinceOrState: '' }));
    handleGetProvinces(countryId);
  };

  const handleGetProvinces = (countryId: string) => {
    if (!countryId) {
      setProvinces([]);
      return;
    }

    setLoadingProvince(true);
    console.log('Fetching provinces for countryId:', countryId);

    getProvince_or_StateListAPI({ nCountryID: countryId }, (response: any) => {
      console.log('Provinces API response:', response);

      try {
        const itemListNode =
          response?.responseBody?.children?.[0]?.children?.find(
            (child: any) => child.name === 'itemList',
          );

        if (!itemListNode?.children?.length) {
          setProvinces([]);
          return;
        }

        const provinceList: CountryOrProvince[] = itemListNode.children.map(
          (item: any) => {
            const idNode = item.children.find((c: any) => c.name === 'Id');
            const valueNode = item.children.find(
              (c: any) => c.name === 'Value',
            );
            return {
              label: valueNode?.value ?? '',
              value: idNode?.value ?? '',
            };
          },
        );

        console.log('Parsed provinces list:', provinceList);
        setProvinces(provinceList);
      } catch (err) {
        console.warn('Error parsing provinces response:', err);
        setProvinces([]);
      } finally {
        setLoadingProvince(false);
      }
    });
  };

  return (
    <View>
      {/* Street Address */}
      <InputGroup>
        <Label>Street Address</Label>
        <StyledTextInput
          value={formData.streetAddress}
          onChangeText={text =>
            setFormData(prev => ({ ...prev, streetAddress: text }))
          }
          placeholder="Street Address"
          placeholderTextColor="#ccc"
        />
      </InputGroup>

      {/* City */}
      <InputGroup>
        <Label>City</Label>
        <StyledTextInput
          value={formData.city}
          onChangeText={text => setFormData(prev => ({ ...prev, city: text }))}
          placeholder="City"
          placeholderTextColor="#ccc"
        />
      </InputGroup>

      {/* Country Dropdown */}
      <InputGroup>
        <Label>Country</Label>
        <PickerWrapper>
          <DropDownPicker
            open={countryOpen}
            setOpen={setCountryOpen}
            value={formData.countryId}
            items={citizenships}
            searchable
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
              borderColor: '#fff',
              zIndex: 6000,
              ...(Platform.OS === 'android' && { marginTop: 4 }),
            }}
            arrowIconStyle={{
              tintColor: '#fff',
            }}
            textStyle={{
              color: '#fff',
              fontSize: 16,
            }}
            searchTextInputStyle={{
              color: '#fff',
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            placeholderStyle={{
              color: '#fff',
            }}
            listItemLabelStyle={{
              color: '#355042',
            }}
            listItemContainerStyle={{
              backgroundColor: 'transparent',
            }}
            setValue={callback => {
              const selectedValue = callback() as string;
              handleCountryChange(selectedValue);
            }}
            placeholder="Select Country"
          />
        </PickerWrapper>
      </InputGroup>

      {/* Province Dropdown (depends on country) */}
      <InputGroup>
        <Label>Province / State</Label>
        <PickerWrapper>
          {formData.countryId === canadaId && provinces.length > 0 ? (
            <DropDownPicker
              open={provinceOpen}
              setOpen={setProvinceOpen}
              value={formData.provinceOrState}
              items={provinces}
              searchable
              setValue={callback => {
                const selectedValue = callback() as string;
                console.log('Selected provinceId:', selectedValue);
                setFormData(prev => ({
                  ...prev,
                  provinceOrState: selectedValue,
                }));
              }}
              placeholder="Select Province / State"
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
                borderColor: '#fff',
                zIndex: 6000,
                ...(Platform.OS === 'android' && { marginTop: 4 }),
              }}
              arrowIconStyle={{
                tintColor: '#fff',
              }}
              textStyle={{
                color: '#fff',
                fontSize: 16,
              }}
              searchTextInputStyle={{
                color: '#fff',
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              placeholderStyle={{
                color: '#fff',
              }}
              listItemLabelStyle={{
                color: '#355042',
              }}
              listItemContainerStyle={{
                backgroundColor: 'transparent',
              }}
            />
          ) : (
            <PSStyledTextInput
              value={formData.provinceOrState}
              onChangeText={text =>
                setFormData(prev => ({ ...prev, provinceOrState: text }))
              }
              placeholder="Province / State"
              placeholderTextColor="#ccc"
            />
          )}
        </PickerWrapper>
      </InputGroup>

      {/* Postal Code */}
      <InputGroup>
        <Label>Postal Code</Label>
        <StyledTextInput
          value={formData.postalCode}
          onChangeText={text => {
            let errorMessage = '';
            if (formData.countryId === canadaId) {
              const canadaPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
              if (!canadaPostalRegex.test(text.trim())) {
                errorMessage =
                  'Invalid Canadian postal code format. Example: A1A 1A1';
              }
            }
            setFormData(prev => ({ ...prev, postalCode: text }));
            setError(prev => ({ ...prev, postalCode: errorMessage }));
          }}
          placeholder="Postal Code"
          placeholderTextColor="#ccc"
        />
        {error?.postalCode ? (
          <Text style={{ color: 'red', marginTop: 4 }}>{error.postalCode}</Text>
        ) : null}
      </InputGroup>
    </View>
  );
};

export default AddressForm;
