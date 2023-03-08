import React, {useContext, useEffect} from 'react';

import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Tts from 'react-native-tts';
import TTSBar from '../components/ttsBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles/tts_styles';
import AppContext from '../components/appContext';
import {googleSpeech} from '../backend/googleCloudTTS_functions';

const TTSScreen = () => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const voice = context.voice;

  const PushRecentSearch = search => {
    var newRecentSearches = context.recentSearches;
    newRecentSearches.unshift(search);
    if (newRecentSearches.length > 30) newRecentSearches.pop();
    context.updateContext(context, {recentSearches: newRecentSearches});
  };

  const RemoveFromHistory = idx => {
    var newRecentSearches = context.recentSearches;
    newRecentSearches.splice(idx, 1);
    context.updateContext(context, {recentSearches: newRecentSearches});
  };

  const ClearRecents = () => {
    context.updateContext(context, {recentSearches: []});
  };

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
          callback={PushRecentSearch}
        />

        <View style={styles.scrollViewContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            style={{
              width: '90%',
              borderTopWidth: 0.5,
              borderColor: theme.text,
            }}>
            {context.recentSearches.map((search, idx) => {
              return (
                <TouchableOpacity
                  style={{
                    ...styles.recentSearch,
                    borderBottomColor: theme.iconColor,
                  }}
                  key={idx}
                  onPress={() => {
                    if (context.voice.category === 'RNTTS') {
                      Tts.speak(search);
                    } else if (context.voice.category === 'google') {
                      googleSpeech(search, context.voice.data);
                    }
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: theme.placeholderText,
                    }}
                    numberOfLines={1}>
                    {search}
                  </Text>
                  <Icon
                    name="close"
                    size={20}
                    color={theme.iconColor}
                    onPress={() => RemoveFromHistory(idx)}
                  />
                </TouchableOpacity>
              );
            })}
            {context.recentSearches.length > 0 ? (
              <View style={styles.clearButtonContainer}>
                <TouchableOpacity
                  style={{
                    ...styles.clearButton,
                    backgroundColor: theme.textInput,
                  }}
                  onPress={ClearRecents}>
                  <Text style={{color: theme.text}}>Clear recents</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={{color: theme.placeholderText, marginTop: 15}}>
                Previous searches will appear here
              </Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TTSScreen;
