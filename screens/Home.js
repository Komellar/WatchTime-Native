import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useFetch } from '../hooks/useFetch';
import {
  getAllShows,
  getSingleShow,
  getShowImages,
} from '../services/external-api';
import SliderShows from '../components/SliderShows';
import { COLORS, SIZES, FONTS, homeData } from '../constants';
import Hero from '../components/home/Hero';
import Recommended from '../components/home/Recommended';

const Home = ({ navigation }) => {
  const { data: shows, loading, error } = useFetch(getAllShows);

  const randomId = Math.floor(Math.random() * 400 + 1);

  const {
    data: loadedShow,
    loading: showLoading,
    error: showError,
  } = useFetch(getSingleShow, randomId);

  const {
    data: loadedImages,
    loading: imagesLoading,
    error: imagesError,
  } = useFetch(getShowImages, randomId);

  // let convertedGenres = loadedShow?.genres.join(' • ');

  const ofTheDayShows = shows?.slice(70, 90);
  let popularShows = shows?.filter((show) => show.popularity > 97);
  let bestRatedShows = shows?.filter((show) => show.rating > 8.5);
  let actionShows = shows?.filter((show) => show.genres.includes('Action'));
  let comedyShows = shows?.filter((show) => show.genres.includes('Comedy'));
  let familyShows = shows?.filter((show) => show.genres.includes('Family'));

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.background,
      }}
    >
      {loading && (
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
      )}
      {!loading && shows && !error && (
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
          <SliderShows
            data={popularShows}
            title="Most popular"
            navigation={navigation}
          />

          {/* Recommended Mandalorian */}
          <Recommended data={homeData.mandalorian} navigation={navigation} />

          {/* Sliders  */}
          <SliderShows
            data={comedyShows}
            title="Comedy shows"
            navigation={navigation}
          />
          <SliderShows
            data={bestRatedShows}
            title="Best rated"
            navigation={navigation}
          />

          {/* Recommended Witcher */}
          <Recommended data={homeData.witcher} navigation={navigation} />

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
