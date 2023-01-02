import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS } from '../constants/';

import Onboarding from 'react-native-onboarding-swiper';
import { onboardingPages } from '../constants/onboardingPages';

const DoneBtn = ({ ...props }) => (
  <TouchableOpacity
    style={{
      marginHorizontal: SIZES.l,
      paddingHorizontal: SIZES.m,
      paddingVertical: 2,
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
      onSkip={() => navigation.replace('HomeScreen')}
      onDone={() => navigation.replace('HomeScreen')}
      pages={onboardingPages}
    />
  );
};

export default Onboard;
