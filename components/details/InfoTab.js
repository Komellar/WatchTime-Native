import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';

const InfoTab = ({ loadedShow, loadedSeasons, loadedCast }) => {
  const actors = loadedCast?.map((person) => {
    return {
      id: person.id,
      image: person.actorImage,
      name: person.actorName,
      played: person.characterName,
    };
  });

  const characters = loadedCast?.map((person) => {
    return {
      id: person.idCharacter,
      image: person.characterImage,
      name: person.characterName,
    };
  });

  let convertedDesc = loadedShow?.description.replace(/<[^>]+>/g, '');
  let convertedGenres = loadedShow?.genres.join(' • ');
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        {/* Storyline */}
        <View style={{ marginVertical: 20 }}>
          <Text
            style={[
              styles.text,
              {
                fontWeight: '700',
                fontSize: 22,
                paddingBottom: 6,
              },
            ]}
          >
            Storyline
          </Text>
          <Text style={styles.text}>{convertedDesc}</Text>
        </View>

        {/* Show Info  */}
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View>
            <View style={styles.row_item}>
              <Text style={styles.stats_label}>Premiered:</Text>
              <Text style={styles.text}>{loadedShow?.premiered}</Text>
            </View>
            <View style={styles.row_item}>
              <Text style={styles.stats_label}>Seasons:</Text>
              <Text style={styles.text}>{loadedSeasons?.length}</Text>
            </View>
            <View style={styles.row_item}>
              <Text style={styles.stats_label}>Runtime:</Text>
              <Text style={styles.text}>{loadedShow?.averageRuntime}min</Text>
            </View>
            <View style={styles.row_item}>
              <Text style={styles.stats_label}>Rating:</Text>
              <Text style={styles.text}>{loadedShow?.rating}</Text>
            </View>
            <View style={styles.row_item}>
              <Text style={styles.stats_label}>Status:</Text>
              <Text style={styles.text}>{loadedShow?.status}</Text>
            </View>
            <View style={styles.row_item}>
              <Text style={styles.stats_label}>Popularity:</Text>
              <Text style={styles.text}>{loadedShow?.popularity} / 100</Text>
            </View>
            <View style={styles.row_item}>
              <Text style={styles.stats_label}>Language:</Text>
              <Text style={styles.text}>{loadedShow?.language}</Text>
            </View>
            <View style={styles.row_item}>
              <Text style={styles.stats_label}>Genres:</Text>
              <Text style={styles.text}>{convertedGenres}</Text>
            </View>
          </View>
        </View>

        {/* Actors */}
        {/* <View style={{ marginTop: 40 }}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: '700',
                  fontSize: 22,
                  paddingBottom: 8,
                },
              ]}
            >
              Actors
            </Text> */}
        {/* <FlatList
              data={actors}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    resizeMode="cover"
                    style={{
                      height: 180,
                      width: 130,
                      marginBottom: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#fff',
                      width: 130,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              )}
            /> */}
        {/* </View> */}
      </View>
      {/* Characters */}
      <View style={{ marginTop: 40 }}>
        <Text
          style={[
            styles.text,
            {
              color: '#fff',
              fontSize: 24,
              paddingLeft: 12,
              paddingBottom: 10,
            },
          ]}
        >
          Charaters from {loadedShow?.title}
        </Text>
        <FlatList
          data={characters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                marginHorizontal: 5,
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: item.image }}
                resizeMode="cover"
                style={{
                  height: 180,
                  width: 130,
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#fff',
                  width: 130,
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={{ height: 50 }}></View>
    </View>
  );
};

export default InfoTab;

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
});
