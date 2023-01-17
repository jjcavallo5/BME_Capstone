import React, {useContext} from 'react';

import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';

import Command from '../components/command';
import Folder from '../components/folder';
import styles from '../styles/homescreen_styles';

import AppContext from '../components/appContext';

const HomeScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const voice = context.voice;
  const commands = context.commands;
  const categories = context.categories;
  const name = context.firstName;

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
        {commands.map(cmd => {
          return (
            <Command
              name={cmd.name}
              iconName={cmd.iconName}
              key={cmd.name}
              style={{color: theme.text, backgroundColor: theme.textInput}}
              iconColor={theme.iconColor}
              voice={voice}
            />
          );
        })}
      </View>

      <View style={styles.commandContainer}>
        {categories.map(category => {
          return (
            <Folder
              name={category.name}
              iconName={category.iconName}
              key={category.name}
              style={{color: theme.text, backgroundColor: theme.textInput}}
              iconColor={theme.iconColor}
              onPress={() => {
                var cmdList = commands.filter(cmd => {
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
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('AddCommand')}>
          <Text>Add Command</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Add Folder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
