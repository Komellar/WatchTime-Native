import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { SIZES, FONTS, COLORS } from '../../constants/theme';

const ProfileSlider = ({ title, showsList, navigation }) => {
  return (
    <View style={{ marginVertical: SIZES.l }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserShows', { shows: showsList, title: title })
        }
        style={{
          width: SIZES.width,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
            paddingLeft: SIZES.m,
            paddingVertical: SIZES.m,
          }}
        >
          {title}
        </Text>

        <Feather
          name="chevrons-right"
          size={30}
          color="white"
          style={{ paddingHorizontal: SIZES.m }}
        />
      </TouchableOpacity>

      <FlatList
        data={showsList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                selectedShow: item,
                isFollowed: true,
              })
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

export default ProfileSlider;
