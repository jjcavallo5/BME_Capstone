import React, {useContext} from 'react';

import {Text, SafeAreaView, View} from 'react-native';
import SetTheme from '../components/themeToggleButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {themes, ThemesContext} from '../styles/color_themes';
import styles from '../styles/settings_styles';

const SettingsScreen = ({navigation}) => {
  const context = useContext(ThemesContext);
  const theme = context.theme;
  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.header}>
        <Icon
          name={'arrow-back'}
          size={40}
          color={theme.iconColor}
          onPress={() => navigation.navigate('Account')}
          style={styles.backIcon}
        />
        <Text style={{color: theme.text, fontSize: 32}}>Settings</Text>
      </View>
      <View style={{...styles.themeSettings, borderColor: theme.text}}>
        <Text style={{color: theme.text, fontSize: 16, marginRight: 50}}>
          Theme Selection:
        </Text>
        <SetTheme
          theme={themes.light}
          icon={'sunny-outline'}
          iconSize={40}
          style={{
            ...styles.themeButtons,
            borderColor: theme.iconColor,
          }}
        />
        <SetTheme
          theme={themes.dark}
          icon={'moon-outline'}
          iconSize={35}
          style={{
            ...styles.themeButtons,
            borderColor: theme.iconColor,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
