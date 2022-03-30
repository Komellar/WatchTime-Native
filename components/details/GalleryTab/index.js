import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { SIZES, COLORS, FONTS } from '../../../constants';

const GalleryTab = ({ images }) => {
  const posters = images?.allImages?.filter((img) => img.type === 'poster');
  const backgrounds = images?.allImages?.filter(
    (img) => img.type === 'background'
  );

  return (
    <View style={{ marginBottom: SIZES.xl }}>
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          paddingLeft: SIZES.m,
          paddingTop: SIZES.xl,
          paddingBottom: SIZES.m,
        }}
      >
        Posters
      </Text>
      <FlatList
        data={posters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.imgId}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item?.url }}
            style={{ width: 150, height: 220, marginHorizontal: 3 }}
          />
        )}
      />
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          paddingLeft: SIZES.m,
          paddingTop: SIZES.xxl,
          paddingBottom: SIZES.m,
        }}
      >
        Backgrounds
      </Text>
      <FlatList
        data={backgrounds}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.imgId}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item?.url }}
            style={{ width: 220, height: 150, marginHorizontal: 3 }}
          />
        )}
      />
    </View>
  );
};

export default GalleryTab;
