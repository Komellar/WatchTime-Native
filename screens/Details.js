import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { useFetch } from '../hooks/useFetch';
import {
  getCast,
  getSeasons,
  getShowImages,
  getSingleShow,
} from '../lib/external-api';
import InfoTab from '../components/details/InfoTab';
import EpisodesTab from '../components/details/EpisodesTab';

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
        <ImageBackground
          source={{ uri: loadedImages?.backgroundImg.url }}
          style={{ width: '100%', height: 200 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            start={{ x: 0.0, y: 0.5 }}
            locations={[0.0, 0.9]}
            style={{ flex: 1, width: '100%', height: '100%' }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                paddingLeft: 20,
              }}
            >
              <Text style={[styles.text, { fontSize: 24, fontWeight: '700' }]}>
                {loadedShow?.title}
              </Text>
              <Text style={[styles.text, { color: '#eee', paddingBottom: 10 }]}>
                {loadedSeasons?.length} seasons | {loadedShow?.status}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* Tabs */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              tabClickHandler('info');
            }}
          >
            <Text
              style={[
                styles.tab_text,
                activeTab === 'info' ? styles.tab_active : '',
              ]}
            >
              Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              tabClickHandler('episodes');
            }}
          >
            <Text
              style={[
                styles.tab_text,
                activeTab === 'episodes' ? styles.tab_active : '',
              ]}
            >
              Episodes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              tabClickHandler('gallery');
            }}
          >
            <Text
              style={[
                styles.tab_text,
                activeTab === 'gallery' ? styles.tab_active : '',
              ]}
            >
              Gallery
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab content */}
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
        {activeTab === 'gallery' && <Text>GALLERY</Text>}
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  row_item: {
    flexDirection: 'row',
    paddingVertical: 1,
  },
  stats_label: {
    width: 110,
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  tab: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 3,
    borderRadius: 23,
  },
  tab_text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ccc',
  },
  tab_active: {
    color: '#661188',
  },
});
