import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES } from '../../../constants';
import Info from './Info';
import Genres from './Genres';
import Characters from './Characters';
import Actors from './Actors';

const InfoTab = ({ navigation, loadedShow, loadedCast }) => {
  const [storylineIsOpen, setStorylineIsOpen] = useState(false);

  const { actors, characters } = loadedCast;

  const desc = loadedShow?.description?.replace(/<[^>]+>/g, '');
  const trimmedDesc = desc?.substr(0, 230);
  const convertedDesc = trimmedDesc
    ?.substr(0, Math.min(trimmedDesc?.length, trimmedDesc?.lastIndexOf(' ')))
    .concat(' ...');

  return (
    <View style={{ marginBottom: SIZES.xxl }}>
      <View style={{ paddingHorizontal: SIZES.l }}>
        {/* Storyline */}
        <View>
          <Text style={styles.storylineHeader}>Storyline</Text>
          {!storylineIsOpen && (
            <Text style={styles.storyline}>{convertedDesc}</Text>
          )}
          {storylineIsOpen && <Text style={styles.storyline}>{desc}</Text>}
          <TouchableWithoutFeedback
            onPress={() => {
              setStorylineIsOpen(!storylineIsOpen);
            }}
          >
            <Text style={styles.readMoreBtn}>
              {storylineIsOpen ? 'Read less' : 'Read more'}
            </Text>
          </TouchableWithoutFeedback>
          <View style={styles.divider} />
        </View>

        {/* Genres */}
        <Genres loadedGenres={loadedShow?.genres} />

        {/* Show Info  */}
        <Info loadedShow={loadedShow ?? {}} />
        <View style={styles.divider} />
      </View>

      {/* Comments */}
      <View style={styles.commentsSection}>
        <TouchableOpacity
          style={styles.commentsBtn}
          onPress={() =>
            navigation.navigate('Comments', { showId: loadedShow?.id })
          }
        >
          <View style={styles.commentsIcon}>
            <FontAwesome
              name="comments"
              size={24}
              color={COLORS.primaryLight}
            />
            <Text style={styles.comments_label}>Comments</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider2} />
      </View>

      {/* Characters */}
      <Characters characters={characters} title={loadedShow?.title} />

      {/* Actors */}
      <Actors actors={actors} />
    </View>
  );
};

export default InfoTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  divider: { height: 1, width: '100%', backgroundColor: COLORS.gray },
  divider2: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.gray,
    marginTop: SIZES.xl,
  },
  storylineHeader: {
    marginTop: SIZES.xl,
    color: COLORS.white,
    ...FONTS.h2,
  },
  storyline: { color: COLORS.white, ...FONTS.body4 },
  readMoreBtn: {
    paddingTop: SIZES.s,
    paddingBottom: SIZES.l,
    color: COLORS.primaryLight,
    ...FONTS.h4,
  },
  divider: { height: 1, width: '100%', backgroundColor: COLORS.gray },
  commentsSection: {
    paddingHorizontal: SIZES.l,
    paddingVertical: SIZES.xl,
  },
  commentsBtn: {
    alignContent: 'center',
    marginLeft: SIZES.xl,
  },
  commentsIcon: { flexDirection: 'row', alignItems: 'center' },
  comments_label: {
    width: 110,
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    marginLeft: SIZES.l,
  },
});
