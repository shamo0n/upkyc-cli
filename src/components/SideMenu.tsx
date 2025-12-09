import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AbstractBackgroundGradient from '../components/AbstractBackgroundGradient';
import AbstractBackgroundSvg from '../components/AbstractBackgroundSvg';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const SideMenu = ({
  customerProfile,
  onClose,
  onProfileClick,
  onOnboardingClick,
  onKycClick,
  onSupportClick,
  onLogoutClick,
}) => {
  const profileImage = customerProfile?.SELFIE_URL;
  console.log('customerProfile', customerProfile);
  return (
    <View style={styles.menuContainer}>
      <AbstractBackgroundGradient />

      {/* Header */}
      <TouchableOpacity onPress={onClose} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Profile */}
      <View style={styles.profileSection}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Icon name="user" size={28} color="#fff" />
          </View>
        )}

        <Text style={styles.profileName}>
          {customerProfile?.FirstName} {customerProfile?.LastName}
        </Text>
      </View>

      <View style={styles.separator} />

      {/* Menu Items */}
      <View style={styles.menuList}>
        <Pressable style={styles.menuRow} onPress={onProfileClick}>
          <Icon name="user" size={18} color="#e0e0e0" />
          <Text style={styles.menuItem}>Profile</Text>
        </Pressable>

        <Pressable style={styles.menuRow} onPress={onOnboardingClick}>
          <Icon name="clipboard" size={18} color="#e0e0e0" />
          <Text style={styles.menuItem}>Onboarding</Text>
        </Pressable>

        <Pressable style={styles.menuRow} onPress={onKycClick}>
          <Icon name="shield" size={18} color="#e0e0e0" />
          <Text style={styles.menuItem}>KYC</Text>
        </Pressable>

        <Pressable style={styles.menuRow} onPress={onSupportClick}>
          <Icon name="help-circle" size={18} color="#e0e0e0" />
          <Text style={styles.menuItem}>Support</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.menuRow} onPress={onLogoutClick}>
          <Icon name="log-out" size={18} color="red" />
          <Text style={[styles.menuItem, { color: 'red' }]}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth * 0.7,
    height: windowHeight,
    backgroundColor: '#2a4738',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 35,
  },

  backButton: {
    marginBottom: 25,
  },

  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3d5d4a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileName: {
    color: '#fff',
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
  },

  separator: {
    height: 1,
    backgroundColor: '#3a5b49',
    marginVertical: 15,
  },

  menuList: {
    // flexGrow: 1,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  menuItem: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },

  footer: {
    marginBottom: 25,
  },
});

export default SideMenu;
