import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const SliderShows = ({ data, title, navigation }) => {
  return (
    <View
      style={{
        marginTop: SIZES.xxl,
      }}
    >
      <Text
        style={{
          color: COLORS.onDark,
          paddingLeft: SIZES.l,
          paddingBottom: SIZES.s,
          ...FONTS.h3,
        }}
      >
        {title}
      </Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', { selectedShow: item })
            }
          >
            <View
              style={{
                marginHorizontal: SIZES.xs,
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: item?.image }}
                style={{
                  height: 225,
                  width: 160,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SliderShows;
