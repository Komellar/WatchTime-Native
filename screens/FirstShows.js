import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { useFetch } from '../hooks/use-fetch';
import { getAllShows, getEpisodesCount } from '../services/external-api';
import { COLORS, SIZES, FONTS } from '../constants';
import { addShowToDB, removeShowFromDB } from '../services/shows-actions';
import Loader from '../components/firstShows/Loader';

const FirstShows = ({ navigation }) => {
  const userName = useSelector((state) => state.auth.userName);
  const userId = useSelector((state) => state.auth.userId);
  const showsIdList = useSelector((state) => state.shows.showsIdList);
  const [loadingShow, setLoadingShow] = useState(null);

  const {
    data: loadedShows,
    error: showsError,
    loading: showsLoading,
  } = useFetch(getAllShows);

  const bestRatedShows = loadedShows?.filter((show) => show?.popularity > 96);
  const dispatch = useDispatch();

  const pickShowHandler = (show) => {
    if (show?.id) {
      if (!showsIdList.includes(show.id)) {
        setLoadingShow(show.id);

        getEpisodesCount(show.id)
          .then((response) => {
            dispatch(addShowToDB(userId, show, response));
          })
          .catch((err) => console.error(err))
          .finally(() => {
            setLoadingShow(null);
          });
      }
      if (showsIdList.includes(show.id)) {
        setLoadingShow(show.id);

        dispatch(removeShowFromDB(userId, show))
          .then(() => {
            setLoadingShow(null);
          })
          .catch((e) => console.error(e));
      }
    }
  };

  return (
    <View style={styles.container}>
      {showsLoading && <Text style={{ color: COLORS.onDark }}>Loading...</Text>}
      {showsError && <Text style={{ color: COLORS.onDark }}>{showsError}</Text>}
      {!showsError && !showsLoading && loadedShows && (
        <>
          <View style={styles.headerWrapper}>
            {/* Welcome text */}
            <View style={styles.greetingWrapper}>
              <Text style={styles.greeting}>Hi</Text>
              <Text style={styles.username}>{userName ?? 'new user'}</Text>
            </View>

            <Text style={styles.chooseTxt}>
              Choose 3 TV shows you want to watch or have like
            </Text>
            <Text style={styles.desc}>
              It will help us find TV shows you'll love!
            </Text>

            {/* Continue button */}
            {showsIdList.length > 2 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile');
                }}
                style={styles.btn}
              >
                <Text style={styles.btnTxt}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Shows */}
          <FlatList
            data={bestRatedShows}
            numColumns={3}
            ListFooterComponent={<View style={styles.footer} />}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                activeOpacity={0.95}
                style={styles.item}
                disabled={loadingShow !== null}
                onPress={() => {
                  pickShowHandler(item);
                }}
              >
                <ImageBackground
                  source={{ uri: item?.image }}
                  style={styles.img}
                >
                  {loadingShow === item?.id && <Loader />}

                  {showsIdList.includes(item?.id) && (
                    <View style={styles.darkBg}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerWrapper: { marginHorizontal: SIZES.xxl, marginVertical: SIZES.xl },
  greetingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.s,
  },
  greeting: {
    color: COLORS.white,
    ...FONTS.h2,
    fontSize: 28,
    textAlign: 'center',
  },
  username: {
    paddingLeft: SIZES.xs,
    color: COLORS.primaryLight,
    ...FONTS.h2,
    fontSize: 28,
    textAlign: 'center',
  },
  chooseTxt: {
    color: COLORS.onDark,
    ...FONTS.h4,
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  desc: {
    color: COLORS.lightGray,
    ...FONTS.body4,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.s,
    marginTop: SIZES.xl,
    width: '50%',
    alignSelf: 'center',
    borderRadius: SIZES.xs,
  },
  btnTxt: {
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.h4,
  },
  footer: { backgroundColor: COLORS.background, height: 60 },
  item: { paddingHorizontal: 2, paddingVertical: 2 },
  img: {
    height: ((SIZES.width * 32) / 100) * 1.41,
    width: (SIZES.width * 32) / 100,
  },
  darkBg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
