import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
  if (userId == null) {
    followButton = {
      title: 'Add to list',
      action: () => navigation.push('Auth'),
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
        style={styles.imgBackground}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          locations={[0.0, 0.9]}
          style={styles.gradient}
        >
          {showsIdList.includes(loadedShow?.id) && (
            <TouchableOpacity
              onPress={() => favouriteClickHandler()}
              style={styles.heartIcon}
            >
              <Ionicons
                name="heart"
                size={36}
                color={isFavourite ? COLORS.error : COLORS.white}
              />
            </TouchableOpacity>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{loadedShow?.title}</Text>
            <Text style={styles.seasons}>
              {loadedSeasons?.length} seasons | {loadedShow?.status}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            followButton.action();
          }}
        >
          <Text style={styles.btnText}>{followButton.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeroDetails;

const styles = StyleSheet.create({
  imgBackground: { width: '100%', height: 220 },
  gradient: { width: '100%', height: '100%' },
  heartIcon: { alignSelf: 'flex-end', margin: SIZES.m },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: SIZES.l,
  },
  title: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  seasons: {
    color: COLORS.onDark,
    paddingBottom: SIZES.s,
    ...FONTS.body3,
  },
  button: {
    marginHorizontal: SIZES.m,
    marginVertical: SIZES.xs,
    paddingHorizontal: SIZES.l,
    paddingVertical: SIZES.xs,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.s,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  btnText: { color: COLORS.white, ...FONTS.h4 },
});
