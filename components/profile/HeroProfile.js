import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SvgUri } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

import heroImage from '../../assets/heroProfile.jpg';
import { SIZES, FONTS, COLORS } from '../../constants/theme';
import { getWatchCount } from '../../services/shows-actions';
import SettingsDropdown from './Settings/Dropdown';

const HeroProfile = ({ userId, myShows, settingsOpen, setSettingsOpen }) => {
  const userImg = useSelector((state) => state.auth.userImg);
  const userName = useSelector((state) => state.auth.userName);

  const [watchedEpisodes, setWatchedEpisodes] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let statsEpisodesCount = 0;
    let totalMinutes = 0;

    myShows.forEach((show) => {
      const statistics = getWatchCount(userId, show);
      statsEpisodesCount += statistics.watchedCount;
      totalMinutes += statistics.timeSpent;
    });

    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    const statsTimeSpent = `${hours}h ${minutes}min`;

    setWatchedEpisodes(statsEpisodesCount);
    setTimeSpent(statsTimeSpent);
  }, [myShows, userId]);

  return (
    <View style={styles.container}>
      <ImageBackground source={heroImage} style={styles.backgroundImg}>
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)', COLORS.background]}
          locations={[0.0, 0.9, 1]}
          style={styles.gradient}
        >
          <View style={styles.contentWrapper}>
            {/* Settings */}
            <SettingsDropdown
              userId={userId}
              settingsOpen={settingsOpen}
              setSettingsOpen={setSettingsOpen}
            />

            {/* Avatar */}
            <View style={styles.avatar}>
              {userImg && <SvgUri width="100%" height="100%" uri={userImg} />}
            </View>
            <Text style={styles.username}>{userName ?? ''}</Text>

            {/* Stats */}
            <View style={styles.statsWrapper}>
              <Text style={styles.stats}>Watched episodes</Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primaryLight }}>
                {watchedEpisodes}
              </Text>
            </View>
            <View style={styles.statsWrapper}>
              <Text style={styles.stats}>Time spent on watching</Text>
              <Text style={styles.timeSpent}>{timeSpent}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default HeroProfile;

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: 450,
    marginBottom: SIZES.m,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  gradient: { flex: 1, width: '100%', height: '100%' },
  contentWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 120, height: 120 },
  username: {
    color: COLORS.white,
    ...FONTS.h3,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  statsWrapper: {
    backgroundColor: COLORS.gray,
    width: (SIZES.width * 85) / 100,
    marginVertical: SIZES.xs,
    marginTop: SIZES.l,
    paddingVertical: SIZES.m,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: SIZES.m,
  },
  stats: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  timeSpent: { ...FONTS.h1, color: COLORS.primaryLight },
});
