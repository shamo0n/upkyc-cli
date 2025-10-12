import React, { useState } from "react";
import { Platform } from "react-native";
import * as DocumentPicker from 'react-native-document-picker';
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import {
  Container,
  Label,
  UploadButton,
  ButtonText,
  FileNameText,
  PickerWrapper,
} from "./style";

const documentOptions = [
  { label: "Citizenship Card", value: "citizenshipcard" },
  { label: "Passport", value: "passport" },
  { label: "Birth Certificate", value: "birthcertificate" },
];

const DocumentUploadComponent = ({ onUpload }) => {
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [document, setDocument] = useState(null);

  const handleFileUpload = async () => {
    if (!documentType) {
      Toast.show({
        type: "error",
        text1: "Please select a document type before uploading.",
      });
      return;
    }

    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      const name = res.name;
      const ext = name.split(".").pop().toLowerCase();

      setDocumentName(name);
      setFileExtension(ext);
      setDocument(res);

      // Convert to base64 if needed (optional)
      if (onUpload) {
        onUpload({
          documentType,
          documentName: name,
          document: res,
          fileExtension: ext,
        });
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error("Document Picker Error:", err);
        Toast.show({
          type: "error",
          text1: "Failed to pick document.",
        });
      }
    }
  };

  return (
    <Container>
      {/* Document Type Picker */}
      <Label>Document Type</Label>
      <PickerWrapper>
        <Picker
          selectedValue={documentType}
          onValueChange={(itemValue) => setDocumentType(itemValue)}
          style={{
            color: "#ffffff",
            width: 450,
            backgroundColor: "transparent",
            height: Platform.OS === "ios" ? 200 : 50,
          }}
          dropdownIconColor="#ffffff"
        >
          <Picker.Item label="Select Document Type" value="" />
          {documentOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </PickerWrapper>

      {/* Upload Button */}
      <UploadButton onPress={handleFileUpload}>
        <ButtonText>Upload Document</ButtonText>
      </UploadButton>

      {/* File Name */}
      {/* <FileNameText>
        {documentName ? `File: ${documentName} (${fileExtension})` : "No file chosen"}
      </FileNameText> */}
    </Container>
  );
};

export default DocumentUploadComponent;
