import React, {useContext} from 'react';

import {Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {ThemesContext} from '../styles/color_themes';
import styles from '../styles/account_styles';

const AccountScreen = ({navigation}) => {
  const context = useContext(ThemesContext);
  const theme = context.theme;
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.background,
      }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsIcon}>
          <Icon name={'settings-outline'} size={30} color={theme.iconColor} />
        </TouchableOpacity>
        <Text style={{color: theme.text, fontSize: 32}}>Account</Text>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
