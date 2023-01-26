import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { SIZES, FONTS, COLORS } from '../../constants/theme';

const ProfileSlider = ({ title, showsList, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserShows', { shows: showsList, title: title })
        }
        style={styles.contentWrapper}
      >
        <Text style={styles.header}>{title}</Text>

        <Feather
          name="chevrons-right"
          size={30}
          color="white"
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <FlatList
        data={showsList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                selectedShow: item,
                isFollowed: true,
              })
            }
          >
            <View style={styles.item}>
              <Image source={{ uri: item?.image }} style={styles.img} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProfileSlider;

const styles = StyleSheet.create({
  container: { marginVertical: SIZES.l },
  contentWrapper: {
    width: SIZES.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    color: COLORS.white,
    ...FONTS.h3,
    paddingLeft: SIZES.m,
    paddingVertical: SIZES.m,
  },
  backIcon: { paddingHorizontal: SIZES.m },
  item: {
    marginHorizontal: 3,
    alignItems: 'center',
  },
  img: {
    height: ((SIZES.width * 32) / 100) * 1.41,
    width: (SIZES.width * 32) / 100,
    borderRadius: 3,
    resizeMode: 'contain',
  },
});
