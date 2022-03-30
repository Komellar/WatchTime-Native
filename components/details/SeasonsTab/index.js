import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, SIZES, FONTS } from '../../../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  getWatchedEpisodes,
  addSeasonToDB,
  addShowToDB,
} from '../../../services/shows-actions';
import { useDispatch } from 'react-redux';

const SeasonsTab = ({
  seasons,
  show,
  navigation,
  userId,
  followed,
  changedSeason,
  episodesChanged,
}) => {
  const [watchedEpisodes, setWatchedEpisodes] = useState({});
  const dispatch = useDispatch();

  // add whole season to database and watchedEpisodes object
  const addAllEpisodesHandler = (season, seasonNum) => {
    if (!followed) {
      dispatch(addShowToDB(userId, show));
    }
    let unseenEpisodes = season.filter(
      (episode) => !watchedEpisodes[`s${seasonNum}`].includes(episode.id)
    );
    addSeasonToDB(userId, show, unseenEpisodes);
    setWatchedEpisodes({
      ...watchedEpisodes,
      [`s${seasonNum}`]: getWatchedEpisodes(userId, show, season[0]?.season),
    });
  };

  // get watched episodes and assign them to watchedEpisodes object
  useEffect(() => {
    let watchedSeasons = {};
    seasons.forEach((season, index) => {
      watchedSeasons = {
        ...watchedSeasons,
        [`s${index + 1}`]: getWatchedEpisodes(userId, show, season[0]?.season),
      };
    });
    setWatchedEpisodes(watchedSeasons);
  }, [userId, show, seasons, getWatchedEpisodes]);

  // if one user has watched episode in season - get the data and assign it to watchedEpisodes object
  useEffect(() => {
    if (changedSeason) {
      let watchedSeasons = {};
      watchedSeasons = {
        ...watchedEpisodes,
        [`s${changedSeason}`]: getWatchedEpisodes(userId, show, changedSeason),
      };
      setWatchedEpisodes(watchedSeasons);
    }
  }, [
    userId,
    show,
    seasons,
    getWatchedEpisodes,
    changedSeason,
    episodesChanged,
  ]);

  return (
    <View style={{ flex: 1 }}>
      {!seasons && <Text>No seasons</Text>}
      {seasons && (
        <View style={{ marginTop: SIZES.xxl, marginHorizontal: SIZES.m }}>
          {/* Seasons  */}
          {seasons.map((season, index) => (
            <View key={index}>
              {season[0] && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: SIZES.l,
                    paddingLeft: SIZES.xs,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  {/* Check Icon */}
                  <TouchableOpacity
                    onPress={() => addAllEpisodesHandler(season, index + 1)}
                    style={{ marginRight: SIZES.xs }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={35}
                      color={
                        watchedEpisodes[`s${index + 1}`]?.length ===
                        season.length
                          ? COLORS.primaryLight
                          : COLORS.lightGray
                      }
                    />
                  </TouchableOpacity>

                  {/* Rest of season row */}
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

                    {/* Progress bar */}
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
                          width:
                            (watchedEpisodes[`s${index + 1}`]?.length /
                              season?.length) *
                              100 +
                            '%',
                          height: SIZES.m,
                          backgroundColor: COLORS.primaryLight,
                          borderRadius:
                            watchedEpisodes[`s${index + 1}`]?.length ===
                            season?.length
                              ? SIZES.l
                              : 0,
                          borderBottomLeftRadius: SIZES.l,
                          borderTopLeftRadius: SIZES.l,
                        }}
                      />
                    </View>

                    {/* Watched episodes */}
                    <Text
                      style={{
                        color: COLORS.onDark,
                        ...FONTS.body3,
                      }}
                    >
                      {watchedEpisodes[`s${index + 1}`]?.length}/
                      {season?.length}
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color={COLORS.lightGray}
                    />
                  </TouchableOpacity>
                </View>
              )}

              {/* Divider */}
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
