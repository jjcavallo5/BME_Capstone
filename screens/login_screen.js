import React from 'react';

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

const LoginScreen = ({navigation}) => {
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
        <TextInput style={styles.textInput} placeholder={'example@gmail.com'} />
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
        />
      </View>
      <TouchableOpacity style={styles.loginButton}>
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

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 60,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loginButton: {
    height: 50,
    width: 200,
    backgroundColor: 'lightblue',
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  registration: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 32,
  },
  icons: {
    position: 'absolute',
    left: 5,
    zIndex: 1,
  },
  textInput: {
    height: 40,
    width: 300,
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    color: 'black',
    paddingLeft: 50,
  },
});
