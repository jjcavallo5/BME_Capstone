import React, {useContext, useState} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Folder from '../components/folder';
import styles from '../styles/folderHomescreenStyles';

import AppContext from '../components/appContext';
import DeleteCommandModal from '../components/deleteCommandModal';

import DeleteFolderModal from '../components/deleteFolderModal';
import PremiumAd from '../components/premiumAd';

const FolderHomeScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
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

    // setCommandList(newCmdList, () => {});
  };

  const deleteFolder = () => {
    const newCatList = context.categories.filter(cat => {
      return cat.name !== folderToDelete;
    });
    context.updateContext(context, {
      categories: newCatList,
    });

    // setCategoryList(newCatList, () => {});
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
        navigate={() => {
          setPremiumAdVisible(false);
          navigation.navigate('PurchaseScreen');
        }}
      />
      <Text style={{color: theme.text}}>Folders</Text>
      <ScrollView contentContainerStyle={styles.commandContainer}>
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
                if (!context.isPremiumUser) {
                  setPremiumAdVisible(true);
                  return;
                }
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

export default FolderHomeScreen;
