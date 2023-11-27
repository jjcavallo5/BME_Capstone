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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tts from 'react-native-tts';

import {googleSpeech} from '../backend/googleCloudTTS_functions';
import Command from '../components/command';
import Folder from '../components/folder';
import styles from '../styles/homescreen_styles';

import AppContext from '../components/appContext';
import DeleteCommandModal from '../components/deleteCommandModal';

import DeleteFolderModal from '../components/deleteFolderModal';
import PremiumAd from '../components/premiumAd';
import {validatePremiumSubscription} from '../backend/firestore_functions';
import BoardContext from '../components/boardContext';

const HomeScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const boardContext = useContext(BoardContext);
  const theme = context.theme;
  const voice = context.voice;
  const commands = boardContext.commands;
  const categories = boardContext.categories;
  const name = context.firstName;

  const gridSize = 3;
  const scrollViewTotalHeight = 1000;

  const windowHeight = Dimensions.get('window').height;
  const bodyHeight = windowHeight - 175 - 90;

  const [modalVisible, setModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [cmdToDelete, setCmdToDelete] = useState('');
  const [folderToDelete, setFolderToDelete] = useState('');
  const [premiumAdVisible, setPremiumAdVisible] = useState(false);
  const [isAlphaSort, setIsAlphaSort] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [isFolderView, setIsFolderView] = useState(false);
  const [activeFolder, setActiveFolder] = useState('');

  const [commandsInPromptBar, setCommandsInPromptBar] = useState([]);

  const deleteCommand = () => {
    const newCmdList = boardContext.commands.filter(cmd => {
      return cmd.name !== cmdToDelete;
    });
    boardContext.updateContext(boardContext, {
      commands: newCmdList,
    });
  };

  const deleteFolder = () => {
    const newCatList = boardContext.categories.filter(cat => {
      return cat.name !== folderToDelete;
    });
    boardContext.updateContext(boardContext, {
      categories: newCatList,
    });
  };

  const speakSentence = () => {
    let sentence = '';
    for (let i = commandsInPromptBar.length - 1; i >= 0; i--) {
      sentence += commandsInPromptBar[i].name;
      if (i !== 0) sentence += ' ';
      else sentence += '.';
    }

    if (voice.category === 'RNTTS') {
      Tts.speak(sentence);
      setCommandsInPromptBar([]);
    } else if (voice.category === 'google') {
      googleSpeech(sentence, voice.data).then(() => {
        setCommandsInPromptBar([]);
      });
    }
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
          {/*
           *** PROMPT BAR ***
           */}
          <View
            style={{
              ...styles.commandPromptBar,
              backgroundColor: theme.textInput,
            }}>
            {commandsInPromptBar.length == 0 && (
              <Text style={styles.tempPromptBarText}>Select commands</Text>
            )}
            <ScrollView style={styles.promptBarScrollView} horizontal={true}>
              {commandsInPromptBar.map(cmd => {
                return (
                  <Command
                    name={cmd.name}
                    iconName={cmd.iconName}
                    iconURL={cmd.iconURL}
                    key={cmd.name}
                    gridSize={3}
                    style={{
                      color: cmd.textColor ? cmd.textColor : theme.text,
                      backgroundColor: cmd.backgroundColor
                        ? cmd.backgroundColor
                        : theme.textInput,
                    }}
                    horizontalFlip={true}
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
            <View style={styles.promptBarOptions}>
              <TouchableOpacity
                onPress={() => {
                  setCommandsInPromptBar([]);
                }}>
                <Icon name={'close'} color={theme.iconColor} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginTop: '40%'}}
                onPress={() => speakSentence()}>
                <Icon
                  name={'arrow-right-bottom-bold'}
                  color={theme.iconColor}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*
         *** MODALS ***
         */}
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
        {/*
         *** SEARCH BAR ***
         */}
        <View style={styles.subheader}>
          {isSearching ? (
            <TextInput
              style={{...styles.searchBar, backgroundColor: theme.textInput}}
              placeholder={isFolderView ? 'Search Folders' : 'Search commands'}
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
              {!isFolderView ? 'Your Commands' : 'Your Folders'}
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
                // if (context.isPremiumUser) navigation.navigate('AddCommand');
                // else setPremiumAdVisible(true);

                if (isFolderView) setActiveFolder('');
                setIsFolderView(!isFolderView);
              }}>
              <Icon
                name={'folder-outline'}
                size={30}
                color={!isFolderView ? theme.iconColor : 'dodgerblue'}
              />
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

        {/*
         *** MAIN SCROLLVIEW BODY ***
         */}
        <View style={{height: bodyHeight}}>
          <ScrollView
            contentContainerStyle={{
              ...styles.commandContainer,
            }}>
            {/*
             *** RENDERS IN FOLDER VIEW ***
             */}
            {isFolderView &&
              !activeFolder &&
              categories
                .sort((a, b) => {
                  if (isAlphaSort) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  } else {
                    if (a.timestamp == b.timestamp) {
                      if (a.name.toLowerCase() < b.name.toLowerCase())
                        return -1;
                      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    }
                    if (a.timestamp > b.timestamp) return -1;
                    if (a.timestamp < b.timestamp) return 1;
                  }
                })
                .filter(cmd => {
                  return cmd.name.toLowerCase().includes(search.toLowerCase());
                })
                .map(category => {
                  return (
                    <Folder
                      name={category.name}
                      iconName={category.iconName}
                      key={category.name}
                      gridSize={gridSize}
                      style={{
                        color: theme.text,
                        backgroundColor: theme.textInput,
                      }}
                      iconColor={theme.iconColor}
                      onPress={() => {
                        setActiveFolder(category.name);
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

            {/*
             *** RENDERS IN FOLDER SELECTED VIEW ***
             */}
            {activeFolder !== '' && (
              <Command
                name={activeFolder}
                iconName={'folder-open'}
                key={'back'}
                gridSize={gridSize}
                style={{
                  color: theme.text,
                  backgroundColor: theme.textInput,
                }}
                iconColor={'dodgerblue'}
                onPress={() => {
                  setActiveFolder('');
                }}
              />
            )}

            {activeFolder !== '' &&
              commands
                .sort((a, b) => {
                  if (isAlphaSort) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  } else {
                    if (a.timestamp == b.timestamp) {
                      if (a.name.toLowerCase() < b.name.toLowerCase())
                        return -1;
                      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    }
                    if (a.timestamp > b.timestamp) return -1;
                    if (a.timestamp < b.timestamp) return 1;
                  }
                })
                .filter(cmd => {
                  return cmd.category === activeFolder;
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
                      gridSize={gridSize}
                      style={{
                        color: cmd.textColor ? cmd.textColor : theme.text,
                        backgroundColor: cmd.backgroundColor
                          ? cmd.backgroundColor
                          : theme.textInput,
                      }}
                      iconColor={
                        cmd.iconColor ? cmd.iconColor : theme.iconColor
                      }
                      voice={voice}
                      onPress={() => {
                        console.log(cmd);
                        cmd.timestamp = Date.now();
                        setCommandsInPromptBar([cmd, ...commandsInPromptBar]);
                      }}
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

            {/*
             *** RENDERS IN COMMAND VIEW ***
             */}
            {!isFolderView &&
              commands
                .sort((a, b) => {
                  if (isAlphaSort) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  } else {
                    if (a.timestamp == b.timestamp) {
                      if (a.name.toLowerCase() < b.name.toLowerCase())
                        return -1;
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
                      gridSize={gridSize}
                      style={{
                        color: cmd.textColor ? cmd.textColor : theme.text,
                        backgroundColor: cmd.backgroundColor
                          ? cmd.backgroundColor
                          : theme.textInput,
                      }}
                      iconColor={
                        cmd.iconColor ? cmd.iconColor : theme.iconColor
                      }
                      voice={voice}
                      onPress={() => {
                        console.log(cmd);
                        cmd.timestamp = Date.now();
                        setCommandsInPromptBar([cmd, ...commandsInPromptBar]);
                      }}
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
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
