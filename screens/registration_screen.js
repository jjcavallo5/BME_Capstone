import React from 'react';

import {Text, View, TouchableOpacity} from 'react-native';

const RegistrationScreen = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('NavBar')}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegistrationScreen;
