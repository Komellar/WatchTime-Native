import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Characters = ({ characters, title }) => {
  return (
    <View style={{ marginTop: SIZES.xl }}>
      <Text style={styles.header}>Charaters from {title}</Text>
      <FlatList
        data={characters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.idCharacter}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginLeft: index === 0 ? SIZES.m : 10,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: item?.characterImage }}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.text}>{item?.characterName}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SIZES.m,
    paddingBottom: SIZES.s,
    color: COLORS.white,
    ...FONTS.h3,
  },
  image: {
    height: 200,
    width: 135,
    marginBottom: SIZES.xs,
    borderRadius: 3,
  },
  text: {
    width: 135,
    textAlign: 'center',
    color: COLORS.onDark,
    ...FONTS.body4,
  },
});
