import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  SectionList,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONTS, COLORS } from '../constants/theme';
import HeroProfile from '../components/profile/HeroProfile';
import ProfileSlider from '../components/profile/ProfileSlider';
import { getWatchCount } from '../services/shows-actions';
import { useEffect } from 'react';

const Profile = ({ navigation }) => {
  const userId = useSelector((state) => state.auth.userId);
  const myShows = useSelector((state) => state.shows.showsList);
  const myFavShows = useSelector((state) => state.shows.favShowsList);

  const [statistics, setStatistics] = useState({
    episodesCount: 0,
    timeSpent: 0,
  });

  useEffect(() => {
    if (myShows.length > 0) {
      myShows.forEach((show) => {
        const showStatistics = getWatchCount(userId, show);
        const showEpisodesCount = showStatistics.watchedCount;
        const showTimeSpent = showStatistics.timeSpent;
        setStatistics({
          episodesCount: statistics.episodesCount + showEpisodesCount,
          timeSpent: statistics.timeSpent + showTimeSpent,
        });
      });
    }
  }, [myShows, getWatchCount, userId]);

  // console.log(statistics);

  // watching, finished, not started

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <HeroProfile statistics={statistics} />
        <ProfileSlider
          title="Favourite"
          showsList={myFavShows}
          navigation={navigation}
        />
        <ProfileSlider
          title="All shows"
          showsList={myShows}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
