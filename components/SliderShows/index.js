import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const SliderShows = ({ data, title, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', { selectedShow: item })
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

export default SliderShows;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xxl,
  },
  title: {
    color: COLORS.onDark,
    paddingLeft: SIZES.l,
    paddingBottom: SIZES.s,
    ...FONTS.h3,
  },
  item: {
    marginHorizontal: SIZES.xs,
    alignItems: 'center',
  },
  img: {
    height: 225,
    width: 160,
    resizeMode: 'contain',
  },
});
