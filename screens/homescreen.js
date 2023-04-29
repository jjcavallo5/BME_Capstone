import React, {useContext, useState, useEffect} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Command from '../components/command';
import styles from '../styles/homescreen_styles';

import AppContext from '../components/appContext';
import DeleteCommandModal from '../components/deleteCommandModal';

import DeleteFolderModal from '../components/deleteFolderModal';
import PremiumAd from '../components/premiumAd';
import {validatePremiumSubscription} from '../backend/firestore_functions';

const HomeScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const voice = context.voice;
  const commands = context.commands;
  const name = context.firstName;

  const [modalVisible, setModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [cmdToDelete, setCmdToDelete] = useState('');
  const [folderToDelete, setFolderToDelete] = useState('');
  const [premiumAdVisible, setPremiumAdVisible] = useState(false);
  const [isAlphaSort, setIsAlphaSort] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');

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

  useEffect(() => {
    validatePremiumSubscription(
      context.purchaseToken,
      () => {
        console.log('Valid');
      },
      () => {
        context.updateContext(context, {isPremiumUser: false});
      },
    );
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        <View style={styles.subheader}>
          {isSearching ? (
            <TextInput
              style={{...styles.searchBar, backgroundColor: theme.textInput}}
              placeholder="Search commands"
              placeholderTextColor={theme.placeholderText}
              onChangeText={setSearch}
            />
          ) : (
            <Text
              style={{
                fontSize: 20,
                color: theme.iconColor,
                width: '60%',
              }}>
              Your Commands
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              if (isSearching) Keyboard.dismiss();
              else setIsSearching(true);
            }}>
            <Icon name="magnify" size={35} color={theme.iconColor} />
          </TouchableOpacity>

          {!isSearching ? (
            <TouchableOpacity onPress={() => setIsAlphaSort(!isAlphaSort)}>
              {isAlphaSort ? (
                <Icon
                  name={'clock-time-four-outline'}
                  size={30}
                  color={theme.iconColor}
                />
              ) : (
                <Icon
                  name="alphabetical-variant"
                  size={35}
                  color={theme.iconColor}
                />
              )}
            </TouchableOpacity>
          ) : null}

          {!isSearching ? (
            <TouchableOpacity
              onPress={() => {
                if (context.isPremiumUser) navigation.navigate('AddCommand');
                else setPremiumAdVisible(true);
              }}>
              <Icon name={'plus'} size={35} color={theme.iconColor} />
            </TouchableOpacity>
          ) : null}

          {isSearching ? (
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                setSearch('');
                Keyboard.dismiss();
              }}
              style={{marginRight: 20}}>
              <Text style={{color: theme.text}}>Cancel</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView contentContainerStyle={styles.commandContainer}>
          {commands
            .sort((a, b) => {
              if (isAlphaSort) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              } else {
                if (a.timestamp == b.timestamp) {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                }
                if (a.timestamp > b.timestamp) return -1;
                if (a.timestamp < b.timestamp) return 1;
              }
            })
            .filter(cmd => {
              return cmd.name.toLowerCase().includes(search.toLowerCase());
            })
            .map(cmd => {
              return (
                <Command
                  name={cmd.name}
                  iconName={cmd.iconName}
                  iconURL={cmd.iconURL}
                  key={cmd.name}
                  updateTimestamp={() => {
                    cmd.timestamp = Date.now();
                    context.updateContext(context, {commands: commands});
                  }}
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
