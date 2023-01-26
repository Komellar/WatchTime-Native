import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import HeroProfile from '../components/profile/HeroProfile';
import ProfileSlider from '../components/profile/ProfileSlider';
import { getShowsList } from '../services/shows-actions';
import GenresChart from '../components/profile/GenresChart';
import MostWatched from '../components/profile/MostWatched';
import PremiumButton from '../components/common/PremiumButton';

const Profile = ({ navigation, route }) => {
  const userId = route?.params?.userId;
  const myShows = useSelector((state) => state.shows.showsList);
  const myFavShows = useSelector((state) => state.shows.favShowsList);
  const isUserPremium = useSelector((state) => state.auth.isPremium);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.closeSettingsArea}
        onPress={() => {
          settingsOpen && setSettingsOpen(false);
        }}
      >
        <View style={styles.contentWrapper}>
          <HeroProfile
            userId={userId}
            myShows={myShows}
            settingsOpen={settingsOpen}
            setSettingsOpen={setSettingsOpen}
          />

          {isUserPremium ? (
            <MostWatched userId={userId} />
          ) : (
            <View style={styles.marginLeft}>
              <Text style={styles.sectionHeader}>Most watched show</Text>
              <PremiumButton />
            </View>
          )}

          {isUserPremium ? (
            <GenresChart userId={userId} />
          ) : (
            <View style={styles.marginLeft}>
              <Text style={styles.sectionHeader}>Favourite genres</Text>
              <PremiumButton />
            </View>
          )}

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
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.background },
  closeSettingsArea: {
    height: ((SIZES.width * 32) / 100) * 1.41,
    width: (SIZES.width * 32) / 100,
  },
  contentWrapper: { backgroundColor: COLORS.background, marginBottom: 60 },
  marginLeft: { backgroundColor: COLORS.background },
  sectionHeader: {
    color: COLORS.white,
    ...FONTS.h3,
    paddingTop: SIZES.l,
  },
});
