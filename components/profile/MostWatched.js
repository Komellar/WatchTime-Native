import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, SIZES, FONTS } from '../../constants';
import { getMostWatchedShow } from '../../services/shows-actions';
import { useDispatch, useSelector } from 'react-redux';

const MostWatched = ({ userId }) => {
  const mostWatched = useSelector((state) => state.stats.mostWatched);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== null) {
      dispatch(getMostWatchedShow(userId));
    }
  }, [userId, getMostWatchedShow]);

  return (
    <View
      style={{
        backgroundColor: COLORS.backgroundLight,
        width: (SIZES.width * 95) / 100,
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: SIZES.xl,
        paddingVertical: SIZES.xl,
        borderRadius: SIZES.s,
      }}
    >
      {mostWatched && (
        <View style={{}}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
              paddingBottom: SIZES.l,
              alignSelf: 'center',
            }}
          >
            Most Watched Episodes
          </Text>
          <View
            style={{
              width: (SIZES.width * 85) / 100,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: COLORS.primaryLight,
                ...FONTS.h1,
                fontSize: 50,
                lineHeight: 56,
              }}
            >
              {mostWatched?.watchedCount}
            </Text>
            <Text
              style={{
                color: COLORS.onDark,
                ...FONTS.h5,
                marginHorizontal: SIZES.s,
              }}
            >
              EPISODES OF
            </Text>
            <Image
              source={{ uri: mostWatched?.image }}
              style={{
                height: ((SIZES.width * 32) / 100) * 1.41,
                width: (SIZES.width * 32) / 100,
                borderRadius: 3,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default MostWatched;
