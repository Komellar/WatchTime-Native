import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';

const Recommended = ({ data, navigation }) => {
  return (
    <View
      style={{
        marginTop: SIZES.xxxl,
      }}
    >
      <Image
        source={{ uri: data.img }}
        style={{
          height: 200,
          width: '100%',
          resizeMode: 'cover',
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: SIZES.m,
          paddingHorizontal: SIZES.m,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.lightGray,
            ...FONTS.h5,
          }}
        >
          {data.subtitle}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.white,
            ...FONTS.h3,
            paddingVertical: SIZES.xs,
          }}
        >
          {data.description}
        </Text>
        <Text
          style={{ textAlign: 'center', color: COLORS.onDark, ...FONTS.body3 }}
        >
          {data.title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', {
              selectedShow: { id: data.showId },
            });
          }}
          style={{
            backgroundColor: COLORS.primary,
            paddingHorizontal: SIZES.xxxl,
            paddingVertical: SIZES.s,
            borderRadius: SIZES.l,
            marginTop: SIZES.m,
          }}
        >
          <Text style={{ color: COLORS.onDark, ...FONTS.h4 }}>MORE INFO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recommended;
