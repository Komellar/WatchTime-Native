import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Actors = ({ actors }) => {
  return (
    <View style={{ marginTop: SIZES.xl }}>
      <Text style={styles.header}>Cast</Text>
      <FlatList
        data={actors}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginLeft: index === 0 ? SIZES.m : 6,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: item?.actorImage }}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.text}>{item?.actorName}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Actors;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SIZES.m,
    paddingBottom: SIZES.s,
    color: COLORS.white,
    ...FONTS.h3,
  },
  image: {
    height: 130,
    width: 90,
    marginBottom: SIZES.xs,
    borderRadius: 10,
  },
  text: {
    width: 90,
    textAlign: 'center',
    color: COLORS.lightGray,
    ...FONTS.body5,
  },
});
