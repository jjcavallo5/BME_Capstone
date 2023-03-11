import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tts from 'react-native-tts';
import {googleSpeech} from '../backend/googleCloudTTS_functions';
import CommandIcon from './CommandIcon';

const Command = props => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...props.style}}
      onPress={() => {
        if (props.voice.category === 'RNTTS') {
          Tts.speak(props.name);
        } else if (props.voice.category === 'google') {
          googleSpeech(props.name, props.voice.data);
        }
        props.updateTimestamp();
      }}
      onLongPress={props.onLongPress}>
      <CommandIcon
        command={{iconURL: props.iconURL, iconName: props.iconName}}
        size={50}
        color={props.iconColor}
        style={{height: 50, width: 50}}
      />
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
    textAlign: 'center',
  },
});
