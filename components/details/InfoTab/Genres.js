import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Genres = ({ loadedGenres }) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={loadedGenres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `genre-${item}`}
        renderItem={({ item }) => (
          <View style={styles.pill}>
            <Text style={styles.pillText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: SIZES.xl,
    alignItems: 'center',
  },
  pill: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: SIZES.xl,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.s,
    marginRight: SIZES.s,
  },
  pillText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default Genres;
