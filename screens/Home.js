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
import { getAllShows, getSingleShow, getShowImages } from '../lib/external-api';
import SliderShows from '../components/Onboard/SliderShows';
import ImageConcert from '../assets/concert.jpg';

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

  let convertedGenres = loadedShow?.genres.join(' • ');

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
        backgroundColor: '#313131',
      }}
    >
      {loading && (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 30, textAlign: 'center', color: '#ccc' }}>
            Loading data...
          </Text>
        </View>
      )}
      {!loading && shows && !error && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View
            style={{
              width: '100%',
              height: 300,
            }}
          >
            <ImageBackground
              source={{ uri: loadedImages?.backgroundImg.url }}
              style={{ width: '100%', height: '100%' }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 34,
                      fontWeight: '700',
                      color: '#fff',
                      textAlign: 'center',
                      paddingBottom: 2,
                      textShadowColor: 'rgb(0, 0, 0)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 30,
                    }}
                  >
                    {loadedShow?.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#ccc',
                      textAlign: 'center',
                      paddingBottom: 15,
                      textShadowColor: 'rgb(0, 0, 0)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 20,
                    }}
                  >
                    {convertedGenres}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#5e1b9e',
                      paddingHorizontal: 30,
                      paddingVertical: 9,
                      borderRadius: 8,
                    }}
                    onPress={() =>
                      navigation.navigate('Details', {
                        selectedShow: loadedShow,
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '700',
                        letterSpacing: 0.3,
                      }}
                    >
                      SHOW
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>

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

          {/* The Witcher Trailer */}
          <View
            style={{
              backgroundColor: '#999999',
              width: '100%',
              alignItems: 'center',
              paddingVertical: 40,
              marginTop: 40,
            }}
          >
            <Image
              source={require('../assets/concert.jpg')}
              style={{
                width: '90%',
                height: 'auto',
                resizeMode: 'cover',
                aspectRatio: 16 / 9,
              }}
            />
          </View>

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

          {/* Recommended */}
          <View
            style={{
              backgroundColor: '#352047',
              alignItems: 'center',
              paddingVertical: 40,
              marginTop: 40,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 24, paddingBottom: 24 }}>
              Recommended
            </Text>
            {/* <TouchableOpacity style={{ width: '100%' }}> */}
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() =>
                navigation.navigate('Details', {
                  selectedShow: { id: 13 },
                })
              }
            >
              <ImageBackground
                source={{
                  uri: 'https://static.tvmaze.com/uploads/images/original_untouched/72/180098.jpg',
                }}
                style={{
                  // width: '80%',
                  width: 300,
                  height: 150,
                  resizeMode: 'cover',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 32,
                      fontWeight: '700',
                      textShadowColor: 'rgb(0, 0, 0)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 30,
                    }}
                  >
                    The Flash
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  selectedShow: { id: 335 },
                })
              }
            >
              <ImageBackground
                source={{
                  uri: 'https://static.tvmaze.com/uploads/images/original_untouched/219/547788.jpg',
                }}
                style={{
                  // width: '80%',
                  width: 300,
                  height: 150,
                  resizeMode: 'cover',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 32,
                      fontWeight: '700',
                      textShadowColor: 'rgb(0, 0, 0)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 30,
                    }}
                  >
                    Sherlock
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

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
