import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';

const DoneBtn = ({ ...props }) => (
  <TouchableOpacity
    style={{
      marginHorizontal: 15,
      // marginRight: 40,
      // backgroundColor: '#00a328',
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 6,
      borderRadius: 10,
    }}
    {...props}
  >
    <Text
      style={{
        fontSize: 15,
        fontWeight: '600',
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
      containerStyles={{ justifyContent: 'center', flex: 1 }}
      titleStyles={{ marginTop: 30 }}
      bottomBarHighlight={false}
      onSkip={() => navigation.navigate('Home')} // -------------- REMEBER TO CHANGE TO navigation.replace() -------------
      onDone={() => navigation.navigate('Home')} // -------------- REMEBER TO CHANGE TO navigation.replace() -------------
      pages={[
        {
          backgroundColor: '#59b2ab',
          image: (
            <Image
              source={require('../../assets/concert.jpg')}
              style={{ height: 200, width: '90%' }}
            />
          ),
          title: 'Welcome in WatchTime',
          subtitle: 'Largest TV show application',
        },
        {
          backgroundColor: '#febe29',
          image: (
            <Image
              source={require('../../assets/icon.png')}
              style={{ height: 200, width: '90%' }}
            />
          ),
          title: "See waht we've got",
          subtitle: 'Wide range of TV shows. Everyting you need',
        },
        {
          backgroundColor: '#22bcb5',
          image: (
            <Image
              source={require('../../assets/concert.jpg')}
              style={{ height: 200, width: '90%' }}
            />
          ),
          title: 'Check what you have seen',
          subtitle:
            'You can check episodes that you have seen and track your progress.',
        },
      ]}
    />
  );
};

export default Onboard;
