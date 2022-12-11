import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { SIZES, FONTS, COLORS } from '../../../constants/theme';
import LogoutModal from './LogoutModal';
import PremiumModal from './PremiumModal';

const SettingsDropdown = ({ userId, settingsOpen, setSettingsOpen }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);

  return (
    <>
      <LogoutModal
        modalVisible={logoutModalVisible}
        setModalVisible={setLogoutModalVisible}
      />
      <PremiumModal
        userId={userId}
        modalVisible={premiumModalVisible}
        setModalVisible={setPremiumModalVisible}
      />
      <TouchableOpacity
        onPress={() => {
          setSettingsOpen((prev) => !prev);
        }}
        style={{ position: 'absolute', top: 0, right: 0, padding: 20 }}
      >
        <Feather name="settings" size={24} color="white" />
      </TouchableOpacity>
      {settingsOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => {
              setLogoutModalVisible(true);
              setSettingsOpen(false);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 5,
            }}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text
              style={{
                ...FONTS.h4,
                paddingLeft: 3,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPremiumModalVisible(true);
              setSettingsOpen(false);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 5,
            }}
          >
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text
              style={{
                ...FONTS.h4,
                paddingLeft: 3,
              }}
            >
              Get premium
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 150,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: COLORS.onDark,
    zIndex: 999,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: SIZES.xxl,
    paddingBottom: SIZES.l,
    alignItems: 'center',
  },
});

export default SettingsDropdown;
