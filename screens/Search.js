import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';

import { SIZES, COLORS, FONTS } from '../constants';
import { getSearchResult } from '../services/external-api';
import { useFetch } from '../hooks/use-fetch';

const Search = ({ navigation }) => {
  const [enteredQuery, setEnteredQuery] = useState('');
  const { data, loading, error } = useFetch(getSearchResult, enteredQuery);

  const queryChangeHandler = (text) => {
    const isValid = /^(?!\s)[A-Za-z_][A-Za-z0-9_():'"&.?,!\s]+$/.test(text);
    if (isValid) {
      setEnteredQuery(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.lightGray}
          placeholder="Search for TV show..."
          onChangeText={(text) => {
            queryChangeHandler(text);
          }}
        />
        <Ionicons name="search" size={24} color="white" />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading && (
        <Text style={{ color: COLORS.white, ...FONTS.h2, textAlign: 'center' }}>
          Loading...
        </Text>
      )}
      {!loading && !error && data && (
        <View style={styles.listWrapper}>
          <FlatList
            data={data}
            numColumns={2}
            ListFooterComponent={<View style={{ height: 120 }} />}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', { selectedShow: item })
                }
                style={styles.item}
              >
                <Image source={{ uri: item?.image }} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  inputContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: SIZES.xs,
    marginTop: SIZES.xl,
    marginBottom: SIZES.m,
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  input: {
    width: '80%',
    height: 40,
    ...FONTS.body3,
    letterSpacing: 0.2,
    color: COLORS.white,
  },
  error: { color: COLORS.white, ...FONTS.h2, textAlign: 'center' },
  listWrapper: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  item: { paddingHorizontal: 2, paddingVertical: 2 },
  image: {
    height: ((SIZES.width * 50) / 100) * 1.41,
    width: (SIZES.width * 50) / 100,
  },
});

export default Search;
