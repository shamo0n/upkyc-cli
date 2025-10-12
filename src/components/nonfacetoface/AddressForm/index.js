import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { InputGroup, StyledTextInput, Label } from './style';
import {
  getCountriesListAPI,
  getProvince_or_StateListAPI,
} from '../../../Helpers/API';

const AddressForm = ({
  formData,
  setFormData,
  setError,
  error,
  setCanadaId,
  canadaId,
}) => {
  const [citizenships, setCitizenships] = useState([]);
  const [provinces, setProvinces] = useState([]);

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
    getCountriesListAPI(response => {
      console.log('Countries API response:', response);

      try {
        const itemListNode =
          response?.responseBody?.children?.[0]?.children?.find(
            child => child.name === 'itemList',
          );

        if (!itemListNode?.children?.length) {
          setCitizenships([]);
          return;
        }

        const countriesList = itemListNode.children.map(item => {
          const idNode = item.children.find(c => c.name === 'Id');
          const valueNode = item.children.find(c => c.name === 'Value');
          return {
            label: valueNode?.value ?? '',
            value: idNode?.value ?? '',
          };
        });

        console.log('Parsed countries list:', countriesList);

        setCitizenships(countriesList);

        // Find Canada ID dynamically
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

  const handleCountryChange = countryId => {
    console.log('Selected countryId:', countryId);
    setFormData(prev => ({ ...prev, countryId, provinceOrState: '' }));
    handleGetProvinces(countryId);
  };

  const handleGetProvinces = countryId => {
    if (!countryId) {
      setProvinces([]);
      return;
    }

    setLoadingProvince(true);
    console.log('Fetching provinces for countryId:', countryId);

    getProvince_or_StateListAPI({ nCountryID: countryId }, response => {
      console.log('Provinces API response:', response);

      try {
        const itemListNode =
          response?.responseBody?.children?.[0]?.children?.find(
            child => child.name === 'itemList',
          );

        if (!itemListNode?.children?.length) {
          setProvinces([]);
          return;
        }

        const provinceList = itemListNode.children.map(item => {
          const idNode = item.children.find(c => c.name === 'Id');
          const valueNode = item.children.find(c => c.name === 'Value');
          return {
            label: valueNode?.value ?? '',
            value: idNode?.value ?? '',
          };
        });

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
    <ScrollView
      contentContainerStyle={{ paddingBottom: 50, alignItems: 'center' }}
    >
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
      <InputGroup style={{ zIndex: 2000 }}>
        <Label>Country</Label>
        {loadingCountry ? (
          <ActivityIndicator color="#000" />
        ) : (
          <DropDownPicker
            open={countryOpen}
            setOpen={setCountryOpen}
            value={formData.countryId}
            items={citizenships}
            searchable={true}
            style={{ backgroundColor: 'transparent', borderWidth: 0 }}
            dropDownContainerStyle={{ backgroundColor: '#fff', borderWidth: 0 }}
            setValue={callback => {
              const selectedValue = callback();
              handleCountryChange(selectedValue);
            }}
            placeholder="Select Country"
          />
        )}
      </InputGroup>

      {/* Province Dropdown (depends on country) */}
      <InputGroup style={{ zIndex: 1000 }}>
        <Label>Province / State</Label>
        {loadingProvince ? (
          <ActivityIndicator color="#000" />
        ) : formData.countryId === canadaId && provinces.length > 0 ? (
          <DropDownPicker
            open={provinceOpen}
            setOpen={setProvinceOpen}
            value={formData.provinceOrState}
            items={provinces}
            setValue={callback => {
              const selectedValue = callback();
              console.log('Selected provinceId:', selectedValue);
              setFormData(prev => ({
                ...prev,
                provinceOrState: selectedValue,
              }));
            }}
            placeholder="Select Province / State"
            style={{ borderColor: '#ccc', minHeight: 50 }}
            dropDownContainerStyle={{ borderColor: '#ccc' }}
          />
        ) : (
          <StyledTextInput
            value={formData.provinceOrState}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, provinceOrState: text }))
            }
            placeholder="Province / State"
            placeholderTextColor="#ccc"
          />
        )}
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
    </ScrollView>
  );
};

export default AddressForm;
