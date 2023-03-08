import React, {useContext, useState, useEffect} from 'react';

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
import RadialGradient from 'react-native-radial-gradient';

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
    context.updateContext(context, {
      commands: newCmdList,
    });
  };

  const deleteFolder = () => {
    const newCatList = context.categories.filter(cat => {
      return cat.name !== folderToDelete;
    });
    context.updateContext(context, {
      categories: newCatList,
    });
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
      <ScrollView contentContainerStyle={styles.commandContainer}>
        {commands.map(cmd => {
          return (
            <Command
              name={cmd.name}
              iconName={cmd.iconName}
              iconURL={cmd.iconURL}
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
                if (!context.isPremiumUser) {
                  setPremiumAdVisible(true);
                  return;
                }
                setModalVisible(true);
                setCmdToDelete(cmd.name);
              }}
            />
          );
        })}
      </ScrollView>

      {/* <View style={styles.footer}> */}
      <RadialGradient
        colors={[theme.background + 'ee', '#ffffff00']}
        radius={100}
        style={styles.footer}
        center={[0, 100]}
        stops={[0.7, 1]}>
        <TouchableOpacity
          onPress={() => {
            if (context.isPremiumUser) navigation.navigate('AddCommand');
            else setPremiumAdVisible(true);
          }}
          style={{marginLeft: 10, marginBottom: 10}}>
          <Icon name={'plus'} size={35} color={theme.iconColor} />
        </TouchableOpacity>
      </RadialGradient>
      {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
