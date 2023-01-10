/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import HomeScreen from './screens/homescreen';
import TTSScreen from './screens/ttsscreen';
import AccountScreen from './screens/account_screen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen component={HomeScreen} name="Home" />
        <Tab.Screen component={TTSScreen} name="TTS" />
        <Tab.Screen component={AccountScreen} name="Account" />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
