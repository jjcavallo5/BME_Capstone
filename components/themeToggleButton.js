import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppContext from './appContext';

const SetTheme = props => {
  const context = useContext(AppContext);
  return (
    <TouchableOpacity
      onPress={() => context.updateContext(context, {theme: props.theme})}
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
