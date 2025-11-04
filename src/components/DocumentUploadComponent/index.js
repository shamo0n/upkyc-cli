import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import {
  Container,
  Label,
  UploadButton,
  ButtonText,
  FileNameText,
  PickerWrapper,
} from './style';

const documentOptions = [
  { label: 'Citizenship Card', value: 'citizenshipcard' },
  { label: 'Passport', value: 'passport' },
  { label: 'Birth Certificate', value: 'birthcertificate' },
];

const DocumentUploadComponent = ({ onUpload }) => {
  const [open, setOpen] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [items, setItems] = useState(documentOptions);

  const [documentName, setDocumentName] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const [document, setDocument] = useState(null);

  const handleFileUpload = async () => {
    console.log('documentType', documentType);
    if (!documentType) {
      Toast.show({
        type: 'error',
        text1: 'Please select a document type before uploading.',
      });
      return;
    }

    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      const name = res.name;
      const ext = name.split('.').pop().toLowerCase();

      setDocumentName(name);
      setFileExtension(ext);
      setDocument(res);

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
        console.error('Document Picker Error:', err);
        Toast.show({
          type: 'error',
          text1: 'Failed to pick document.',
        });
      }
    }
  };

  return (
    <Container>
      <Label>Document Type</Label>
      <PickerWrapper>
        <DropDownPicker
          open={open}
          value={documentType}
          items={items}
          setOpen={setOpen}
          setValue={value => {
            if (typeof value === 'function') {
              setDocumentType(value(documentType));
            } else {
              setDocumentType(value);
            }
          }}
          setItems={setItems}
          placeholder="Select Document Type"
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
            color: '#355042',
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
          listMessageContainerStyle={{
            backgroundColor: 'transparent', // or any background you prefer
          }}
          listMessageTextStyle={{
            color: '#4F6659', // custom text color
            fontSize: 14,
            fontWeight: '600',
          }}
          zIndex={9999}
        />
      </PickerWrapper>

      <UploadButton onPress={handleFileUpload}>
        <ButtonText>Upload Document</ButtonText>
      </UploadButton>

      <FileNameText>
        {documentName
          ? `File: ${documentName} (${fileExtension})`
          : 'No file chosen'}
      </FileNameText>
    </Container>
  );
};

export default DocumentUploadComponent;
