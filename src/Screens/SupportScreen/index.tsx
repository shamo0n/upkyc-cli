import React from 'react';
import { Linking, View, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../components/Routes';
import AppHeader from '../../components/AppHeader';
import LogoImage from '../../Assets/images/up-logo.png';

import {
  PageContainer,
  SupportBox,
  LogoContainer,
  Heading,
  InfoCard,
  InfoText,
  BgImg,
} from './style';

type SupportScreenRouteProp = RouteProp<RootStackParamList, 'SupportScreen'>;

const companyEmail = 'admin@liveexshield.co';
const companyPhone = '+1 (416) 684 6622';

const SupportScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SupportScreenRouteProp>();
  const statusId = route.params?.statusId || '';

  const handleBack = () => navigation.navigate('Dashboard', { statusId });
  const handleEmailPress = () => Linking.openURL(`mailto:${companyEmail}`);
  const handlePhonePress = () => Linking.openURL(`tel:${companyPhone}`);

  return (
    <BgImg source={require('../../Assets/images/mobilebg.jpg')}>
      <AppHeader showBack={true} onBackPress={handleBack} />
      <PageContainer>
        <SupportBox>
          <LogoContainer source={LogoImage} resizeMode="contain" />
          <Heading>We’re Here to Help</Heading>

          <View style={{ marginTop: Platform.OS === 'ios' ? 40 : 30 }}>
            <InfoCard onPress={handleEmailPress}>
              <Icon name="envelope" size={18} color="#fff" />
              <InfoText>{companyEmail}</InfoText>
            </InfoCard>

            <InfoCard onPress={handlePhonePress}>
              <Icon name="phone" size={18} color="#fff" />
              <InfoText>{companyPhone}</InfoText>
            </InfoCard>
          </View>
        </SupportBox>
      </PageContainer>
    </BgImg>
  );
};

export default SupportScreen;
