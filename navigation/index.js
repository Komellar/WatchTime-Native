import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Onboard from '../screens/Onboard';
import Details from '../screens/Details';
import Episodes from '../screens/Episodes';
import Tabs from './Tabs';
import { getCurrentUser } from '../services/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFavShowsList,
  getGenres,
  getShowsList,
} from '../services/shows-actions';
import UserShows from '../screens/UserShows';
import FirstShows from '../screens/FirstShows';
import Comments from '../components/details/InfoTab/Comments';
import { Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import Auth from '../screens/Auth';

const RootNavigation = ({ isFirstLaunch }) => {
  const userId = useSelector((state) => state.auth.userId);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, getCurrentUser]);

  useEffect(() => {
    if (userId != null) {
      dispatch(getShowsList(userId));
      dispatch(getFavShowsList(userId));
      dispatch(getGenres(userId));
    }
  }, [dispatch, getShowsList, getFavShowsList, getGenres, userId]);

  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  if (isLoggedIn === undefined) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.onDark,
            ...FONTS.h1,
          }}
        >
          Loading data...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isFirstLaunch ? 'Onboard' : 'HomeScreen'}
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="HomeScreen" component={Tabs} />
        <Stack.Screen
          name="Details"
          component={Details}
          initialParams={{ userId: userId }}
        />
        <Stack.Screen name="Comments" component={Comments} />
        <Stack.Screen name="Episodes" component={Episodes} />
        <Stack.Screen name="UserShows" component={UserShows} />
        <Stack.Screen name="FirstShows" component={FirstShows} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
