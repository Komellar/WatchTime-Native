import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import heroImage from '../../assets/heroProfile.jpg';
import { useSelector } from 'react-redux';
import { SvgUri } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { SIZES, FONTS, COLORS } from '../../constants/theme';

const HeroProfile = ({ statistics }) => {
  const userImg = useSelector((state) => state.auth.userImg);
  const userName = useSelector((state) => state.auth.userName);

  const convertedTimeSpent = `${Math.floor(statistics.timeSpent / 60)}h ${
    statistics.timeSpent % 60
  }min`;

  return (
    <View
      style={{
        width: SIZES.width,
        height: 450,
        marginBottom: SIZES.m,
      }}
    >
      <ImageBackground
        source={heroImage}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)', COLORS.background]}
          locations={[0.0, 0.9, 1]}
          style={{ flex: 1, width: '100%', height: '100%' }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{ width: 120, height: 120 }}>
              {userImg && <SvgUri width="100%" height="100%" uri={userImg} />}
            </View>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
                textShadowColor: '#000',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 20,
              }}
            >
              {userName ?? ''}
            </Text>

            {/* Stats */}
            <View
              style={{
                backgroundColor: COLORS.gray,
                width: (SIZES.width * 85) / 100,
                marginVertical: SIZES.xs,
                marginTop: SIZES.l,
                paddingVertical: SIZES.m,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: SIZES.m,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                  marginBottom: SIZES.xs,
                }}
              >
                Watched episodes
              </Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primaryLight }}>
                {statistics.episodesCount}
              </Text>
            </View>
            {/*  */}
            <View
              style={{
                width: (SIZES.width * 85) / 100,
                backgroundColor: COLORS.gray,
                marginVertical: SIZES.xs,
                paddingVertical: SIZES.m,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: SIZES.m,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                  marginBottom: SIZES.xs,
                }}
              >
                Time spent on watching
              </Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primaryLight }}>
                {convertedTimeSpent}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default HeroProfile;
