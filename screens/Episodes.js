import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLORS, SIZES, FONTS } from '../constants';
import EpisodeModal from '../components/episodes/EpisodeModal';
import { Ionicons } from '@expo/vector-icons';

const Episodes = ({ navigation, route }) => {
  const { season } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [pickedEpisode, setPickedEpisode] = useState(null);

  // console.log(season);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: SIZES.l,
      }}
    >
      {/* Modal with episode detail info */}
      <EpisodeModal
        pickedEpisode={pickedEpisode}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.m,
        }}
      >
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <Text
          style={{ paddingLeft: SIZES.m, color: COLORS.white, ...FONTS.h3 }}
        >
          Season {season[0].season}
        </Text>
      </View>

      {/* Progress bar */}
      <View
        style={{
          width: '80%',
          height: SIZES.xl,
          alignSelf: 'center',
          marginVertical: SIZES.l,
          backgroundColor: COLORS.gray,
          borderRadius: SIZES.l,
        }}
      >
        <View
          style={{
            width: '10%',
            height: SIZES.xl,
            backgroundColor: COLORS.primaryLighter,
            // borderRadius: isFullyWatched ? SIZES.l : 0,
            borderBottomLeftRadius: SIZES.l,
            borderTopLeftRadius: SIZES.l,
          }}
        />
      </View>

      {/* Episodes */}
      <FlatList
        data={season}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: SIZES.m,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPickedEpisode(item);
                  setModalVisible(true);
                }}
                style={{ flex: 1 }}
              >
                <Text
                  style={{
                    color: COLORS.onDark,
                    ...FONTS.h4,
                    fontSize: 18,
                    paddingBottom: 2,
                  }}
                >
                  {item?.title}
                </Text>
                <Text style={{ color: COLORS.lightGray, ...FONTS.body3 }}>
                  S{item?.season}E{item?.episode}
                </Text>
              </TouchableOpacity>
              <BouncyCheckbox
                size={28}
                onPress={(isChecked) => {
                  console.log(isChecked);
                }}
                fillColor={COLORS.primaryLight}
              />
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.gray,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Episodes;
