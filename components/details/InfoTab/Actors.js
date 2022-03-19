import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Actors = ({ actors }) => {
  return (
    <View style={{ marginTop: SIZES.xl }}>
      <Text
        style={{
          paddingHorizontal: SIZES.m,
          paddingBottom: SIZES.s,
          color: COLORS.white,
          ...FONTS.h3,
        }}
      >
        Cast
      </Text>
      <FlatList
        data={actors}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginLeft: index === 0 ? SIZES.m : 6,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: item.actorImage }}
              resizeMode="cover"
              style={{
                height: 130,
                width: 90,
                marginBottom: SIZES.xs,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                width: 90,
                textAlign: 'center',
                color: COLORS.lightGray,
                ...FONTS.body5,
              }}
            >
              {item.actorName}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Actors;
