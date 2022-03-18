import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { SIZES, FONTS, COLORS } from '../../constants/theme';

const Hero = ({ loadedImages, loadedShow, navigation }) => {
  const trimmedDesc = loadedShow?.description
    ?.replace(/<[^>]+>/g, '')
    .substr(0, 100);

  const convertedDesc = trimmedDesc
    ?.substr(0, Math.min(trimmedDesc?.length, trimmedDesc?.lastIndexOf(' ')))
    .concat(' ...');

  return (
    <View
      style={{
        width: '100%',
        height: 550,
        marginBottom: SIZES.m,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            selectedShow: loadedShow,
          })
        }
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ImageBackground
          source={{ uri: loadedImages?.posterImg.url }}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
          imageStyle={{
            resizeMode: 'cover',
          }}
        >
          <LinearGradient
            colors={['transparent', COLORS.background]}
            start={{ x: 0.0, y: 0.4 }}
            locations={[0.0, 0.85]}
            style={{ flex: 1, width: '100%', height: '100%' }}
          >
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: SIZES.l,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  paddingBottom: SIZES.s,
                  textShadowColor: '#000',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 30,
                  ...FONTS.h1,
                }}
              >
                {loadedShow?.title}
              </Text>
              <Text
                style={{
                  color: COLORS.onDark,
                  textAlign: 'center',
                  paddingHorizontal: SIZES.s,
                  textShadowColor: 'rgb(0, 0, 0)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 20,
                  ...FONTS.body4,
                  lineHeight: 17,
                }}
              >
                {convertedDesc}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default Hero;
