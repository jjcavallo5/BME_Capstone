import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Folder = props => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...props.style}}
      onPress={() => props.onPress()}
      onLongPress={() => props.onLongPress()}>
      <Icon name={props.iconName} size={50} color={props.iconColor} />
      <Text style={{...styles.text, ...props.style}}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default Folder;

const styles = StyleSheet.create({
  container: {
    width: '30%',
    aspectRatio: 1,
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
