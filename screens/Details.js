import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

import Tabs from '../components/details/Tabs';
import InfoTab from '../components/details/InfoTab';
import EpisodesTab from '../components/details/EpisodesTab';
import HeroDetails from '../components/details/HeroDetails';
import GalleryTab from '../components/details/GalleryTab';

import {
  getCast,
  getSeasons,
  getShowImages,
  getSingleShow,
} from '../services/external-api';
import { useFetch } from '../hooks/useFetch';
import { COLORS } from '../constants/theme';

const Details = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('info');

  let { selectedShow } = route.params;

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

  // console.log('loadedShow', loadedShow);

  const tabClickHandler = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Hero */}
        <HeroDetails
          loadedImages={loadedImages}
          loadedSeasons={loadedSeasons}
          loadedShow={loadedShow}
        />

        {/* Tabs to navigate between details sections */}
        <Tabs activeTab={activeTab} tabClickHandler={tabClickHandler} />

        {/* Tabs content */}
        {activeTab === 'info' && (
          <InfoTab
            loadedShow={loadedShow}
            loadedSeasons={loadedSeasons}
            loadedCast={loadedCast}
          />
        )}
        {activeTab === 'episodes' && (
          <EpisodesTab seasons={loadedSeasons} show={loadedShow} />
        )}
        {activeTab === 'gallery' && <GalleryTab />}
      </ScrollView>
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
