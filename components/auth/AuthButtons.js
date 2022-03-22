import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const AuthButtons = ({ submitFormHandler, isLogging, setIsLogging }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => submitFormHandler()}
        style={{
          width: (SIZES.width * 80) / 100,
          backgroundColor: COLORS.primary,
          marginTop: SIZES.xxl,
          paddingHorizontal: SIZES.xxxl,
          paddingVertical: SIZES.m,
          borderRadius: SIZES.xxl,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h4,
            fontSize: 22,
            lineHeight: 24,
            alignSelf: 'center',
          }}
        >
          {isLogging ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: COLORS.lightGray,
          marginVertical: SIZES.m,
          ...FONTS.body4,
        }}
      >
        OR
      </Text>
      <TouchableOpacity
        onPress={() => {
          setIsLogging(!isLogging);
        }}
      >
        <Text
          style={{
            color: COLORS.onDark,
            ...FONTS.h4,
            fontSize: 20,
            lineHeight: 24,
            alignSelf: 'center',
          }}
        >
          {isLogging ? 'Create an account' : 'Already have an account'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AuthButtons;
