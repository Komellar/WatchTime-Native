import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SIZES, COLORS, FONTS } from '../constants/theme';

const UserShows = ({ navigation, route }) => {
  const { shows, title } = route.params;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.background,
      }}
    >
      <FlatList
        data={shows}
        numColumns={3}
        keyExtractor={(item) => item?.id}
        ListHeaderComponent={
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              textAlign: 'center',
              marginBottom: SIZES.m,
              marginTop: SIZES.l,
            }}
          >
            {title}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                selectedShow: item,
                isFollowed: true,
              })
            }
            style={{ paddingHorizontal: 2, paddingVertical: 2 }}
          >
            <Image
              source={{ uri: item?.image }}
              style={{
                height: ((SIZES.width * 32) / 100) * 1.41,
                width: (SIZES.width * 32) / 100,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UserShows;
