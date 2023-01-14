import React, {useContext} from 'react';

import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {SetLightTheme, SetDarkTheme} from '../components/themeToggleButton';

import {ThemesContext} from '../styles/color_themes';

const AccountScreen = ({navigation}) => {
  const colorTheme = useContext(ThemesContext);
  return (
    <SafeAreaView
      style={{
        backgroundColor: colorTheme.theme.background,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SetLightTheme />
      <SetDarkTheme />
    </SafeAreaView>
  );
};

export default AccountScreen;
