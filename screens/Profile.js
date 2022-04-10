import { View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONTS, COLORS } from '../constants/theme';
import HeroProfile from '../components/profile/HeroProfile';
import ProfileSlider from '../components/profile/ProfileSlider';
import { getGenres, getShowsList } from '../services/shows-actions';
import GenresChart from '../components/profile/GenresChart';
import MostWatched from '../components/profile/MostWatched';

const Profile = ({ navigation, route }) => {
  const userId = route?.params?.userId;
  const myShows = useSelector((state) => state.shows.showsList);
  const myFavShows = useSelector((state) => state.shows.favShowsList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== null) {
      dispatch(getShowsList(userId));
    }
  }, [userId, getShowsList]);

  const watchingShows = myShows?.filter(
    (show) => show.watchStatus === 'started'
  );

  const finishedShows = myShows?.filter(
    (show) => show.watchStatus === 'finished'
  );

  const notStartedShows = myShows?.filter(
    (show) => show.watchStatus === 'notStarted'
  );

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <HeroProfile userId={userId} myShows={myShows} />
        <MostWatched userId={userId} />
        <GenresChart userId={userId} />

        {myFavShows.length > 0 && (
          <ProfileSlider
            title="Favourite"
            showsList={myFavShows}
            navigation={navigation}
          />
        )}
        {watchingShows.length > 0 && (
          <ProfileSlider
            title="Watching"
            showsList={watchingShows}
            navigation={navigation}
          />
        )}
        {finishedShows.length > 0 && (
          <ProfileSlider
            title="Finished"
            showsList={finishedShows}
            navigation={navigation}
          />
        )}
        {notStartedShows.length > 0 && (
          <ProfileSlider
            title="Not started yet"
            showsList={notStartedShows}
            navigation={navigation}
          />
        )}
        {myShows.length > 0 && (
          <ProfileSlider
            title="All shows"
            showsList={myShows}
            navigation={navigation}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
