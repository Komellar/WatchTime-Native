import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';

const Tabs = ({ activeTab, tabClickHandler }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'info' ? styles.tab_active : '']}
        onPress={() => {
          tabClickHandler('info');
        }}
      >
        <Text
          style={[
            styles.tab_text,
            activeTab === 'info' ? styles.tab_active_text : '',
          ]}
        >
          Info
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'seasons' ? styles.tab_active : '']}
        onPress={() => {
          tabClickHandler('seasons');
        }}
      >
        <Text
          style={[
            styles.tab_text,
            activeTab === 'seasons' ? styles.tab_active_text : '',
          ]}
        >
          Seasons
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'gallery' ? styles.tab_active : '']}
        onPress={() => {
          tabClickHandler('gallery');
        }}
      >
        <Text
          style={[
            styles.tab_text,
            activeTab === 'gallery' ? styles.tab_active_text : '',
          ]}
        >
          Gallery
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 12,
  },
  tab: {
    paddingVertical: SIZES.s,
    width: '33%',
  },
  tab_text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#ccc',
  },
  tab_active: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.onDark,
  },
  tab_active_text: {
    color: COLORS.primaryLight,
  },
});

export default Tabs;
