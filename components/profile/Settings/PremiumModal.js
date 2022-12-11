import {
  View,
  Text,
  Modal,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SIZES, FONTS } from '../../../constants/theme';
import { setUserAsPremium } from '../../../services/auth-actions';

const PremiumModal = ({ userId, modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const isUserPremium = useSelector((state) => state.auth.isPremium);

  useEffect(() => {
    if (isUserPremium && modalVisible) {
      setModalVisible(false);
      ToastAndroid.showWithGravityAndOffset(
        'You already have a premium account!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }, [isUserPremium, modalVisible]);

  const handleBuyPremium = () => {
    setModalVisible(false);

    dispatch(setUserAsPremium(userId));

    ToastAndroid.showWithGravityAndOffset(
      'Welcome in premium family!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ ...FONTS.body3, marginBottom: SIZES.xs }}>
            Do you want to upgrade your account to&nbsp;
            <Text style={{ ...FONTS.body3, fontWeight: 'bold' }}>
              premium
            </Text>{' '}
            for only&nbsp;
            <Text style={{ ...FONTS.body3, fontWeight: 'bold' }}>9.99 PLN</Text>
            ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: 120,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ margin: SIZES.m }}
            >
              <Text style={{ ...FONTS.h4 }}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBuyPremium}
              style={{ margin: SIZES.m }}
            >
              <Text style={{ ...FONTS.h4 }}>YES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default PremiumModal;
