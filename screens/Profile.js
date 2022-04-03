import { View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONTS, COLORS } from '../constants/theme';
import HeroProfile from '../components/profile/HeroProfile';
import ProfileSlider from '../components/profile/ProfileSlider';
import { getGenres, getShowsList } from '../services/shows-actions';
import { PieChart } from 'react-native-chart-kit';

const Profile = ({ navigation, route }) => {
  const userId = route.params.userId;
  const myShows = useSelector((state) => state.shows.showsList);
  const myFavShows = useSelector((state) => state.shows.favShowsList);
  const userGenres = useSelector((state) => state.stats.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== null) {
      dispatch(getShowsList(userId));
      dispatch(getGenres(userId));
    }
  }, [userId, getShowsList, getGenres]);

  const watchingShows = myShows?.filter(
    (show) => show.watchStatus === 'started'
  );

  const finishedShows = myShows?.filter(
    (show) => show.watchStatus === 'finished'
  );

  const notStartedShows = myShows?.filter(
    (show) => show.watchStatus === 'notStarted'
  );

  const chartColors = [
    'rgb(51, 102, 204)',
    'rgb(153, 0, 153)',
    'rgb(16, 150, 24)',
    'rgb(255, 153, 0)',
    'rgb(220, 57, 18)',
  ];

  const userGenresData = userGenres.map((genre, index) => {
    return {
      count: genre.count,
      name: genre.name,
      legendFontColor: COLORS.onDark,
      legendFontSize: 15,
      color: chartColors[index],
    };
  });

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <HeroProfile userId={userId} myShows={myShows} />
        <View style={{ borderRadius: 15, backgroundColor: '#111' }}>
          <PieChart
            data={userGenresData}
            width={SIZES.width}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={'count'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            absolute
          />
        </View>
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
