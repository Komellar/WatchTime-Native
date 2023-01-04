import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';
import { SIZES, COLORS, FONTS } from '../../../constants';

const GalleryTab = ({ images }) => {
  const posters = images?.allImages?.filter((img) => img.type === 'poster');
  const backgrounds = images?.allImages?.filter(
    (img) => img.type === 'background'
  );

  return (
    <View style={{ marginBottom: SIZES.xl }}>
      <Text style={styles.headerPosters}>Posters</Text>
      <FlatList
        data={posters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.imgId}
        renderItem={({ item }) => (
          <Image source={{ uri: item?.url }} style={styles.imageVertical} />
        )}
      />
      <Text style={styles.headerBackgrounds}>Backgrounds</Text>
      <FlatList
        data={backgrounds}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.imgId}
        renderItem={({ item }) => (
          <Image source={{ uri: item?.url }} style={styles.imageHorizontal} />
        )}
      />
    </View>
  );
};

export default GalleryTab;

const styles = StyleSheet.create({
  headerPosters: {
    color: COLORS.white,
    ...FONTS.h3,
    paddingLeft: SIZES.m,
    paddingTop: SIZES.xl,
    paddingBottom: SIZES.m,
  },
  imageVertical: { width: 150, height: 220, marginHorizontal: 3 },
  headerBackgrounds: {
    color: COLORS.white,
    ...FONTS.h3,
    paddingLeft: SIZES.m,
    paddingTop: SIZES.xxl,
    paddingBottom: SIZES.m,
  },
  imageHorizontal: { width: 220, height: 150, marginHorizontal: 3 },
});
