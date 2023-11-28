import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Folder = props => {
  const containerWidth = String(100 / props.gridSize - 5) + '%';
  const iconSize = props.gridSize >= 4 ? 30 : props.gridSize < 3 ? 70 : 50;
  const textSize = props.gridSize >= 4 ? 14 : props.gridSize < 3 ? 18 : 16;
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...props.style,
        width: containerWidth,
        height: containerWidth,
      }}
      onPress={() => props.onPress()}
      onLongPress={() => props.onLongPress()}>
      <Icon name={props.iconName} size={iconSize} color={props.iconColor} />
      <Text style={{...props.style, fontSize: textSize}}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default Folder;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
