import React, {useContext, useState} from 'react';

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
import DeleteCommandModal from '../components/deleteCommandModal';

import {setCommandList, setCategoryList} from '../backend/firestore_functions';
import DeleteFolderModal from '../components/deleteFolderModal';
import PremiumAd from '../components/premiumAd';

const HomeScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const voice = context.voice;
  const commands = context.commands;
  const categories = context.categories;
  const name = context.firstName;

  const [modalVisible, setModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [cmdToDelete, setCmdToDelete] = useState('');
  const [folderToDelete, setFolderToDelete] = useState('');
  const [premiumAdVisible, setPremiumAdVisible] = useState(false);

  const deleteCommand = () => {
    const newCmdList = context.commands.filter(cmd => {
      return cmd.name !== cmdToDelete;
    });
    context.updateContext({
      ...context,
      commands: newCmdList,
    });

    setCommandList(newCmdList, () => {});
  };

  const deleteFolder = () => {
    const newCatList = context.categories.filter(cat => {
      return cat.name !== folderToDelete;
    });
    context.updateContext({
      ...context,
      categories: newCatList,
    });

    setCategoryList(newCatList, () => {});
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.header}>
        <Text style={{...styles.headerText, color: theme.text}}>
          Welcome, {name}
        </Text>
      </View>
      <DeleteCommandModal
        modalVisible={modalVisible}
        minimizeModal={() => setModalVisible(false)}
        deleteCallback={deleteCommand}
      />
      <DeleteFolderModal
        modalVisible={folderModalVisible}
        minimizeModal={() => setFolderModalVisible(false)}
        deleteCallback={deleteFolder}
      />
      <PremiumAd
        modalVisible={premiumAdVisible}
        minimizeModal={() => setPremiumAdVisible(false)}
      />
      <Text style={{color: theme.text}}>Commands</Text>
      <ScrollView contentContainerStyle={styles.commandContainer} horizontal>
        {commands.map(cmd => {
          return (
            <Command
              name={cmd.name}
              iconName={cmd.iconName}
              key={cmd.name}
              style={{
                color: cmd.textColor ? cmd.textColor : theme.text,
                backgroundColor: cmd.backgroundColor
                  ? cmd.backgroundColor
                  : theme.textInput,
              }}
              iconColor={cmd.iconColor ? cmd.iconColor : theme.iconColor}
              voice={voice}
              onLongPress={() => {
                setModalVisible(true);
                setCmdToDelete(cmd.name);
              }}
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
              onLongPress={() => {
                setFolderModalVisible(true);
                setFolderToDelete(category.name);
              }}
            />
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            if (context.isPremiumUser) navigation.navigate('AddCommand');
            else setPremiumAdVisible(true);
          }}>
          <Icon name={'plus'} size={35} color={theme.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButtons}
          onPress={() => {
            if (context.isPremiumUser) navigation.navigate('AddFolder');
            else setPremiumAdVisible(true);
          }}>
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
