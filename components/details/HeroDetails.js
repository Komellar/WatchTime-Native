import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const HeroDetails = ({ loadedImages, loadedSeasons, loadedShow }) => {
  return (
    <ImageBackground
      source={{ uri: loadedImages?.backgroundImg.url }}
      style={{ width: '100%', height: 220 }}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        start={{ x: 0.0, y: 0.5 }}
        locations={[0.0, 0.9]}
        style={{ width: '100%', height: '100%' }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingLeft: SIZES.l,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {loadedShow?.title}
          </Text>
          <Text
            style={{
              color: COLORS.onDark,
              paddingBottom: SIZES.s,
              ...FONTS.body3,
            }}
          >
            {loadedSeasons?.length} seasons | {loadedShow?.status}
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default HeroDetails;
