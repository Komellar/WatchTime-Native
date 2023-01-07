import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';

import { SIZES, FONTS } from '../../../constants/theme';
import { authActions } from '../../../store/auth-slice';
import { showsActions } from '../../../store/shows-slice';
import { statsActions } from '../../../store/stats-slice';

const LogoutModal = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(authActions.removeCurrentUser());
      dispatch(showsActions.resetList());
      dispatch(statsActions.resetGenres());
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
          <Text style={styles.description}>
            Are you sure you want to log out?
          </Text>
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.btn}
            >
              <Text style={styles.btnText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logoutHandler} style={styles.btn}>
              <Text style={styles.btnText}>YES</Text>
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
  description: { ...FONTS.body3, marginBottom: SIZES.xs },
  buttonsWrapper: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
  },
  btn: { margin: SIZES.m },
  btnText: { ...FONTS.h4 },
});

export default LogoutModal;
