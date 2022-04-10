import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';

import Tabs from '../components/details/Tabs';
import InfoTab from '../components/details/InfoTab';
import SeasonsTab from '../components/details/SeasonsTab';
import HeroDetails from '../components/details/HeroDetails';
import GalleryTab from '../components/details/GalleryTab';

import {
  getCast,
  getSeasons,
  getShowImages,
  getSingleShow,
} from '../services/external-api';
import { useFetch } from '../hooks/use-fetch';
import { COLORS, SIZES } from '../constants/theme';
import { useSelector } from 'react-redux';

const Details = ({ navigation, route }) => {
  const { selectedShow, userId, isFollowed } = route.params;
  const showsIdList = useSelector((state) => state.shows.showsIdList);

  const [activeTab, setActiveTab] = useState(isFollowed ? 'seasons' : 'info');

  const {
    data: loadedShow,
    loading: showLoading,
    error: showError,
  } = useFetch(getSingleShow, selectedShow?.id);

  const {
    data: loadedImages,
    loading: imagesLoading,
    error: imagesError,
  } = useFetch(getShowImages, selectedShow?.id);

  const {
    data: loadedSeasons,
    loading: seasonsLoading,
    error: seasonsError,
  } = useFetch(getSeasons, selectedShow?.id);

  const {
    data: loadedCast,
    loading: castLoading,
    error: castError,
  } = useFetch(getCast, selectedShow?.id);

  const tabClickHandler = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      {(showLoading || seasonsLoading || castLoading || imagesLoading) && (
        <Text>Loading...</Text>
      )}
      {(showError || seasonsError || castError || imagesError) && (
        <Text>{showError || seasonsError || castError || imagesError}</Text>
      )}
      {loadedShow &&
        loadedSeasons &&
        loadedImages &&
        loadedCast &&
        !showLoading &&
        !imagesLoading &&
        !seasonsLoading &&
        !castLoading && (
          <ScrollView>
            {/* Hero */}
            <HeroDetails
              loadedImages={loadedImages}
              loadedSeasons={loadedSeasons.seasons}
              loadedShow={loadedShow}
              userId={userId}
              navigation={navigation}
              numberOfEpisodes={loadedSeasons.episodesCount}
            />
            {/* Tabs to navigate between details sections */}
            <Tabs activeTab={activeTab} tabClickHandler={tabClickHandler} />

            {/* Tabs content */}
            {activeTab === 'info' && (
              <InfoTab
                loadedShow={loadedShow}
                loadedSeasons={loadedSeasons.seasons}
                loadedCast={loadedCast}
              />
            )}
            {activeTab === 'seasons' && (
              <SeasonsTab
                seasons={loadedSeasons.seasons}
                show={loadedShow}
                navigation={navigation}
                userId={userId}
                followed={showsIdList.includes(selectedShow?.id)}
                numberOfEpisodes={loadedSeasons.episodesCount}
              />
            )}
            {activeTab === 'gallery' && <GalleryTab images={loadedImages} />}
          </ScrollView>
        )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
