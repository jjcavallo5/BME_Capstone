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
import {loginUser} from '../backend/auth_functions';
import {ThemesContext} from '../styles/color_themes';

const LoginScreen = ({navigation}) => {
  const context = useContext(ThemesContext);
  const theme = context.theme;
  const [email, changeEmail] = useState('');
  const [pass, changePass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginPressed = () => {
    loginUser(
      email,
      pass,
      () => navigation.navigate('NavBar'),
      setErrorMessage,
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{...styles.container, backgroundColor: theme.background}}>
        <View style={styles.header}>
          <Text style={{...styles.headerText, color: theme.text}}>
            App Name
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
            placeholder={'********'}
            placeholderTextColor={theme.placeholderText}
            secureTextEntry={true}
            onChangeText={changePass}
            value={pass}
          />
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity
          style={{...styles.loginButton, backgroundColor: theme.buttonColor}}
          onPress={loginPressed}>
          <Text>Log In</Text>
        </TouchableOpacity>
        <View style={styles.registration}>
          <Text style={{color: theme.text}}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={{color: 'dodgerblue'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
          <Text>To User Info</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
