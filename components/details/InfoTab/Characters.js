import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Characters = ({ cast, title }) => {
  const characters = cast?.map((person) => {
    return {
      id: person.idCharacter,
      image: person.characterImage,
      name: person.characterName,
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
        Charaters from {title}
      </Text>
      <FlatList
        data={characters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginLeft: index === 0 ? SIZES.m : 10,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: item.image }}
              resizeMode="cover"
              style={{
                height: 200,
                width: 135,
                marginBottom: SIZES.xs,
                borderRadius: 3,
              }}
            />
            <Text
              style={{
                width: 135,
                textAlign: 'center',
                color: COLORS.onDark,
                ...FONTS.body4,
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

export default Characters;
