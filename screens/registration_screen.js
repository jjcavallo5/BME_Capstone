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
import {registerUser} from '../backend/auth_functions';
import AppContext from '../components/appContext';

const LoginScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const [email, changeEmail] = useState('');
  const [pass, changePass] = useState('');
  const [confirmPass, changeConfirmPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const registerPress = () => {
    registerUser(
      email,
      pass,
      confirmPass,
      () => navigation.navigate('UserInfo'),
      setErrorMessage,
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor: theme.background,
        }}>
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
            placeholder={'Email'}
            placeholderTextColor={theme.placeholderText}
            onChangeText={changeEmail}
            value={email}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.input}>
          <Icon
            name={'lock'}
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
            placeholder={'Password'}
            placeholderTextColor={theme.placeholderText}
            secureTextEntry={true}
            onChangeText={changePass}
            value={pass}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.input}>
          <Icon
            name={'lock-open'}
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
            placeholder={'Confirm Password'}
            placeholderTextColor={theme.placeholderText}
            secureTextEntry={true}
            onChangeText={changeConfirmPass}
            value={confirmPass}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity
          style={{
            ...styles.loginButton,
            backgroundColor: theme.buttonColor,
          }}
          onPress={registerPress}>
          <Text>Register</Text>
        </TouchableOpacity>
        <View style={styles.registration}>
          <Text style={{color: theme.text}}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: 'dodgerblue'}}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
