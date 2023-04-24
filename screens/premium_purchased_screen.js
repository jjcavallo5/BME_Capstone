import React, {useContext} from 'react';

import {Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppContext from '../components/appContext';
import styles from '../styles/account_styles';

const PremiumPurchased = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.background,
      }}>
      <Text>Thank You!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NavBar')}>
        Return to App
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PremiumPurchased;
