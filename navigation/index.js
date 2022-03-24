import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Onboard from '../components/Onboard';
import Details from '../screens/Details';
import Episodes from '../screens/Episodes';
import Tabs from './Tabs';
import { getCurrentUser } from '../services/auth-actions';
import { useDispatch } from 'react-redux';

const RootNavigation = ({ isFirstLaunch }) => {
  const dispatch = useDispatch();

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
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Episodes" component={Episodes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
