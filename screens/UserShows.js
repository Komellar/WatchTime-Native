import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { SIZES, COLORS, FONTS } from '../constants/theme';

const UserShows = ({ navigation, route }) => {
  const { shows, title } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={shows}
        numColumns={3}
        keyExtractor={(item) => item?.id}
        ListHeaderComponent={<Text style={styles.header}>{title}</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                selectedShow: item,
                isFollowed: true,
              })
            }
            style={styles.item}
          >
            <Image source={{ uri: item?.image }} style={styles.img} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UserShows;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    color: COLORS.white,
    ...FONTS.h2,
    textAlign: 'center',
    marginBottom: SIZES.m,
    marginTop: SIZES.l,
  },
  item: { paddingHorizontal: 2, paddingVertical: 2 },
  img: {
    height: ((SIZES.width * 32) / 100) * 1.41,
    width: (SIZES.width * 32) / 100,
  },
});
