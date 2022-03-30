import { View, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONTS, COLORS } from '../constants/theme';
import HeroProfile from '../components/profile/HeroProfile';
import ProfileSlider from '../components/profile/ProfileSlider';

const Profile = ({ navigation }) => {
  const userId = useSelector((state) => state.auth.userId);
  const myShows = useSelector((state) => state.shows.showsList);
  const myFavShows = useSelector((state) => state.shows.favShowsList);

  // watching, finished, not started

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <HeroProfile userId={userId} myShows={myShows} />
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
