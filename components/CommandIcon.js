import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, View} from 'react-native';
import {SvgUri} from 'react-native-svg';

const CommandIcon = props => {
  const command = props.command;
  const style = props.style;
  const size = props.size;
  const extension = command.iconURL ? command.iconURL.slice(-3) : '';

  return (
    <View>
      {command.iconURL ? (
        extension != 'svg' ? (
          <Image source={{uri: command.iconURL}} style={style} />
        ) : (
          <SvgUri uri={command.iconURL} height={size} width={size} />
        )
      ) : (
        <Icon name={command.iconName} size={size} color={props.color} />
      )}
    </View>
  );
};

export default CommandIcon;
