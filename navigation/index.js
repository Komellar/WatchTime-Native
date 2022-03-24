import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Onboard from '../components/Onboard';
import Details from '../screens/Details';
import Episodes from '../screens/Episodes';
import Tabs from './Tabs';
import { getCurrentUser } from '../services/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { getShowsList } from '../services/shows-actions';

const RootNavigation = ({ isFirstLaunch }) => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  if (userId !== null) {
    dispatch(getShowsList(userId));
  }

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

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
        <Stack.Screen name="Episodes" component={Episodes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
