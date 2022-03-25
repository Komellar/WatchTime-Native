import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants';
import Auth from '../screens/Auth';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          height: 50,
          backgroundColor: COLORS.background,
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={30}
              color={focused ? COLORS.primary : COLORS.lightGray}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              size={30}
              color={focused ? COLORS.primary : COLORS.lightGray}
              focused={focused}
            />
          ),
        }}
      />
      {userId !== null && (
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ userId: userId }}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="user"
                size={30}
                color={focused ? COLORS.primary : COLORS.lightGray}
                focused={focused}
              />
            ),
          }}
        />
      )}
      {userId === null && (
        <Tab.Screen
          name="Auth"
          component={Auth}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="user"
                size={30}
                color={focused ? COLORS.primary : COLORS.lightGray}
                focused={focused}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default Tabs;
