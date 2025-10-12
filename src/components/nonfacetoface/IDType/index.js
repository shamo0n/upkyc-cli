import React, { useState, useEffect } from "react";
import { Modal, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  Container,
  InputGroup,
  StyledTextInput,
  Label,
  ButtonStyled,
  ButtonText,
} from "./style";

const MapModal = ({ visible, onClose, onLocationSelect, initialRegion }) => {
  const [marker, setMarker] = useState(initialRegion);

  const handlePress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });

    // Reverse Geocoding
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`;
      const response = await fetch(url, {
        headers: { "User-Agent": "YourApp/1.0", Accept: "application/json" },
      });
      if (!response.ok) return;
      const result = await response.json();
      const addr = result.address || {};

      onLocationSelect({
        lat: latitude,
        lng: longitude,
        city: addr.city || addr.town || addr.village || "",
        provinceOrState: addr.state || addr.region || "",
        streetAddress:
          addr.road || addr.neighbourhood || addr.suburb || result.display_name,
        postalCode: addr.postcode || "",
        country: addr.country || "",
      });
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <Container>
        <MapView
          style={{ flex: 1, borderRadius: 8 }}
          initialRegion={initialRegion}
          onPress={handlePress}
        >
          {marker && <Marker coordinate={marker} />}
        </MapView>
        <ButtonStyled onPress={onClose} color="red">
          <ButtonText>Close</ButtonText>
        </ButtonStyled>
      </Container>
    </Modal>
  );
};

const AddressForm = ({ formData, setFormData, countries, setError, error }) => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 25.276987,
    longitude: 55.296249,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    // Fetch current location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setInitialRegion({ ...initialRegion, latitude, longitude });
        setFormData((prev) => ({ ...prev, lat: latitude, lng: longitude }));
      },
      (err) => console.warn(err.message),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      lat: location.lat,
      lng: location.lng,
      city: location.city,
      provinceOrState: location.provinceOrState,
      postalCode: location.postalCode,
      streetAddress: location.streetAddress,
      country: location.country,
    }));
    setShowMapModal(false);
  };

  const handleInputChange = (name, value) => {
    let errorMessage = "";
    const specialCharPattern = /^[a-zA-Z0-9\s-]*$/;
    if (["city", "provinceOrState", "streetAddress"].includes(name)) {
      if (!specialCharPattern.test(value.trim())) {
        errorMessage = "Special characters are not allowed.";
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: errorMessage }));
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <ButtonStyled onPress={() => setShowMapModal(true)}>
        <ButtonText>Select Location from Map</ButtonText>
      </ButtonStyled>

      <InputGroup>
        <Label>Street Address</Label>
        <StyledTextInput
          value={formData.streetAddress}
          onChangeText={(text) => handleInputChange("streetAddress", text)}
          placeholder="Street Address"
        />
      </InputGroup>

      <InputGroup>
        <Label>City</Label>
        <StyledTextInput
          value={formData.city}
          onChangeText={(text) => handleInputChange("city", text)}
          placeholder="City"
        />
      </InputGroup>

      <InputGroup>
        <Label>Province/State</Label>
        <StyledTextInput
          value={formData.provinceOrState}
          onChangeText={(text) => handleInputChange("provinceOrState", text)}
          placeholder="Province/State"
        />
      </InputGroup>

      <InputGroup>
        <Label>Postal Code</Label>
        <StyledTextInput
          value={formData.postalCode}
          onChangeText={(text) => handleInputChange("postalCode", text)}
          placeholder="Postal Code"
        />
      </InputGroup>

      <MapModal
        visible={showMapModal}
        onClose={() => setShowMapModal(false)}
        onLocationSelect={handleLocationSelect}
        initialRegion={initialRegion}
      />
    </ScrollView>
  );
};

export default AddressForm;
