import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Command = props => {
  return (
    <TouchableOpacity style={{...styles.container, ...props.style}}>
      <Icon name={props.iconName} size={50} color={props.iconColor} />
      <Text style={{...styles.text, ...props.style}}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default Command;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    fontSize: 16,
  },
});
