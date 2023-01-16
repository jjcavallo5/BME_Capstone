import React, {useState} from 'react';
import {Keyboard, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Tts from 'react-native-tts';
import {googleSpeech} from '../backend/googleCloudTTS_functions';

const TTSBar = props => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (props.voice.category === 'google') {
      googleSpeech(input, props.voice.data);
    } else {
      Tts.speak(input);
    }

    setInput('');
  };
  return (
    <View style={{marginTop: 100, position: 'relative'}}>
      <TextInput
        placeholder="Type here to talk..."
        placeholderTextColor={props.placeholderColor}
        onChangeText={setInput}
        style={{
          ...props.style,
          paddingRight: 40,
          paddingLeft: 10,
          borderRadius: 10,
        }}
        value={input}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        style={{position: 'absolute', right: 5, top: 10}}
        onPress={handleSubmit}>
        <Icon
          name={'arrow-right-bottom-bold'}
          size={30}
          color={props.iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TTSBar;
