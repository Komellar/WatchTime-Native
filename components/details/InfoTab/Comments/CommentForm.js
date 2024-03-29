import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Stars from 'react-native-stars';
import { useSelector } from 'react-redux';

import { COLORS, FONTS, SIZES } from '../../../../constants';
import { addComment, getUserComment } from '../../../../services/shows-actions';
import PremiumButton from '../../../common/PremiumButton';

const CommentForm = ({ user, showId, setIsFormOpen, navigation }) => {
  const [enteredText, setEnteredText] = useState('');
  const [starsCount, setStarsCount] = useState(0);
  const [isFirstAdd, setIsFirstAdd] = useState(true);
  const [error, setError] = useState(null);
  const isUserPremium = useSelector((state) => state.auth.isPremium);

  useEffect(() => {
    const getComment = async () => {
      const comment = await getUserComment(user.userId, showId);
      if (!!comment) {
        setIsFirstAdd(false);
        setEnteredText(comment.comment);
        setStarsCount(comment.stars);
      }
    };
    getComment();
  }, []);

  const handleFormSubmit = useCallback(() => {
    if (starsCount === 0) {
      setError('Please choose star rate');
    } else {
      const today = new Date();
      const date = [
        today.getFullYear(),
        ('0' + (today.getMonth() + 1)).slice(-2),
        ('0' + today.getDate()).slice(-2),
      ].join('-');

      addComment(user, showId, starsCount, enteredText, date);
      setIsFormOpen(false);
    }
  }, [user, showId, starsCount, enteredText]);

  let button = <></>;
  if (user.userId == null) {
    button = (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.push('Auth')}
      >
        <Text style={styles.btnText}>Log in to add</Text>
      </TouchableOpacity>
    );
  } else {
    if (isUserPremium) {
      button = (
        <TouchableOpacity
          style={styles.btn}
          onPress={handleFormSubmit}
          disabled={!user?.isLoggedIn}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      );
    } else {
      button = <PremiumButton />;
    }
  }

  return (
    <>
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.onDark,
          marginTop: SIZES.xxl,
        }}
      >
        {isFirstAdd ? 'Add comment' : 'Edit Comment'}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.lightGray}
          placeholder="Your thoughts..."
          multiline
          autoCapitalize={true}
          numberOfLines={6}
          maxLength={400}
          textAlignVertical="top"
          value={enteredText}
          onChangeText={(text) => {
            setEnteredText(text);
          }}
        />
      </View>
      <View style={{ alignItems: 'flex-start', marginBottom: SIZES.m }}>
        <Stars
          default={starsCount}
          update={(value) => {
            setStarsCount(value);
          }}
          spacing={10}
          starSize={32}
          count={5}
          fullStar={<FontAwesome name="star" size={32} color="#e3d924" />}
          emptyStar={<FontAwesome name="star-o" size={32} color="#e3d924" />}
          halfStar={
            <FontAwesome name="star-half-full" size={32} color="#e3d924" />
          }
        />
      </View>
      {error && <Text style={styles.input_error}>&bull; {error}</Text>}
      {button}
      <View style={styles.space} />
    </>
  );
};

export default CommentForm;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: SIZES.xs,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginTop: SIZES.l,
    marginBottom: SIZES.m,
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.s,
    justifyContent: 'center',
  },
  input: {
    ...FONTS.body3,
    letterSpacing: 0.2,
    color: COLORS.white,
  },
  input_error: {
    color: COLORS.error,
    ...FONTS.h4,
  },
  btn: {
    backgroundColor: COLORS.primary,
    width: 120,
    paddingVertical: SIZES.s,
    borderRadius: SIZES.xs,
    marginTop: SIZES.m,
    display: 'flex',
    alignItems: 'center',
  },
  btnText: {
    ...FONTS.h4,
    color: COLORS.onDark,
  },
  space: {
    width: '100%',
    marginTop: SIZES.l,
    marginBottom: 120,
  },
});
