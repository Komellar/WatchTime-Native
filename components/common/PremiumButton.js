import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SIZES, FONTS } from '../../constants';
import PremiumModal from '../profile/Settings/PremiumModal';

const PremiumButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  return (
    <>
      <PremiumModal
        userId={userId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity
        style={{
          marginHorizontal: SIZES.xxxl,
          marginVertical: SIZES.xl,
          paddingVertical: SIZES.l,
          borderWidth: 1,
          borderColor: COLORS.primaryDark,
          borderRadius: SIZES.s,
          backgroundColor: COLORS.primaryDark,
          alignItems: 'center',
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
          Get premium to unlock
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default PremiumButton;
