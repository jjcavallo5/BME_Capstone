import React, {useContext, useEffect} from 'react';

import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Tts from 'react-native-tts';
import {ThemesContext} from '../styles/color_themes';
import TTSBar from '../components/ttsBar';

import styles from '../styles/tts_styles';
import AppContext from '../components/appContext';

const TTSScreen = () => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const voice = context.voice;

  useEffect(() => {
    if (voice.category === 'RNTTS') {
      Tts.setDefaultVoice(voice.data.name);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{...styles.container, backgroundColor: theme.background}}>
        <TTSBar
          style={{
            ...styles.ttsBar,
            backgroundColor: theme.textInput,
            color: theme.text,
          }}
          placeholderColor={theme.placeholderText}
          iconColor={theme.iconColor}
          voice={voice}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TTSScreen;
