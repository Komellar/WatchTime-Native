import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SIZES, COLORS, FONTS } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import useInput from '../hooks/use-intput';
import { useFetch } from '../hooks/use-fetch';
import { getSearchResult } from '../services/external-api';

const Search = () => {
  // const {
  //   inputValue: enteredQuery,
  //   isValid: queryIsValid,
  //   error: queryError,
  //   changeValue: queryChangeHandler,
  // } = useInput(
  //   (value) => /^(?!\s)[A-Za-z_][A-Za-z0-9_():'"&.?,!\s]+$/.test(value),
  //   'Invalid username',
  //   (value) => value?.trim().length > 0
  // );
  const [enteredQuery, setEnteredQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const queryChangeHandler = (text) => {
    const isValid = /^(?!\s)[A-Za-z_][A-Za-z0-9_():'"&.?,!\s]+$/.test(text);
    if (isValid) {
      setEnteredQuery(text);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setSearchLoading(true);
      (async () => {
        try {
          const responseData = await getSearchResult(enteredQuery);
          setSearchData(responseData);
        } catch (err) {
          setSearchError(err);
        } finally {
          setSearchLoading(false);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [getSearchResult, enteredQuery]);

  console.log(searchData);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.background,
      }}
    >
      <View
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: SIZES.xs,
          marginVertical: SIZES.m,
          paddingVertical: SIZES.xs,
          paddingHorizontal: SIZES.l,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
        }}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.lightGray}
          placeholder="Search for TV show..."
          // value={enteredQuery}
          onChangeText={(text) => {
            queryChangeHandler(text);
          }}
        />
        <Ionicons name="search" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // width: (SIZES.width * 80) / 100,
    width: '80%',
    height: 40,
    ...FONTS.body3,
    letterSpacing: 0.2,
    // paddingLeft: SIZES.m,
    color: COLORS.white,
  },
});

export default Search;
