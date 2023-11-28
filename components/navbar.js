import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/homescreen';
import TTSScreen from '../screens/ttsscreen';
import AccountScreen from '../screens/account_screen';
import FolderHomeScreen from '../screens/folder_homescreen';
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
          backgroundColor: theme.background,
          borderTopWidth: 0,
          elevation: 0,
          height: 55,
          borderTopColor: theme.iconColor,
          borderTopWidth: 0.5,
        },
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <Icon name="home-outline" size={30} color={color} />;
          } else if (route.name === 'Folders') {
            return (
              <Icon name="view-grid-plus-outline" size={25} color={color} />
            );
          } else if (route.name === 'TTS') {
            return <Icon name="magnify" size={30} color={color} />;
          } else if (route.name === 'Account') {
            return <Icon name="account-outline" size={30} color={color} />;
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
        component={FolderHomeScreen}
        name="Folders"
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
