import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Tts from 'react-native-tts';
import {googleSpeech} from '../backend/googleCloudTTS_functions';
import CommandIcon from './CommandIcon';

const Command = props => {
  const containerWidth = String(100 / props.gridSize - 5) + '%';
  const iconSize = props.gridSize >= 4 ? 30 : props.gridSize < 3 ? 70 : 50;
  const textSize = props.gridSize >= 4 ? 14 : props.gridSize < 3 ? 18 : 16;
  return (
    <TouchableOpacity
      style={
        props.horizontalFlip
          ? {
              ...styles.container,
              ...props.style,
              width: containerWidth,
              transform: [{scaleX: -1}],
              width: containerWidth,
              height: containerWidth,
            }
          : {
              ...styles.container,
              ...props.style,
              width: containerWidth,
              height: containerWidth,
            }
      }
      onPress={props.onPress}
      // onPress={() => {
      //   if (props.voice.category === 'RNTTS') {
      //     Tts.speak(props.name);
      //   } else if (props.voice.category === 'google') {
      //     googleSpeech(props.name, props.voice.data);
      //   }
      //   props.updateTimestamp();
      // }}
      onLongPress={props.onLongPress}>
      <CommandIcon
        command={{iconURL: props.iconURL, iconName: props.iconName}}
        size={iconSize}
        color={props.iconColor}
        style={{height: iconSize, width: iconSize}}
      />
      <Text style={{...styles.text, ...props.style, fontSize: textSize}}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Command;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    textAlign: 'center',
  },
});
