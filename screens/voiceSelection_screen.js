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
import {getVoiceData, setVoiceData} from '../backend/firestore_functions';
import googleVoices from '../backend/googleTTS_voices';
import RNTTSvoices from '../backend/RNTTS_voices';
import styles from '../styles/settings_styles';
import Tts from 'react-native-tts';

const VoiceSelectionScreen = ({navigation}) => {
  // const [currentVoice, setCurrentVoice] = useState(RNTTSvoices[0]);
  const context = useContext(AppContext);
  const theme = context.theme;
  const currentVoice = context.voice;
  // useEffect(() => {
  //   getVoiceData(setCurrentVoice);
  // }, []);
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
          onPress={() => navigation.navigate('Settings')}
          style={styles.backIcon}
        />
        <Text style={{color: theme.text, fontSize: 32}}>Select Voice</Text>
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
                setVoiceData(
                  {
                    category: 'RNTTS',
                    data: voice.data,
                  },
                  () => {},
                );
                context.updateContext({
                  ...context,
                  voice: {
                    category: 'RNTTS',
                    data: voice.data,
                  },
                });
                Tts.setDefaultVoice(voice.data.name);
                navigation.navigate('Settings');
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
              <TouchableOpacity style={styles.sampleIcon}>
                <Icon name={'volume-up'} size={30} color={theme.iconColor} />
              </TouchableOpacity>
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
                  setVoiceData(
                    {
                      category: 'google',
                      data: voice.data,
                    },
                    () => {},
                  );
                  context.updateContext({
                    ...context,
                    voice: {
                      category: 'google',
                      data: voice.data,
                    },
                  });
                  navigation.navigate('Settings');
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
                <TouchableOpacity style={styles.sampleIcon}>
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
