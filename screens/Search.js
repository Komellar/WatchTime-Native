import { View, Text } from 'react-native';
import React from 'react';

const Search = () => {
  return (
    <View
      style={{
        // flex: 1,
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d1a31a',
        elevation: 15,
      }}
    >
      <Text style={{ margin: 50, fontSize: 30 }}>Search</Text>
    </View>
  );
};

export default Search;
