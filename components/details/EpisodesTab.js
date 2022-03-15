import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';

const EpisodesTab = ({ seasons, show }) => {
  const [pickedSeason, setPickedSeason] = useState(1);

  // if (seasons) console.log(seasons);

  return (
    <View style={{ flex: 1, height: '100%' }}>
      {!seasons && <Text>No seasons</Text>}
      {seasons && (
        <View>
          {/* Seasons */}
          <View
            style={{ flexDirection: 'row', marginVertical: 20, marginLeft: 15 }}
          >
            <FlatList
              data={seasons}
              keyExtractor={(item) => item[0]?.season}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={
                <Text style={{ fontSize: 20, color: '#fff' }}>Seasons</Text>
              }
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      fontSize: 20,
                      color: '#fff',
                    }}
                  >
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ height: 1, width: '100%', backgroundColor: '#555' }} />

          {/* Episodes */}
          {seasons[pickedSeason - 1].map((episode) => (
            <TouchableOpacity onPress={() => {}} key={episode.id}>
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 16,
                }}
              >
                <Image
                  source={{ uri: episode?.images?.original }}
                  resizeMode="cover"
                  style={{
                    height: 200,
                    width: '100%',
                    marginBottom: 5,
                  }}
                />
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#8541ff',
                      marginRight: 12,
                    }}
                  >
                    S{pickedSeason} E{episode.episode}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#fff',
                    }}
                  >
                    {episode.title}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}
                >
                  {episode.desc}
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: '600', color: '#bbb' }}
                >
                  {episode.premiered}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default EpisodesTab;

// const styles = StyleSheet.create({
//   season_number: {
//     paddingHorizontal: 20,
//     fontSize: 20,
//     color: '#fff',
//   },
// });
