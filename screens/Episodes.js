import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { COLORS, SIZES, FONTS } from '../constants';
import EpisodeModal from '../components/details/SeasonsTab/episodes/EpisodeModal';
import {
  addShowToDB,
  addEpisodeToDB,
  removeEpisodeFromDB,
  getWatchedEpisodes,
} from '../services/shows-actions';

const Episodes = ({ navigation, route }) => {
  const { season, show, userId, followed, numberOfEpisodes } = route.params;
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [pickedEpisode, setPickedEpisode] = useState(null);
  const [watchedEpisodes, setWatchedEpisodes] = useState([]);

  useEffect(() => {
    if (userId != null) {
      setWatchedEpisodes(getWatchedEpisodes(userId, show, season[0]?.season));
    }
  }, [userId, show, season]);

  const pickEpisodeHandler = (show, episode) => {
    if (userId != null) {
      if (!followed) {
        dispatch(addShowToDB(userId, show, numberOfEpisodes));
      }
      if (!watchedEpisodes.includes(episode.id)) {
        addEpisodeToDB(userId, show, episode);
        let tempWatchedEpisodes = [...watchedEpisodes];
        tempWatchedEpisodes.push(episode.id);
        setWatchedEpisodes(tempWatchedEpisodes);
      } else {
        removeEpisodeFromDB(userId, show, episode);
        let tempWatchedEpisodes = watchedEpisodes.filter((id) => {
          return id !== episode.id;
        });
        setWatchedEpisodes(tempWatchedEpisodes);
      }
    } else {
      navigation.push('Auth');
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal with episode detail info */}
      <EpisodeModal
        pickedEpisode={pickedEpisode}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        watchedEpisodes={watchedEpisodes}
        pickEpisodeHandler={pickEpisodeHandler}
        userId={userId}
        show={show}
      />

      {/* Header */}
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() =>
            navigation.replace('Details', {
              selectedShow: show,
              isFollowed: true,
            })
          }
        >
          <Ionicons name="arrow-back-sharp" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Season {season[0]?.season}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarWrapper}>
        <View
          style={{
            ...styles.progressBarFill,
            width: (watchedEpisodes.length / season.length) * 100 + '%',
            borderRadius:
              watchedEpisodes.length === season.length ? SIZES.l : 0,
          }}
        />
      </View>

      {/* Episodes */}
      <FlatList
        data={season}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => {
                  setPickedEpisode(item);
                  setModalVisible(true);
                }}
                style={{ flex: 1 }}
              >
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.number}>
                  S{item?.season}E{item?.episode}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => pickEpisodeHandler(show, item)}>
                <Ionicons
                  name="checkmark-circle"
                  size={35}
                  color={
                    watchedEpisodes.includes(item.id)
                      ? 'green'
                      : COLORS.lightGray
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
          </View>
        )}
      />
    </View>
  );
};

export default Episodes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.l,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.m,
  },
  headerText: { paddingLeft: SIZES.m, color: COLORS.white, ...FONTS.h3 },
  progressBarWrapper: {
    width: '80%',
    height: SIZES.xl,
    alignSelf: 'center',
    marginVertical: SIZES.l,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.l,
  },
  progressBarFill: {
    height: SIZES.xl,
    backgroundColor: COLORS.primaryLighter,
    borderBottomLeftRadius: SIZES.l,
    borderTopLeftRadius: SIZES.l,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SIZES.m,
  },
  title: {
    color: COLORS.onDark,
    ...FONTS.h4,
    fontSize: 18,
    paddingBottom: 2,
  },
  number: { color: COLORS.lightGray, ...FONTS.body3 },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.gray,
  },
});
