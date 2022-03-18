import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Actors = ({ cast }) => {
  const actors = cast?.map((person) => {
    return {
      id: person.id,
      image: person.actorImage,
      name: person.actorName,
      played: person.characterName,
    };
  });

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
              source={{ uri: item.image }}
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
                // color: COLORS.onDark,
                ...FONTS.body5,
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Actors;
