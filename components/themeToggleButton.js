import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {ThemesContext} from '../styles/color_themes';

const SetTheme = props => {
  const context = useContext(ThemesContext);
  return (
    <TouchableOpacity
      onPress={() => context.toggleTheme(props.theme)}
      style={props.style}>
      <Icon
        name={props.icon}
        color={context.theme.iconColor}
        size={props.iconSize}
      />
    </TouchableOpacity>
  );
};

export default SetTheme;
