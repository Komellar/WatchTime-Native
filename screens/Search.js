import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SIZES, COLORS, FONTS } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { getSearchResult } from '../services/external-api';

const Search = ({ navigation }) => {
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
          onChangeText={(text) => {
            queryChangeHandler(text);
          }}
        />
        <Ionicons name="search" size={24} color="white" />
      </View>
      {searchError && (
        <Text style={{ color: COLORS.white, ...FONTS.h2, textAlign: 'center' }}>
          {searchError}
        </Text>
      )}
      {searchLoading && (
        <Text style={{ color: COLORS.white, ...FONTS.h2, textAlign: 'center' }}>
          Loading...
        </Text>
      )}
      {!searchLoading && !searchError && searchData && (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.background,
          }}
        >
          <FlatList
            data={searchData}
            numColumns={2}
            ListFooterComponent={<View style={{ height: 120 }} />}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', { selectedShow: item })
                }
                style={{ paddingHorizontal: 2, paddingVertical: 2 }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    height: ((SIZES.width * 50) / 100) * 1.41,
                    width: (SIZES.width * 50) / 100,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    ...FONTS.body3,
    letterSpacing: 0.2,
    color: COLORS.white,
  },
});

export default Search;
