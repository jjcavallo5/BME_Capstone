import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AppContext from '../components/appContext';
import googleVoices from '../backend/googleTTS_voices';
import RNTTSvoices from '../backend/RNTTS_voices';
import styles from '../styles/settings_styles';
import PremiumAd from '../components/premiumAd';
import Tts from 'react-native-tts';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

const VoiceSelectionScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const currentVoice = context.voice;

  const [premiumAdVisible, setPremiumAdVisible] = useState(false);

  const playSample = name => {
    var path = name.replaceAll('-', '_').toLowerCase() + '.mp3';
    console.log(path);
    var sample = new Sound(path, Sound.MAIN_BUNDLE, error => {
      if (error) console.error(error);
      else {
        sample.play(success => {
          if (!success) {
            console.warn('playback failed due to audio decoding errors');
          }
        });
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.background,
      }}>
      <View style={styles.header}>
        <Icon
          name={'arrow-back'}
          size={30}
          color={theme.iconColor}
          onPress={() => navigation.pop()}
          style={styles.backIcon}
        />
        <Text style={{color: theme.text, fontSize: 32}}>Select Voice</Text>
        <PremiumAd
          modalVisible={premiumAdVisible}
          minimizeModal={() => setPremiumAdVisible(false)}
        />
      </View>
      <ScrollView style={styles.voiceScrollView}>
        {RNTTSvoices.map(voice => {
          return (
            <TouchableOpacity
              key={voice.data.name}
              style={{
                ...styles.voiceContainer,
                backgroundColor: theme.background,
              }}
              onPress={() => {
                context.updateContext(context, {
                  voice: {
                    category: 'RNTTS',
                    data: voice.data,
                  },
                });
                console.log('hi');
                Tts.setDefaultVoice(voice.data.name);
                navigation.pop();
              }}>
              <Text
                style={{
                  color:
                    currentVoice.data.name == voice.data.name
                      ? 'dodgerblue'
                      : theme.text,
                  fontSize: 16,
                }}>
                {voice.displayName}
              </Text>
            </TouchableOpacity>
          );
        })}

        {googleVoices
          .sort((a, b) => {
            if (a.displayName < b.displayName) return -1;
            else if (a.displayName > b.displayName) return 1;
            return 0;
          })
          .map(voice => {
            return (
              <TouchableOpacity
                key={voice.data.name}
                style={{
                  ...styles.voiceContainer,
                  backgroundColor: theme.background,
                }}
                onPress={() => {
                  if (!context.isPremiumUser) {
                    setPremiumAdVisible(true);
                    return;
                  }
                  context.updateContext(context, {
                    voice: {
                      category: 'google',
                      data: voice.data,
                    },
                  });
                  navigation.pop();
                }}>
                <Icon
                  name={'lock'}
                  size={20}
                  color={theme.iconColor}
                  style={{
                    display: context.isPremiumUser ? 'none' : 'flex',
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    color:
                      currentVoice.data.name == voice.data.name
                        ? 'dodgerblue'
                        : theme.text,
                    fontSize: 16,
                  }}>
                  {voice.displayName}
                </Text>
                <TouchableOpacity
                  style={styles.sampleIcon}
                  onPress={() => {
                    playSample(voice.data.name);
                  }}>
                  <Icon name={'volume-up'} size={30} color={theme.iconColor} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoiceSelectionScreen;
