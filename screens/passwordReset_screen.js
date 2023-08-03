import React, {useState, useContext} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';

import styles from '../styles/registration_styles';
import {sendPassResetEmail} from '../backend/auth_functions';
import AppContext from '../components/appContext';

const PasswordResetScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const [email, changeEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetPressed = () => {
    if (email == '') {
      setErrorMessage('Enter email');
      return;
    }
    sendPassResetEmail(email);
    setErrorMessage('Email sent if account exists');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{...styles.container, backgroundColor: theme.background}}>
        <View style={styles.header}>
          <Text style={{...styles.headerText, color: theme.text}}>
            SpeakUp!
          </Text>
        </View>
        <View style={styles.input}>
          <Icon
            name={'email'}
            size={30}
            containerStyle={styles.icons}
            color={theme.iconColor}
          />
          <TextInput
            style={{
              ...styles.textInput,
              backgroundColor: theme.textInput,
              color: theme.text,
            }}
            placeholder={'example@gmail.com'}
            placeholderTextColor={theme.placeholderText}
            onChangeText={changeEmail}
            value={email}
          />
        </View>

        <Text style={{color: theme.text}}>{errorMessage}</Text>
        <TouchableOpacity
          style={{
            ...styles.loginButton,
            backgroundColor: theme.buttonColor,
            margin: 20,
          }}
          onPress={resetPressed}>
          <Text>Send Password Reset Link</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => navigation.pop()}>
          <Text style={{color: theme.iconColor}}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PasswordResetScreen;
