// components/AppHeader.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void; // optional custom back action
}

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 12px;
`;
const BackText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-left: 8px;
`;
const AppHeader: React.FC<AppHeaderProps> = ({
  title = '',
  showBack = true,
  onBackPress,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) onBackPress();
    else navigation.goBack();
  };

  return (
    <HeaderContainer>
      {showBack && (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={handleBack}
        >
          <FontAwesome name="arrow-left" size={16} color="#fff" />
          <BackText>Back</BackText>
        </TouchableOpacity>
      )}
      {!showBack && title && <HeaderTitle>{title}</HeaderTitle>}
    </HeaderContainer>
  );
};

export default AppHeader;
