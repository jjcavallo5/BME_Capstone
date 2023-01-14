import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import {ThemesContext, themes} from '../styles/color_themes';

const SetDarkTheme = () => {
  const context = useContext(ThemesContext);
  return (
    <TouchableOpacity onPress={() => context.toggleTheme(themes.dark)}>
      <Text style={{color: context.theme.text}}>Set Dark</Text>
    </TouchableOpacity>
  );
};

const SetLightTheme = () => {
  const context = useContext(ThemesContext);
  return (
    <TouchableOpacity onPress={() => context.toggleTheme(themes.light)}>
      <Text style={{color: context.theme.text}}>Set Light</Text>
    </TouchableOpacity>
  );
};

export {SetDarkTheme, SetLightTheme};
