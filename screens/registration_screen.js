import React from 'react';
import {useState} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

import styles from './registration_styles';

const LoginScreen = ({navigation}) => {
  const [email, changeEmail] = useState('');
  const [pass, changePass] = useState('');
  const [confirmPass, changeConfirmPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const registerPress = () => {
    if (email === '' || pass === '' || confirmPass === '') {
      setErrorMessage('Please fill out all fields');
      return;
    }
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailFormat.test(email)) {
      //Invalid email
      setErrorMessage('Invalid email');
      return;
    }

    if (pass.length < 6) {
      setErrorMessage('Password too short');
      return;
    }

    if (pass !== confirmPass) {
      setErrorMessage("Passwords don't match");
      return;
    }

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
          placeholder={'Email'}
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
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={changePass}
          value={pass}
        />
      </View>
      <View style={styles.input}>
        <Icon
          name={'lock-open'}
          size={30}
          containerStyle={styles.icons}
          color={'gray'}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Confirm Password'}
          secureTextEntry={true}
          onChangeText={changeConfirmPass}
          value={confirmPass}
        />
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={registerPress}>
        <Text>Register</Text>
      </TouchableOpacity>
      <View style={styles.registration}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'blue'}}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
