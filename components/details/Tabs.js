import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Tabs = ({ activeTab, tabClickHandler }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
      }}
    >
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          tabClickHandler('info');
        }}
      >
        <Text
          style={[
            styles.tab_text,
            activeTab === 'info' ? styles.tab_active : '',
          ]}
        >
          Info
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          tabClickHandler('episodes');
        }}
      >
        <Text
          style={[
            styles.tab_text,
            activeTab === 'episodes' ? styles.tab_active : '',
          ]}
        >
          Episodes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          tabClickHandler('gallery');
        }}
      >
        <Text
          style={[
            styles.tab_text,
            activeTab === 'gallery' ? styles.tab_active : '',
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
    flex: 1,
    backgroundColor: '#333',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  row_item: {
    flexDirection: 'row',
    paddingVertical: 1,
  },
  stats_label: {
    width: 110,
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  tab: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 3,
    borderRadius: 23,
  },
  tab_text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ccc',
  },
  tab_active: {
    color: '#661188',
  },
});

export default Tabs;
