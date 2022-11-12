import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import Stars from 'react-native-stars';

import { COLORS, SIZES, FONTS } from '../../../constants';
import {
  addRatingToDB,
  getRatingByUser,
} from '../../../services/shows-actions';

const StarRating = ({ userId, showId }) => {
  const [starsCount, setStarsCount] = useState(0);

  useEffect(() => {
    const getStars = async () => {
      const stars = await getRatingByUser(userId, showId);
      setStarsCount(stars);
    };
    getStars();
  }, []);

  const handleStarsChange = useCallback(
    (stars) => {
      addRatingToDB(userId, showId, stars);
      setStarsCount(stars);
    },
    [userId, showId]
  );

  return (
    <View style={{ paddingHorizontal: SIZES.l, marginTop: SIZES.xl }}>
      <View
        style={{ height: 1, width: '100%', backgroundColor: COLORS.gray }}
      />
      <View style={styles.container}>
        <Text style={styles.header}>How do you rate this show?</Text>
        <View style={{ alignItems: 'center' }}>
          <Stars
            default={starsCount}
            update={(value) => {
              handleStarsChange(value);
            }}
            spacing={10}
            starSize={32}
            count={5}
            fullStar={<FontAwesome name="star" size={32} color="#e3d924" />}
            emptyStar={<FontAwesome name="star-o" size={32} color="#e3d924" />}
            halfStar={
              <FontAwesome name="star-half-full" size={32} color="#e3d924" />
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.l,
    marginBottom: SIZES.xl,

    // backgroundColor: COLORS.darkGray,
  },
  //   row: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-around',
  //     marginBottom: SIZES.l,
  //   },
  //   row_item: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  header: {
    // paddingHorizontal: SIZES.m,
    textAlign: 'center',
    paddingBottom: SIZES.l,
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default StarRating;
