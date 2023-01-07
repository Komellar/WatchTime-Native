import { View, Text } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';

import { getGenres } from '../../services/shows-actions';
import { COLORS, SIZES, FONTS } from '../../constants/index';

const GenresChart = ({ userId }) => {
  const userGenres = useSelector((state) => state.stats.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== null) {
      dispatch(getGenres(userId));
    }
  }, [userId, getGenres]);

  const chartColors = [
    'rgb(51, 102, 204)',
    'rgb(153, 0, 153)',
    'rgb(16, 150, 24)',
    'rgb(255, 153, 0)',
    'rgb(220, 57, 18)',
  ];

  const sortedGenres = useMemo(
    () =>
      [...userGenres].sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, 5),
    [userGenres]
  );

  const userGenresData = useMemo(
    () =>
      sortedGenres?.map((genre, index) => {
        return {
          count: genre.count,
          name: genre.name,
          legendFontColor: COLORS.onDark,
          legendFontSize: 14,
          color: chartColors[index],
        };
      }),
    [sortedGenres, chartColors]
  );

  return (
    <View style={styles.container}>
      {userGenresData.length > 2 && (
        <>
          <Text style={styles.header}>Favourite genres</Text>
          <PieChart
            data={userGenresData}
            width={SIZES.width}
            height={180}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={'count'}
            backgroundColor={'transparent'}
            absolute
          />
        </>
      )}
    </View>
  );
};

export default GenresChart;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  header: { color: COLORS.white, ...FONTS.h3, paddingTop: SIZES.l },
});
