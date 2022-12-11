import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';

import { SIZES, FONTS, COLORS } from '../../../constants/theme';
import { authActions } from '../../../store/auth-slice';
import { showsActions } from '../../../store/shows-slice';

const LogoutModal = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(authActions.removeCurrentUser());
      dispatch(showsActions.resetList());
    } catch (err) {
      console.error('logout error: ', err);
    }
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
            Are you sure you want to log out?
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
              onPress={logoutHandler}
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

export default LogoutModal;
