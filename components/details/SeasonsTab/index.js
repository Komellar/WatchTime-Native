import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLORS, SIZES, FONTS } from '../../../constants';

import { MaterialIcons } from '@expo/vector-icons';

const SeasonsTab = ({ seasons, show, navigation, userId, followed }) => {
  // const [pickedSeason, setPickedSeason] = useState(1);

  const addAllEpisodesHandler = (season) => {
    let unseenEpisodes = season.filter(
      (episode) => !watchedEpisodes.includes(episode.id)
    );
    addSeasonToDB(userId, show, unseenEpisodes);
  };

  return (
    <View style={{ flex: 1 }}>
      {!seasons && <Text>No seasons</Text>}
      {seasons && (
        <View style={{ marginTop: SIZES.xxl, marginHorizontal: SIZES.m }}>
          {/* Seasons  */}
          {seasons.map((season, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: SIZES.l,
                  paddingLeft: SIZES.xs,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <BouncyCheckbox
                  onPress={(isChecked) => {
                    addAllEpisodesHandler(season);
                  }}
                  fillColor={COLORS.primaryLight}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Episodes', {
                      season: season,
                      show: show,
                      userId: userId,
                      followed: followed,
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.onDark,
                      ...FONTS.body2,
                      paddingRight: SIZES.l,
                    }}
                  >
                    Season {index + 1}
                  </Text>
                  <View
                    style={{
                      width: 110,
                      height: SIZES.m,
                      backgroundColor: COLORS.gray,
                      borderRadius: SIZES.l,
                      marginRight: SIZES.l,
                    }}
                  >
                    <View
                      style={{
                        width: '10%',
                        height: SIZES.m,
                        backgroundColor: COLORS.primaryLighter,
                        // borderRadius: isFullyWatched ? SIZES.l : 0,
                        borderBottomLeftRadius: SIZES.l,
                        borderTopLeftRadius: SIZES.l,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: COLORS.onDark,
                      ...FONTS.body3,
                    }}
                  >
                    0/{season.length}
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={COLORS.lightGray}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: COLORS.gray,
                }}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default SeasonsTab;
