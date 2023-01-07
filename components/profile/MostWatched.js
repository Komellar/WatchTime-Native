import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SIZES, FONTS } from '../../constants';
import { getMostWatchedShow } from '../../services/shows-actions';

const MostWatched = ({ userId }) => {
  const mostWatched = useSelector((state) => state.stats.mostWatched);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== null) {
      dispatch(getMostWatchedShow(userId));
    }
  }, [userId, getMostWatchedShow]);

  return (
    <>
      {mostWatched && (
        <View style={styles.container}>
          <Text style={styles.header}>Most Watched Episodes</Text>
          <View style={styles.contentWrapper}>
            <Text style={styles.mostWatched}>{mostWatched?.watchedCount}</Text>
            <Text style={styles.episodesOf}>EPISODES OF</Text>
            <Image source={{ uri: mostWatched?.image }} style={styles.img} />
          </View>
        </View>
      )}
    </>
  );
};

export default MostWatched;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundLight,
    width: (SIZES.width * 95) / 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: SIZES.xl,
    paddingVertical: SIZES.xl,
    borderRadius: SIZES.s,
  },
  header: {
    color: COLORS.white,
    ...FONTS.h3,
    paddingBottom: SIZES.l,
    alignSelf: 'center',
  },
  contentWrapper: {
    width: (SIZES.width * 85) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mostWatched: {
    color: COLORS.primaryLight,
    ...FONTS.h1,
    fontSize: 50,
    lineHeight: 56,
  },
  episodesOf: {
    color: COLORS.onDark,
    ...FONTS.h5,
    marginHorizontal: SIZES.s,
  },
  img: {
    height: ((SIZES.width * 32) / 100) * 1.41,
    width: (SIZES.width * 32) / 100,
    borderRadius: 3,
    resizeMode: 'contain',
  },
});
