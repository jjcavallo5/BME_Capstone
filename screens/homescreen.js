import React, {useContext} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      </View>
      <Text style={{color: theme.text}}>Commands</Text>
      <ScrollView contentContainerStyle={styles.commandContainer} horizontal>
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
      </ScrollView>
      <Text style={{color: theme.text}}>Folders</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.commandContainer}
        showsHorizontalScrollIndicator={false}>
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
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('AddCommand')}>
          <Icon name={'plus'} size={35} color={theme.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButtons}
          onPress={() => navigation.navigate('AddFolder')}>
          <Icon
            name={'folder-plus-outline'}
            size={35}
            color={theme.iconColor}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
