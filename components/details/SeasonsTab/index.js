import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, SIZES, FONTS } from '../../../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  getWatchedEpisodes,
  addSeasonToDB,
  addShowToDB,
  removeSeasonFromDB,
} from '../../../services/shows-actions';
import { useDispatch } from 'react-redux';

const SeasonsTab = ({
  seasons,
  show,
  navigation,
  userId,
  followed,
  numberOfEpisodes,
}) => {
  const [watchedEpisodes, setWatchedEpisodes] = useState({});
  const dispatch = useDispatch();

  // add whole season to database and watchedEpisodes object
  const addAllEpisodesHandler = (season, seasonNum) => {
    if (userId == null) {
      navigation.push('Auth');
      return;
    }
    if (!followed) {
      dispatch(addShowToDB(userId, show, numberOfEpisodes));
    }

    let unseenEpisodes = season.filter(
      (episode) => !watchedEpisodes[`s${seasonNum}`]?.includes(episode.id)
    );

    unseenEpisodes.length === 0
      ? removeSeasonFromDB(userId, show, season)
      : addSeasonToDB(userId, show, unseenEpisodes);

    const episodes = getWatchedEpisodes(userId, show, season[0]?.season);
    setWatchedEpisodes({
      ...watchedEpisodes,
      [`s${seasonNum}`]: episodes,
    });
  };

  // get watched episodes and assign them to watchedEpisodes object
  useEffect(() => {
    if (userId != null) {
      let watchedSeasons = {};
      seasons.forEach((season, index) => {
        watchedSeasons = {
          ...watchedSeasons,
          [`s${index + 1}`]: getWatchedEpisodes(
            userId,
            show,
            season[0]?.season
          ),
        };
      });
      setWatchedEpisodes(watchedSeasons);
    }
  }, [userId, show, seasons, getWatchedEpisodes]);

  return (
    <View style={{ flex: 1 }}>
      {!seasons && <Text>No seasons</Text>}
      {seasons && (
        <View style={{ marginTop: SIZES.xxl, marginHorizontal: SIZES.m }}>
          {seasons.map((season, index) => (
            <View key={index}>
              {season[0] && (
                <View style={styles.container}>
                  <View style={styles.firstCol}>
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

                    {/* Season number */}
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push('Episodes', {
                          season: season,
                          show: show,
                          userId: userId,
                          followed: followed,
                          numberOfEpisodes: numberOfEpisodes,
                        });
                      }}
                      style={styles.seasonNumContainer}
                    >
                      <Text style={styles.seasonNum}>Season {index + 1}</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Episodes', {
                        season: season,
                        show: show,
                        userId: userId,
                        followed: followed,
                        numberOfEpisodes: numberOfEpisodes,
                      });
                    }}
                    style={styles.secondCol}
                  >
                    {/* Progress bar */}
                    <View style={styles.progressBarBg}>
                      <View
                        style={{
                          ...styles.progressBarFill,
                          width:
                            ((watchedEpisodes[`s${index + 1}`]?.length ?? 0) /
                              season?.length) *
                              100 +
                            '%',
                          borderRadius:
                            watchedEpisodes[`s${index + 1}`]?.length ===
                            season?.length
                              ? SIZES.l
                              : 0,
                        }}
                      />
                    </View>

                    {/* Watched episodes */}
                    <Text style={styles.watchedEpisodes}>
                      {watchedEpisodes[`s${index + 1}`]?.length ?? 0}/
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
              <View style={styles.divider} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default SeasonsTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: SIZES.s,
    paddingLeft: SIZES.xs,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  firstCol: {
    flexDirection: 'row',
    marginVertical: SIZES.l,
    paddingLeft: SIZES.xs,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  seasonNumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingRight: SIZES.l,
    paddingLeft: SIZES.xs,
  },
  seasonNum: {
    color: COLORS.onDark,
    ...FONTS.body2,
  },
  secondCol: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  progressBarBg: {
    width: '70%',
    height: 16,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.l,
    marginRight: SIZES.l,
  },
  progressBarFill: {
    height: 16,
    backgroundColor: COLORS.primaryLight,
    borderBottomLeftRadius: SIZES.l,
    borderTopLeftRadius: SIZES.l,
  },
  watchedEpisodes: {
    color: COLORS.onDark,
    ...FONTS.body3,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.gray,
  },
});
