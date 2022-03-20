import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const HeroDetails = ({ loadedImages, loadedSeasons, loadedShow }) => {
  return (
    <View>
      <ImageBackground
        source={{ uri: loadedImages?.backgroundImg.url }}
        style={{ width: '100%', height: 220 }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          start={{ x: 0.0, y: 0.4 }}
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
      <View style={{}}>
        <TouchableOpacity
          style={{
            marginHorizontal: SIZES.m,
            marginVertical: SIZES.xs,
            paddingHorizontal: SIZES.l,
            paddingVertical: SIZES.xs,
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: SIZES.s,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
          }}
          onPress={() => {}}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            Add to my shows
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeroDetails;
