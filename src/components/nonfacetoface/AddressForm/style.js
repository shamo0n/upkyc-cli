import styled from "styled-components/native";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

// Responsive width based on screen size
const getResponsiveWidth = () => {
  if (width < 360) return width * 0.95;
  if (width < 480) return width * 0.9;
  if (width < 768) return width * 0.85;
  if (width < 1024) return width * 0.7;
  return width * 0.55;
};

export const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const InputGroup = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-bottom: 6px;
`;

export const StyledTextInput = styled.TextInput`
  width: 100%;
  min-width: 450px;
  padding: 12px;
  border-radius: 3px;
  color: #fff;
  border-width: 1px;
  border-color: ${(props) => (props.hasError ? "#ff4d4d" : "#ffffff4d")};
`;

export const ErrorText = styled.Text`
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 4px;
`;

export const ButtonStyled = styled.TouchableOpacity`
  background-color: ${(props) => props.color || "#355042"};
  padding: 12px;
  border-radius: 3px;
  margin-bottom: 16px;
  width: 100%;
  min-width: 450px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

// Optional: For picker selects in the same style
export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: getResponsiveWidth(),
    height: 50,
    color: "#fff",
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffffff4d",
    fontSize: 16,
    alignSelf: "center",
    lineHeight: 20,
  },
  inputAndroid: {
    width: getResponsiveWidth(),
    height: 50,
    color: "#fff",
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffffff4d",
    fontSize: 16,
    alignSelf: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  placeholder: {
    color: "#fff",
  },
  iconContainer: {
    top: Platform.OS === "ios" ? 14 : 12,
    right: 14,
  },
});
