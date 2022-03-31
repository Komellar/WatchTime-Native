import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useFetch } from '../hooks/use-fetch';
import { getAllShows } from '../services/external-api';
import { COLORS, SIZES, FONTS } from '../constants';
import { useSelector } from 'react-redux';

const FirstShows = ({ navigation }) => {
  const userName = useSelector((state) => state.auth.userName);

  const {
    data: loadedShows,
    error: showsError,
    loading: showsLoading,
  } = useFetch(getAllShows);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {showsLoading && <Text style={{ color: COLORS.onDark }}>Loading...</Text>}
      {showsError && <Text style={{ color: COLORS.onDark }}>{showsError}</Text>}
      {!showsError && !showsLoading && loadedShows && (
        <>
          <View
            style={{ marginHorizontal: SIZES.xxl, marginVertical: SIZES.xl }}
          >
            {/* Welcome text */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: SIZES.m,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                  textAlign: 'center',
                }}
              >
                Hi
              </Text>
              <Text
                style={{
                  paddingLeft: SIZES.xs,
                  color: COLORS.primaryLight,
                  ...FONTS.h2,
                  textAlign: 'center',
                }}
              >
                {userName ?? 'new user'}!
              </Text>
            </View>

            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h4,
                textAlign: 'center',
                marginBottom: SIZES.xs,
              }}
            >
              Choose 3 TV shows you want to watch or have like
            </Text>
            <Text
              style={{
                color: COLORS.onDark,
                ...FONTS.body4,
                textAlign: 'center',
              }}
            >
              It will help us find TV shows you'll love!
            </Text>
          </View>
          <FlatList
            data={loadedShows}
            numColumns={3}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={
                  () => {}
                  // navigation.navigate('Details', {
                  //   selectedShow: item,
                  //   isFollowed: true,
                  // })
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
        </>
      )}
    </View>
  );
};

export default FirstShows;
