import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  //   TouchableWithoutFeedback,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import { useFetch } from '../hooks/use-fetch';
import { getAllShows, getEpisodesCount } from '../services/external-api';
import { COLORS, SIZES, FONTS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { addShowToDB, removeShowFromDB } from '../services/shows-actions';
import { Ionicons } from '@expo/vector-icons';

const FirstShows = ({ navigation }) => {
  const userName = useSelector((state) => state.auth.userName);
  const userId = useSelector((state) => state.auth.userId);
  const showsIdList = useSelector((state) => state.shows.showsIdList);

  const {
    data: loadedShows,
    error: showsError,
    loading: showsLoading,
  } = useFetch(getAllShows);

  const bestRatedShows = loadedShows?.filter((show) => show?.popularity > 96);
  const dispatch = useDispatch();

  const pickShowHandler = async (show) => {
    if (!showsIdList?.includes(show?.id)) {
      getEpisodesCount(show.id)
        .then((response) => {
          dispatch(addShowToDB(userId, show, response));
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(removeShowFromDB(userId, show));
    }
  };

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
                marginBottom: SIZES.s,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                  fontSize: 28,
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
                  fontSize: 28,
                  textAlign: 'center',
                }}
              >
                {userName ?? 'new user'}
              </Text>
            </View>

            <Text
              style={{
                color: COLORS.onDark,
                ...FONTS.h4,
                textAlign: 'center',
                marginBottom: SIZES.xs,
              }}
            >
              Choose 3 TV shows you want to watch or have like
            </Text>
            <Text
              style={{
                color: COLORS.lightGray,
                ...FONTS.body4,
                textAlign: 'center',
              }}
            >
              It will help us find TV shows you'll love!
            </Text>

            {/* Continue button */}
            {showsIdList.length > 2 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile');
                }}
                style={{
                  backgroundColor: COLORS.primary,
                  paddingVertical: SIZES.s,
                  marginTop: SIZES.xl,
                  width: '50%',
                  alignSelf: 'center',
                  borderRadius: SIZES.xs,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.white,
                    ...FONTS.h4,
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Shows */}
          <FlatList
            data={bestRatedShows}
            numColumns={3}
            ListFooterComponent={
              <View
                style={{ backgroundColor: COLORS.background, height: 60 }}
              />
            }
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                activeOpacity={0.95}
                style={{ paddingHorizontal: 2, paddingVertical: 2 }}
                onPress={() => {
                  pickShowHandler(item);
                }}
              >
                <ImageBackground
                  source={{ uri: item?.image }}
                  style={{
                    height: ((SIZES.width * 32) / 100) * 1.41,
                    width: (SIZES.width * 32) / 100,
                  }}
                >
                  {/* if show is checked add shadow and icon */}
                  {showsIdList.includes(item?.id) && (
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={50}
                        color="green"
                      />
                    </View>
                  )}
                </ImageBackground>
              </TouchableHighlight>
            )}
          />
        </>
      )}
    </View>
  );
};

export default FirstShows;
