import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SvgUri } from 'react-native-svg';
import Stars from 'react-native-stars';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES } from '../../../../constants';
import { getShowComments } from '../../../../services/shows-actions';
import CommentForm from './CommentForm';

const Comments = ({ navigation, route }) => {
  const { showId } = route.params;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comments, setComments] = useState({ comments: [], average: 0 });

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const getComments = async () => {
      const loadedComments = await getShowComments(showId);
      setComments(loadedComments);
    };
    getComments();
  }, [showId]);

  return (
    <View style={styles.container}>
      {isFormOpen && (
        <CommentForm
          user={user}
          showId={showId}
          setIsFormOpen={setIsFormOpen}
        />
      )}
      <Text style={styles.header}>Comments</Text>
      {comments.comments.length == 0 ? (
        <Text style={{ color: COLORS.onDark, ...FONTS.body2 }}>
          No comments added
        </Text>
      ) : (
        <>
          <View style={{ flexDirection: 'row', marginBottom: SIZES.xl }}>
            <Text
              style={{
                ...FONTS.h3,
                fontSize: 25,
                color: COLORS.white,
                marginRight: SIZES.s,
              }}
            >
              Average rate
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                fontSize: 25,
                color: COLORS.primaryLight,
                marginRight: SIZES.s,
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}
            >
              {comments?.average}/5
            </Text>
            <FontAwesome name="star" size={24} color="#d1c828" />
          </View>
          <FlatList
            data={comments.comments}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: SIZES.xs,
                    marginBottom: SIZES.s,
                  }}
                >
                  <SvgUri width={40} height={40} uri={item.userImg} />
                  <View
                    style={{
                      marginLeft: SIZES.s,
                      paddingTop: 2,
                      marginRight: SIZES.xl,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body3,
                        fontSize: 18,
                        fontWeight: '700',
                        color: COLORS.onDark,
                      }}
                    >
                      {item.userName}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 2,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.body5,
                          color: COLORS.onDark,
                          marginRight: SIZES.xs,
                        }}
                      >
                        {item.date}
                      </Text>
                      <Stars
                        default={item.stars}
                        disabled={true}
                        spacing={2}
                        starSize={13}
                        count={5}
                        fullStar={
                          <FontAwesome name="star" size={13} color="#d1c828" />
                        }
                        emptyStar={
                          <FontAwesome
                            name="star-o"
                            size={13}
                            color="#d1c828"
                          />
                        }
                        halfStar={
                          <FontAwesome
                            name="star-half-full"
                            size={13}
                            color="#d1c828"
                          />
                        }
                      />
                    </View>
                  </View>
                </View>
                {item.comment && (
                  <View>
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                      {item.comment}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: COLORS.gray,
                    marginVertical: SIZES.xl,
                  }}
                />
              </>
            )}
          />
        </>
      )}
      <TouchableOpacity
        onPress={() => setIsFormOpen(!isFormOpen)}
        style={styles.addBtn}
      >
        <Text style={{ color: COLORS.onDark, ...FONTS.h2 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.l,
    paddingTop: SIZES.xxl,
    position: 'relative',
  },
  header: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: SIZES.xl,
  },
  addBtn: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 100,
  },
});
