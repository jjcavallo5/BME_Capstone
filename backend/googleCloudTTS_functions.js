import Config from 'react-native-config';
import {Platform} from 'react-native';
import googleVoices from './googleTTS_voices';

const RNFS = require('react-native-fs');
const Sound = require('react-native-sound');

const createPayload = (voice, text) => ({
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    input: {
      text: text,
    },
    voice: voice,
    audioConfig: {
      audioEncoding: 'MP3',
    },
  }),
  method: 'POST',
});

const playSound = music => {
  const speech = new Sound(music, '', error => {
    if (error) {
      console.warn('failed to load the sound', error);

      return null;
    }
    speech.play(success => {
      if (!success) {
        console.warn('playback failed due to audio decoding errors');
      }
    });

    return null;
  });
};

const googleSpeech = async (text, voice) => {
  const key = Platform === 'ios' ? Config.KEY_IOS : Config.KEY_ANDROID;
  const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`;
  const payload = createPayload(voice, text);
  const path = RNFS.DocumentDirectoryPath + '/voice.mp3';
  fetch(address, payload)
    .then(response => response.json())
    .then(result => {
      RNFS.writeFile(path, result.audioContent, 'base64')
        .then(() => playSound(path))
        .catch(err => {
          console.error('Create failure');
          console.error(err);
        });
    })
    .catch(() => {
      console.error(err);
    });
};

export {googleSpeech, playSound};
