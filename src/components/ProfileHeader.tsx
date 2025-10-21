import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/Routes';

interface ProfileHeaderProps {
  profilePic?: string;
  fullName?: string;
}

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
`;

const BackText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const ProfileImage = styled.Image`
  width: 85px;
  height: 85px;
  border-radius: 42.5px;
  margin-bottom: 10px;
`;

const ProfileName = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profilePic,
  fullName,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  console.log('FUCK*****profilePic', profilePic);
  if (!profilePic) {
    return (
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <BackText>Back</BackText>
        </TouchableOpacity>
      </HeaderContainer>
    );
  }
  const isUrl =
    profilePic.startsWith('http://') || profilePic.startsWith('https://');

  return (
    <>
      <ProfileImage
        source={
          isUrl
            ? { uri: profilePic }
            : { uri: `data:image/jpeg;base64,${profilePic}` }
        }
      />
      <ProfileName>{fullName}</ProfileName>
    </>
  );
};

export default ProfileHeader;
