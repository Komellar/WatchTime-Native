import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../../../constants';

const EpisodeModal = ({
  pickedEpisode,
  modalVisible,
  setModalVisible,
  pickEpisodeHandler,
  show,
  watchedEpisodes,
}) => {
  const isChecked = watchedEpisodes?.includes(pickedEpisode?.id);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.background}
      />
      <View style={styles.foreground}>
        <Image
          source={{ uri: pickedEpisode?.images?.original }}
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.row}>
            <View>
              <Text style={styles.seasonAndEpisode}>
                S{pickedEpisode?.season}E{pickedEpisode?.episode}
              </Text>
              <Text style={styles.title}>{pickedEpisode?.title}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                pickEpisodeHandler(show, pickedEpisode);
              }}
            >
              {!isChecked && (
                <View style={styles.notCheckedIcon}>
                  <AntDesign name="eye" size={30} color={COLORS.background} />
                </View>
              )}
              {isChecked && (
                <View style={styles.checkedIcon}>
                  <Ionicons
                    name="md-checkmark-sharp"
                    size={35}
                    color={COLORS.onDark}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <AntDesign name="calendar" size={20} color={COLORS.primaryLight} />
            <Text style={styles.premiere}>{pickedEpisode?.premiered}</Text>
            <View style={{ width: SIZES.xl }} />
            <Ionicons
              name="ios-time-outline"
              size={20}
              color={COLORS.primaryLight}
            />
            <Text style={styles.runtime}>{pickedEpisode?.runtime} min</Text>
            <View style={{ width: SIZES.xl }} />
            <AntDesign name="star" size={16} color={COLORS.primaryLight} />
            <Text style={styles.rating}>{pickedEpisode?.rating}</Text>
          </View>
          <Text style={styles.desc}>{pickedEpisode?.desc}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default EpisodeModal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.transparentBlack,
  },
  foreground: {
    justifyContent: 'flex-end',
    backgroundColor: COLORS.background,
  },
  image: {
    height: 200,
    width: '100%',
  },
  content: {
    paddingHorizontal: SIZES.l,
    paddingTop: SIZES.m,
    paddingBottom: SIZES.l,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  seasonAndEpisode: {
    color: COLORS.primaryLight,
    ...FONTS.h4,
  },
  title: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  notCheckedIcon: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 50,
    padding: SIZES.s,
  },
  checkedIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: SIZES.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.s,
    marginBottom: SIZES.xs,
  },
  premiere: {
    color: COLORS.lightGray,
    ...FONTS.body4,
    paddingLeft: SIZES.xs,
  },
  runtime: {
    color: COLORS.lightGray,
    ...FONTS.body4,
    paddingLeft: SIZES.xs,
  },
  rating: {
    color: COLORS.lightGray,
    ...FONTS.body4,
    paddingLeft: SIZES.xs,
  },
  desc: { color: COLORS.onDark, ...FONTS.body4, marginBottom: SIZES.s },
});
