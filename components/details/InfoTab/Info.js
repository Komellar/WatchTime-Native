import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS } from '../../../constants';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Info = ({ loadedShow }) => {
  return (
    <View style={styles.container}>
      {/* Row 1 */}
      <View style={styles.row}>
        <View style={styles.row_item}>
          <AntDesign name="star" size={20} color={COLORS.secondary} />
          <Text style={styles.stats_label}>{loadedShow?.rating}</Text>
        </View>
        <View style={styles.row_item}>
          <Ionicons name="globe-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.stats_label}>{loadedShow?.language}</Text>
        </View>
        <View style={styles.row_item}>
          <Ionicons
            name="ios-time-outline"
            size={20}
            color={COLORS.secondary}
          />
          <Text style={styles.stats_label}>
            {loadedShow?.averageRuntime}min
          </Text>
        </View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <View style={styles.row_item}>
          <AntDesign name="calendar" size={20} color={COLORS.secondary} />
          <Text style={styles.stats_label}>{loadedShow?.premiered}</Text>
        </View>
        <View style={styles.row_item}>
          <Ionicons
            name="ios-people-outline"
            size={20}
            color={COLORS.secondary}
          />
          <Text style={styles.stats_label}>
            {loadedShow?.popularity} out of 100
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 320,
    alignSelf: 'center',
    marginBottom: SIZES.l,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.l,
  },
  row_item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stats_label: {
    color: COLORS.white,
    paddingHorizontal: SIZES.xs,
    ...FONTS.body3,
  },
});

export default Info;
