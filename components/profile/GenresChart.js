import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { getGenres } from '../../services/shows-actions';
import { useDispatch, useSelector } from 'react-redux';
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

  const userGenresData = userGenres.map((genre, index) => {
    return {
      count: genre.count,
      name: genre.name,
      legendFontColor: COLORS.onDark,
      legendFontSize: 14,
      color: chartColors[index],
    };
  });

  const sortedGenres = userGenresData
    .sort((a, b) => (a.count > b.count ? -1 : 1))
    .slice(0, 5);

  return (
    <View
      style={{
        borderRadius: 15,
        backgroundColor: '#121212',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h3, paddingTop: SIZES.l }}>
        Favourite genres
      </Text>
      <PieChart
        data={sortedGenres}
        width={SIZES.width}
        height={180}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={'count'}
        backgroundColor={'transparent'}
        // paddingLeft={'15'}
        absolute
      />
    </View>
  );
};

export default GenresChart;
