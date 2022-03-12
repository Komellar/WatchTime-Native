import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const SliderShows = ({ data, title, navigation }) => {
  return (
    <View
      style={{
        marginTop: 30,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 24,
          paddingLeft: 12,
          paddingBottom: 10,
        }}
      >
        {title}
      </Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', { selectedShow: item })
            }
          >
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
                  height: 200,
                  width: 140,
                  marginBottom: 5,
                }}
              />
              {/* <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
                {item.title}
              </Text> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SliderShows;
