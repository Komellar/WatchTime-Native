import React from 'react';
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

const RootNavigation = () => {
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
        <Stack.Screen
          name="Episodes"
          component={Episodes}
          // options={{
          //   headerShown: true,
          //   headerStyle: {
          //     backgroundColor: COLORS.background,
          //   },
          //   headerTintColor: '#fff',
          // }}
        />
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
