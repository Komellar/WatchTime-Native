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
// import profileImg from '../assets/heroProfile.jpg';
import { SIZES, FONTS, COLORS } from '../constants/theme';
import SliderShows from '../components/SliderShows';
import HeroProfile from '../components/profile/HeroProfile';
import { Feather } from '@expo/vector-icons';
import ProfileSlider from '../components/profile/ProfileSlider';

const Profile = ({ userId, navigation }) => {
  const myShows = useSelector((state) => state.shows.showsList);

  // console.log('uid:', userId);

  // watching, finished, not started, all shows , favourite

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <HeroProfile />
        <ProfileSlider
          title="All shows"
          showsList={myShows}
          navigation={navigation}
        />
        <ProfileSlider
          title="My shows"
          showsList={myShows}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
