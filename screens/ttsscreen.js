import React, {useContext} from 'react';

import {
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ThemesContext} from '../styles/color_themes';
import TTSBar from '../components/ttsBar';

import styles from '../styles/tts_styles';

const TTSScreen = () => {
  const context = useContext(ThemesContext);
  const theme = context.theme;
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
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TTSScreen;
