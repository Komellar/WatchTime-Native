import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS } from '../constants/';

import Svg1 from '../assets/onbard/svg-1.svg';
import Svg2 from '../assets/onbard/svg-2.svg';
import Svg3 from '../assets/onbard/svg-3.svg';
import Svg4 from '../assets/onbard/svg-4.svg';

import { SvgXml } from 'react-native-svg';

import Onboarding from 'react-native-onboarding-swiper';

const DoneBtn = ({ ...props }) => (
  <TouchableOpacity
    style={{
      marginHorizontal: SIZES.l,
      paddingHorizontal: SIZES.m,
      paddingVertical: 2,
      //   backgroundColor: COLORS.primary,
      borderWidth: 1,
      borderRadius: SIZES.xs,
      borderColor: COLORS.white,
    }}
    {...props}
  >
    <Text
      style={{
        color: COLORS.white,
        ...FONTS.h4,
      }}
    >
      Finish
    </Text>
  </TouchableOpacity>
);

const Onboard = ({ navigation }) => {
  return (
    <Onboarding
      showDone={true}
      showSkip={true}
      showNext={true}
      DoneButtonComponent={DoneBtn}
      containerStyles={{
        justifyContent: 'center',
        flex: 1,
      }}
      titleStyles={{
        marginTop: 30,
        color: '#fff',
        ...FONTS.h2,
        paddingHorizontal: SIZES.s,
      }}
      subTitleStyles={{
        color: COLORS.white,
        ...FONTS.body3,
        paddingHorizontal: SIZES.s,
      }}
      bottomBarHighlight={false}
      onSkip={() => navigation.navigate('HomeScreen')} // -------------- REMEBER TO CHANGE TO navigation.replace() -------------
      onDone={() => navigation.navigate('HomeScreen')} // -------------- REMEBER TO CHANGE TO navigation.replace() -------------
      pages={[
        {
          backgroundColor: COLORS.primaryLight,
          image: (
            <Image
              source={require('../assets/concert.jpg')}
              style={{ height: 200, width: '90%' }}
            />
          ),
          title: 'Welcome in WatchTime',
          subtitle: 'Largest TV show application',
        },
        {
          backgroundColor: COLORS.primaryLight,
          image: <Svg1 width={'90%'} height={250} />,
          title: 'Explore Something New',
          subtitle: 'Wide range of TV shows. Everyting you need',
        },
        {
          backgroundColor: COLORS.primaryLight,
          image: <Svg2 width={'90%'} height={250} />,
          title: 'Check what you have seen',
          subtitle:
            'You can check episodes that you have seen and track your progress.',
        },
        {
          backgroundColor: COLORS.primaryLight,
          image: <Svg3 width={'90%'} height={250} />,
          title: 'See your statistics',
          subtitle:
            'Now you are able to see your personal statistics in watching tv shows',
        },
        {
          backgroundColor: COLORS.primaryLight,
          image: <Svg4 width={'90%'} height={250} />,
          title: 'Creating an account is extremely easy',
          subtitle: 'Get everything set up and ready in under 5 minutes.',
        },
      ]}
    />
  );
};

export default Onboard;
