import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Onboard from '../components/Onboard';
import Details from '../screens/Details';
import Episodes from '../screens/Episodes';
import Tabs from './Tabs';
import { COLORS } from '../constants';
import { getCurrentUser } from '../services/auth-actions';
import { Provider, useDispatch, useSelector } from 'react-redux';

const RootNavigation = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

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
        initialRouteName="HomeScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="HomeScreen" component={Tabs} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Episodes" component={Episodes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const OnboardNavigation = () => {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Onboard">
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
