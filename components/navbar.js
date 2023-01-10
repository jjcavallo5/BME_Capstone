import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import HomeScreen from '../screens/homescreen';
import TTSScreen from '../screens/ttsscreen';
import AccountScreen from '../screens/account_screen';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <Icon name={'home'} size={35} color={color} />;
          } else if (route.name === 'TTS') {
            return <Icon name={'search'} size={45} color={color} />;
          } else if (route.name === 'Account') {
            return <Icon name={'account-circle'} size={35} color={color} />;
          }
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen component={HomeScreen} name="Home" />
      <Tab.Screen component={TTSScreen} name="TTS" />
      <Tab.Screen component={AccountScreen} name="Account" />
    </Tab.Navigator>
  );
};

export default NavBar;
