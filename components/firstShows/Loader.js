import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants';

const Loader = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primaryLight} />
    </View>
  );
};

export default Loader;
