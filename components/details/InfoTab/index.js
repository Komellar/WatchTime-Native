import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';

import { COLORS, FONTS, SIZES } from '../../../constants';
import Info from './Info';
import Genres from './Genres';
import Characters from './Characters';
import Actors from './Actors';
import StarRating from './StarRating';
import { useSelector } from 'react-redux';

const InfoTab = ({ loadedShow, loadedCast }) => {
  const userId = useSelector((state) => state.auth.userId);
  const [storylineIsOpen, setStorylineIsOpen] = useState(false);

  const { actors, characters } = loadedCast;

  const desc = loadedShow?.description?.replace(/<[^>]+>/g, '');
  const trimmedDesc = desc?.substr(0, 230);
  const convertedDesc = trimmedDesc
    ?.substr(0, Math.min(trimmedDesc?.length, trimmedDesc?.lastIndexOf(' ')))
    .concat(' ...');

  return (
    <View style={{ marginBottom: SIZES.xxl }}>
      <View
        style={{
          paddingHorizontal: SIZES.l,
        }}
      >
        {/* Storyline */}
        <View style={{ marginTop: SIZES.xl }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            Storyline
          </Text>
          {!storylineIsOpen && (
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
              {convertedDesc}
            </Text>
          )}
          {storylineIsOpen && (
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{desc}</Text>
          )}
          <TouchableWithoutFeedback
            onPress={() => {
              setStorylineIsOpen(!storylineIsOpen);
            }}
          >
            <Text
              style={{
                paddingTop: SIZES.s,
                paddingBottom: SIZES.l,
                color: COLORS.primaryLight,
                ...FONTS.h4,
              }}
            >
              {storylineIsOpen ? 'Read less' : 'Read more'}
            </Text>
          </TouchableWithoutFeedback>
          <View
            style={{ height: 1, width: '100%', backgroundColor: COLORS.gray }}
          />
        </View>

        {/* Genres */}
        <Genres loadedGenres={loadedShow?.genres} />

        {/* Show Info  */}
        <Info loadedShow={loadedShow ?? {}} />
        <View
          style={{ height: 1, width: '100%', backgroundColor: COLORS.gray }}
        />
      </View>

      {/* Characters */}
      <Characters characters={characters} title={loadedShow?.title} />

      {/* Actors */}
      <Actors actors={actors} />

      {/* Star Rating */}
      {userId && <StarRating userId={userId} showId={loadedShow?.id} />}
    </View>
  );
};

export default InfoTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  text: {
    // color: '#fff',
    // fontSize: 16,
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
});
