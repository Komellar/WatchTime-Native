import { View, Text } from 'react-native';
import React from 'react';

const About = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a1aaa3',
      }}
    >
      <Text
        style={{
          margin: 50,
          fontSize: 30,
          textShadowColor: 'rgb(0, 0, 0)',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 30,
        }}
      >
        About
      </Text>
    </View>
  );
};

export default About;
