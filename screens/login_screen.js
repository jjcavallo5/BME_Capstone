import React, {useState} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

import styles from './registration_styles';

const LoginScreen = ({navigation}) => {
  const [email, changeEmail] = useState('');
  const [pass, changePass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginPressed = () => {
    if (email === '' || pass === '') {
      setErrorMessage('Please fill out all fields');
      return;
    }
    // Communicate with backend
    setErrorMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>App Name</Text>
      </View>
      <View style={styles.input}>
        <Icon
          name={'email'}
          size={30}
          containerStyle={styles.icons}
          color={'gray'}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'example@gmail.com'}
          onChangeText={changeEmail}
          value={email}
        />
      </View>
      <View style={styles.input}>
        <Icon
          name={'lock'}
          size={30}
          containerStyle={styles.icons}
          color={'gray'}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'********'}
          secureTextEntry={true}
          onChangeText={changePass}
          value={pass}
        />
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={loginPressed}>
        <Text>Log In</Text>
      </TouchableOpacity>
      <View style={styles.registration}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={{color: 'blue'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/*! FOR DEBUGGING ONLY */}
      <TouchableOpacity onPress={() => navigation.navigate('NavBar')}>
        <Text>HOME (FOR DEBUGGING)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
