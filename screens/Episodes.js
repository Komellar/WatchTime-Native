import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, SIZES, FONTS } from '../constants';
import EpisodeModal from '../components/episodes/EpisodeModal';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import {
  addShowToDB,
  addEpisodeToDB,
  removeEpisodeFromDB,
  getWatchedEpisodes,
} from '../services/shows-actions';

const Episodes = ({ navigation, route }) => {
  const { season, show, userId, followed } = route.params;
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [pickedEpisode, setPickedEpisode] = useState(null);
  const [watchedEpisodes, setWatchedEpisodes] = useState([]);

  useEffect(() => {
    setWatchedEpisodes(getWatchedEpisodes(userId, show, season[0].season));
  }, [userId, show, season]);

  const pickEpisodeHandler = (show, episode) => {
    if (!followed) {
      dispatch(addShowToDB(userId, show));
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
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: SIZES.l,
      }}
    >
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.m,
        }}
      >
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <Text
          style={{ paddingLeft: SIZES.m, color: COLORS.white, ...FONTS.h3 }}
        >
          Season {season[0].season}
        </Text>
      </View>

      {/* Progress bar */}
      <View
        style={{
          width: '80%',
          height: SIZES.xl,
          alignSelf: 'center',
          marginVertical: SIZES.l,
          backgroundColor: COLORS.gray,
          borderRadius: SIZES.l,
        }}
      >
        <View
          style={{
            width: '10%',
            height: SIZES.xl,
            backgroundColor: COLORS.primaryLighter,
            // borderRadius: isFullyWatched ? SIZES.l : 0,
            borderBottomLeftRadius: SIZES.l,
            borderTopLeftRadius: SIZES.l,
          }}
        />
      </View>

      {/* Episodes */}
      <FlatList
        data={season}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: SIZES.m,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPickedEpisode(item);
                  setModalVisible(true);
                }}
                style={{ flex: 1 }}
              >
                <Text
                  style={{
                    color: COLORS.onDark,
                    ...FONTS.h4,
                    fontSize: 18,
                    paddingBottom: 2,
                  }}
                >
                  {item?.title}
                </Text>
                <Text style={{ color: COLORS.lightGray, ...FONTS.body3 }}>
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
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.gray,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Episodes;
