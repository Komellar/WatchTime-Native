import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  addShowToDB,
  addToFavourite,
  removeShowFromDB,
  removeShowFromFav,
} from '../../services/shows-actions';
import { Ionicons } from '@expo/vector-icons';

const HeroDetails = ({
  loadedImages,
  loadedSeasons,
  loadedShow,
  userId,
  navigation,
  numberOfEpisodes,
}) => {
  const dispatch = useDispatch();
  const showsIdList = useSelector((state) => state.shows.showsIdList);
  const favShowsIdList = useSelector((state) => state.shows.favShowsIdList);

  const isFavourite = favShowsIdList.includes(loadedShow.id);

  let followButton;
  if (userId === null) {
    followButton = {
      title: 'Add to list',
      action: () => navigation.navigate('Auth'),
    };
  } else if (showsIdList?.includes(loadedShow.id)) {
    followButton = {
      title: 'Remove from my list',
      action: () => dispatch(removeShowFromDB(userId, loadedShow)),
    };
  } else {
    followButton = {
      title: 'Add to my list',
      action: () => dispatch(addShowToDB(userId, loadedShow, numberOfEpisodes)),
    };
  }

  const favouriteClickHandler = () => {
    if (isFavourite) {
      dispatch(removeShowFromFav(userId, loadedShow));
    } else {
      dispatch(addToFavourite(userId, loadedShow));
    }
  };

  return (
    <View>
      <ImageBackground
        source={{ uri: loadedImages?.backgroundImg?.url }}
        style={{ width: '100%', height: 220 }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          start={{ x: 0.0, y: 0.4 }}
          locations={[0.0, 0.9]}
          style={{ width: '100%', height: '100%' }}
        >
          {showsIdList.includes(loadedShow?.id) && (
            <TouchableOpacity
              onPress={() => favouriteClickHandler()}
              style={{ alignSelf: 'flex-end', margin: SIZES.m }}
            >
              <Ionicons
                name="heart"
                size={36}
                color={isFavourite ? COLORS.error : COLORS.white}
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              paddingLeft: SIZES.l,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              {loadedShow?.title}
            </Text>
            <Text
              style={{
                color: COLORS.onDark,
                paddingBottom: SIZES.s,
                ...FONTS.body3,
              }}
            >
              {loadedSeasons?.length} seasons | {loadedShow?.status}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={{}}>
        <TouchableOpacity
          style={{
            marginHorizontal: SIZES.m,
            marginVertical: SIZES.xs,
            paddingHorizontal: SIZES.l,
            paddingVertical: SIZES.xs,
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: SIZES.s,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
          }}
          onPress={() => {
            followButton.action();
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {followButton.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeroDetails;
