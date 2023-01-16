import React, {useState, useEffect, useContext} from 'react';

import {Text, View, SafeAreaView} from 'react-native';
import {getUserName, getCommandList} from '../backend/firestore_functions';
import Command from '../components/command';
import Folder from '../components/folder';
import defaultCommandList from '../components/default_commands';
import styles from '../styles/homescreen_styles';

import {ThemesContext} from '../styles/color_themes';

const HomeScreen = ({navigation}) => {
  const context = useContext(ThemesContext);
  const theme = context.theme;
  const [name, setName] = useState('');
  const [commands, setCommands] = useState(defaultCommandList);
  useEffect(() => {
    getUserName(setName);
    getCommandList(setCommands);
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
        {commands.commands.map(cmd => {
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

      <View style={styles.commandContainer}>
        {commands.categories.map(category => {
          return (
            <Folder
              name={category.name}
              iconName={category.iconName}
              key={category.name}
              style={{color: theme.text, backgroundColor: theme.textInput}}
              iconColor={theme.iconColor}
              onPress={() => {
                var cmdList = commands.commands.filter(cmd => {
                  return cmd.category === category.name;
                });
                navigation.navigate('Folder', {
                  commands: cmdList,
                  category: category.name,
                });
              }}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
