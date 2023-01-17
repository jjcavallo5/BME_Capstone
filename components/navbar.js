import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import HomeScreen from '../screens/homescreen';
import TTSScreen from '../screens/ttsscreen';
import AccountScreen from '../screens/account_screen';
import AppContext from './appContext';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const context = useContext(AppContext);
  const theme = context.theme;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <Icon name={'home'} size={35} color={color} />;
          } else if (route.name === 'TTS') {
            return <Icon name={'search'} size={45} color={color} />;
          } else if (route.name === 'Account') {
            return <Icon name={'account-circle'} size={35} color={color} />;
          }
        },
        tabBarActiveTintColor: 'dodgerblue',
        tabBarInactiveTintColor: theme.iconColor,
      })}>
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={TTSScreen}
        name="TTS"
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={AccountScreen}
        name="Account"
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default NavBar;
