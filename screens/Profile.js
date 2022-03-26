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
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONTS, COLORS } from '../constants/theme';
import HeroProfile from '../components/profile/HeroProfile';
import ProfileSlider from '../components/profile/ProfileSlider';

const Profile = ({ userId, navigation }) => {
  const myShows = useSelector((state) => state.shows.showsList);
  const myFavShows = useSelector((state) => state.shows.favShowsList);

  // console.log('uid:', userId);

  // watching, finished, not started

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <HeroProfile />
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
