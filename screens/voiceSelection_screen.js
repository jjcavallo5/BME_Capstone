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
import styles from '../styles/settings_styles';
import PremiumAd from '../components/premiumAd';
import Tts from 'react-native-tts';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

const VoiceSelectionScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const currentVoice = context.voice;

  const [RNTTSVoices, setRNTTSVoices] = useState([]);
  const [premiumAdVisible, setPremiumAdVisible] = useState(false);
  const [isGoogleVoiceTab, setIsGoogleVoiceTab] = useState(true);

  const playSample = name => {
    var path = name.replaceAll('-', '_').toLowerCase() + '.mp3';
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

  useEffect(() => {
    Tts.voices().then(voices => {
      let installedVoices = [];
      let voiceIndex = 1;
      voices.forEach(voice => {
        if (voice['notInstalled'] == false && voice['language'] == 'en-US') {
          installedVoices.push({
            displayName: `Voice ${voiceIndex++}`,
            data: {
              language: 'en-US',
              name: voice['name'],
            },
          });
        }
      });
      setRNTTSVoices(installedVoices);
    });
  }, []);

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
          onPress={() => {
            Tts.stop();
            navigation.pop();
          }}
          style={styles.backIcon}
        />
        <Text style={{color: theme.text, fontSize: 32}}>Select Voice</Text>
        <PremiumAd
          modalVisible={premiumAdVisible}
          minimizeModal={() => setPremiumAdVisible(false)}
        />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            marginRight: 10,
            borderBottomColor: theme.text,
            borderBottomWidth: isGoogleVoiceTab ? 1 : 0,
          }}
          onPress={() => setIsGoogleVoiceTab(true)}>
          <Text
            style={{
              fontSize: 18,
              color: isGoogleVoiceTab ? 'dodgerblue' : theme.text,
            }}>
            Premium Voices
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 10,
            borderBottomColor: theme.text,
            borderBottomWidth: isGoogleVoiceTab ? 0 : 1,
          }}
          onPress={() => setIsGoogleVoiceTab(false)}>
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
              color: isGoogleVoiceTab ? theme.text : 'dodgerblue',
            }}>
            Standard Voices
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          ...styles.voiceScrollView,
          display: isGoogleVoiceTab ? 'none' : 'flex',
        }}>
        {RNTTSVoices.map(voice => {
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

                Tts.setDefaultVoice(voice.data.name)
                  .then(() => navigation.pop())
                  .catch(err => {
                    console.log('error');
                    console.error(err);
                  });
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
              <TouchableOpacity
                style={styles.sampleIcon}
                onPress={() => {
                  Tts.stop();
                  Tts.setDefaultVoice(voice.data.name).then(() => {
                    Tts.speak(
                      'Speak up is an innovative augmentative and alternative communication app with voices backed by machine learning',
                    );
                  });
                }}>
                <Icon name={'volume-up'} size={30} color={theme.iconColor} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView
        style={{
          ...styles.voiceScrollView,
          display: isGoogleVoiceTab ? 'flex' : 'none',
        }}>
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
