import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';

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
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: COLORS.transparentBlack,
        }}
      />
      <View
        style={{
          justifyContent: 'flex-end',
          backgroundColor: COLORS.background,
        }}
      >
        <Image
          source={{ uri: pickedEpisode?.images?.original }}
          style={{
            height: 200,
            width: '100%',
          }}
        />
        <View
          style={{
            paddingHorizontal: SIZES.l,
            paddingTop: SIZES.m,
            paddingBottom: SIZES.l,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text
                style={{
                  color: COLORS.primaryLight,
                  ...FONTS.h4,
                }}
              >
                S{pickedEpisode?.season}E{pickedEpisode?.episode}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                {pickedEpisode?.title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                pickEpisodeHandler(show, pickedEpisode);
              }}
            >
              {!isChecked && (
                <View
                  style={{
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 50,
                    padding: SIZES.s,
                  }}
                >
                  <AntDesign name="eye" size={30} color={COLORS.background} />
                </View>
              )}
              {isChecked && (
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 50,
                    padding: SIZES.xs,
                  }}
                >
                  <Ionicons
                    name="md-checkmark-sharp"
                    size={35}
                    color={COLORS.onDark}
                  />
                </View>
              )}
            </TouchableOpacity>
            {/* <BouncyCheckbox
              size={28}
              onPress={(isChecked) => {
                console.log(isChecked);
              }}
              fillColor={COLORS.primaryLighter}
              //   unfillColor="#FFFFFF"
            /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.s,
              marginBottom: SIZES.xs,
            }}
          >
            <AntDesign name="calendar" size={20} color={COLORS.primaryLight} />
            <Text
              style={{
                color: COLORS.lightGray,
                ...FONTS.body4,
                paddingLeft: SIZES.xs,
              }}
            >
              {pickedEpisode?.premiered}
            </Text>
            <View
              style={{
                width: SIZES.xl,
              }}
            />
            <Ionicons
              name="ios-time-outline"
              size={20}
              color={COLORS.primaryLight}
            />
            <Text
              style={{
                color: COLORS.lightGray,
                ...FONTS.body4,
                paddingLeft: SIZES.xs,
              }}
            >
              {pickedEpisode?.runtime} min
            </Text>
            <View
              style={{
                width: SIZES.xl,
              }}
            />
            <AntDesign name="star" size={16} color={COLORS.primaryLight} />
            <Text
              style={{
                color: COLORS.lightGray,
                ...FONTS.body4,
                paddingLeft: SIZES.xs,
              }}
            >
              {pickedEpisode?.rating}
            </Text>
          </View>
          <Text style={{ color: COLORS.onDark, ...FONTS.body4 }}>
            {pickedEpisode?.desc}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default EpisodeModal;
