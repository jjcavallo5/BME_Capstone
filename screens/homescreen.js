import React, {useState, useEffect, useContext} from 'react';

import {Text, View, SafeAreaView} from 'react-native';
import {getUserName} from '../backend/firestore_functions';
import Command from '../components/command';
import defaultCommandList from '../components/default_commands';
import styles from '../styles/homescreen_styles';

import {themes, ThemesContext} from '../styles/color_themes';

const HomeScreen = () => {
  const context = useContext(ThemesContext);
  const theme = context.theme;
  const [name, setName] = useState('');
  useEffect(() => {
    getUserName(setName);
  }, []);

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.header}>
        <Text style={{...styles.headerText, color: theme.text}}>
          Welcome, {name}
        </Text>
        <Text style={{...styles.subHeaderText, color: theme.text}}>
          Get started with some basic commands:
        </Text>
      </View>
      <View style={styles.commandContainer}>
        {defaultCommandList.map(cmd => {
          return (
            <Command
              name={cmd.name}
              iconName={cmd.iconName}
              key={cmd.name}
              style={{color: theme.text, backgroundColor: theme.textInput}}
              iconColor={theme.iconColor}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
