import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, SIZES, FONTS } from '../../constants';
import { getMostWatchedShow } from '../../services/shows-actions';
import { useDispatch, useSelector } from 'react-redux';

const MostWatched = ({ userId }) => {
  const mostWatched = useSelector((state) => state.stats.mostWatched);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== null) {
      dispatch(getMostWatchedShow(userId));
    }
  }, [userId, getMostWatchedShow]);

  return (
    <View style={{ backgroundColor: COLORS.primaryDark }}>
      <Text>MostWatched</Text>
    </View>
  );
};

export default MostWatched;
