import { View, Text, ScrollView } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useFetch } from '../hooks/use-fetch';
import {
  getAllShows,
  getSingleShow,
  getShowImages,
} from '../services/external-api';
import SliderShows from '../components/SliderShows';
import { COLORS, FONTS, homeData } from '../constants';
import Hero from '../components/home/Hero';
import StaticRecommendation from '../components/home/StaticRecommendation';
import Recommended from '../components/home/Recommended';

const Home = ({ navigation }) => {
  const { data: shows, loading, error } = useFetch(getAllShows);
  const userGenres = useSelector((state) => state.stats.genres);

  const randomId = useMemo(() => Math.floor(Math.random() * 1917 + 1), []);

  const { data: loadedShow, loading: showLoading } = useFetch(
    getSingleShow,
    randomId
  );

  const { data: loadedImages, loading: imagesLoading } = useFetch(
    getShowImages,
    randomId
  );

  const ofTheDayShows = useMemo(
    () => shows?.slice(randomId, randomId + 20),
    [shows]
  );

  const popularShows = useMemo(
    () => shows?.filter((show) => show.popularity > 98),
    [shows]
  );

  const bestRatedShows = useMemo(
    () => shows?.filter((show) => show.rating > 8.4),
    [shows]
  );

  const actionShows = useMemo(
    () => shows?.filter((show) => show.genres?.includes('Action')),
    [shows]
  );

  const comedyShows = useMemo(
    () => shows?.filter((show) => show.genres?.includes('Comedy')),
    [shows]
  );

  const familyShows = useMemo(
    () => shows?.filter((show) => show.genres?.includes('Family')),
    [shows]
  );

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.background,
      }}
    >
      {loading ||
        showLoading ||
        (imagesLoading && (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.onDark,
                ...FONTS.h1,
              }}
            >
              Loading data...
            </Text>
          </View>
        ))}
      {!loading && !showLoading && !imagesLoading && shows && !error && (
        <ScrollView showsVerticalScrollIndicator={true}>
          {/* Hero */}
          <Hero
            loadedImages={loadedImages}
            loadedShow={loadedShow}
            navigation={navigation}
          />

          {/* Sliders */}
          <SliderShows
            data={ofTheDayShows}
            title="Shows of the day"
            navigation={navigation}
          />

          {userGenres.length !== 0 && (
            <Recommended
              shows={shows}
              navigation={navigation}
              genres={userGenres}
            />
          )}

          <SliderShows
            data={bestRatedShows}
            title="Best rated"
            navigation={navigation}
          />

          {/* Recommended Witcher */}
          <StaticRecommendation
            data={homeData.witcher}
            navigation={navigation}
          />

          {/* Sliders  */}
          <SliderShows
            data={comedyShows}
            title="Comedy shows"
            navigation={navigation}
          />
          <SliderShows
            data={popularShows}
            title="Most popular"
            navigation={navigation}
          />

          {/* Recommended Mandalorian */}
          <StaticRecommendation
            data={homeData.mandalorian}
            navigation={navigation}
          />

          {/* Sliders  */}
          <SliderShows
            data={familyShows}
            title="Family friendly"
            navigation={navigation}
          />
          <SliderShows
            data={actionShows}
            title="Action shows"
            navigation={navigation}
          />
          <View style={{ height: 80 }} />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
