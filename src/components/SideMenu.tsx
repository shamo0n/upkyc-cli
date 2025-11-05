import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

interface SideMenuProps {
  customerProfile: any;
  onClose: () => void;
  onProfileClick: () => void;
  onOnboardingClick: () => void;
  onKycClick: () => void;
  handleProfileClick: () => void;
  onCamloClick: () => void;
  onSupportClick: () => void;
  onLogoutClick: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  customerProfile,
  onClose,
  onProfileClick,
  onOnboardingClick,
  onKycClick,
  onCamloClick,
  onSupportClick,
  onLogoutClick,
}) => {
  console.log('customerProfile', customerProfile);
  const profileImage = customerProfile?.SELFIE_URL;

  return (
    <View style={styles.menuContainer}>
      {/* Header Row (Arrow + Profile Image) */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>

        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
            onError={e => {
              console.warn('Failed to load selfie:', e.nativeEvent.error);
            }}
          />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Icon name="user" size={30} color="#fff" />
          </View>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.menuList}>
        <TouchableOpacity onPress={onProfileClick}>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onOnboardingClick}>
          <Text style={styles.menuItem}>Onboarding</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onKycClick}>
          <Text style={styles.menuItem}>KYC</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onCamloClick}>
          <Text style={styles.menuItem}>CAMLO</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onSupportClick}>
          <Text style={styles.menuItem}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogoutClick}>
          <Text style={[styles.menuItem, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth * 0.65,
    height: windowHeight,
    backgroundColor: 'rgba(42,71,56,0.95)',
    padding: 10,
    zIndex: 9999,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // left-right alignment
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profilePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3d5d4a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 12,
  },
});

export default SideMenu;
