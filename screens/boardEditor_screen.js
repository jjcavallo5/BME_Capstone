import React, {useContext, useState, useEffect} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Folder from '../components/folder';
import styles from '../styles/homescreen_styles';

import AppContext from '../components/appContext';
import DeleteCommandModal from '../components/deleteCommandModal';

import DeleteFolderModal from '../components/deleteFolderModal';
import PremiumAd from '../components/premiumAd';
import BoardContext from '../components/boardContext';
import Command from '../components/command';
import {
  getActiveBoard,
  saveNewBoard,
  updateBoard,
} from '../backend/firestore_functions';

const BoardEditorScreen = ({route, navigation}) => {
  const context = useContext(AppContext);
  const boardContext = useContext(BoardContext);
  const theme = context.theme;

  const name = context.firstName;
  const voice = context.voice;
  const gridSize = context.gridSize;
  const windowHeight = Dimensions.get('window').height;
  const bodyHeight = windowHeight - 225;

  const [modalVisible, setModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [premiumAdVisible, setPremiumAdVisible] = useState(false);
  const [isAlphaSort, setIsAlphaSort] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [isFolderView, setIsFolderView] = useState(false);
  const [activeFolder, setActiveFolder] = useState('');
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [boardData, setBoardData] = useState({
    commands: [],
    categories: [],
    public: false,
    name: '',
  });

  const deleteCommand = () => {
    const newCmdList = boardContext.commands.filter(cmd => {
      return cmd.name !== cmdToDelete;
    });
    context.updateContext(context, {
      commands: newCmdList,
    });

    // setCommandList(newCmdList, () => {});
  };

  const deleteFolder = () => {
    const newCatList = boardContext.categories.filter(cat => {
      return cat.name !== folderToDelete;
    });
    context.updateContext(context, {
      categories: newCatList,
    });

    // setCategoryList(newCatList, () => {});
  };

  useEffect(() => {
    console.log(route.params.boardID);
    getActiveBoard(route.params.boardID, board => {
      setBoardData({...boardData, ...board});
    });
  }, [route.params.boardID]);

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.header}>
        <Text style={{...styles.headerText, color: theme.text}}>
          Edit Board
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

      {/*
       *** SAVE MODAL ***
       */}
      <Modal
        visible={saveModalVisible}
        transparent={true}
        onRequestClose={() => setSaveModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setSaveModalVisible(false)}>
          <View
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                height: 400,
                width: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                position: 'relative',
              }}>
              <TouchableOpacity
                onPress={() => setSaveModalVisible(false)}
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 10,
                }}>
                <Icon name="close" size={30} />
              </TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 32,
                  }}>
                  Save Board
                </Text>
              </View>
              <View
                style={{
                  height: 150,
                  padding: 20,
                  marginBottom: 20,
                }}>
                <Text>
                  This board is public, so to save your changes you must create
                  a new board on your profile
                </Text>

                <TextInput
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    margin: 20,
                    marginBottom: 10,
                    color: 'black',
                    backgroundColor: theme.textInput,
                    borderRadius: 15,
                  }}
                  placeholder="New Board Name"
                  value={newBoardName}
                  onChangeText={setNewBoardName}
                />
                <Text style={{alignSelf: 'center', color: 'red'}}>
                  {errorMessage}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  padding: 10,
                  width: 150,
                  backgroundColor: 'lightblue',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
                onPress={() => {
                  if (newBoardName === '') setErrorMessage('Enter board name');
                  else {
                    setBoardData({...boardData, name: newBoardName});

                    saveNewBoard(
                      boardContext.savedBoards.length,
                      {...boardData, name: newBoardName},
                      newBoardID => {
                        boardContext.addSavedBoard(boardContext, newBoardID);
                        navigation.pop();
                      },
                    );
                  }
                }}>
                <Text style={{fontSize: 16, color: 'black'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
            {!isFolderView ? 'Commands' : 'Folders'}
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

          {isFolderView && !activeFolder && (
            <Folder
              name={'Add Folder'}
              iconName={'folder-plus-outline'}
              gridSize={gridSize}
              style={{
                color: theme.text,
                backgroundColor: theme.textInput,
              }}
              iconColor={'dodgerblue'}
              onPress={() => {
                navigation.navigate('AddFolder');
              }}
            />
          )}

          {!isFolderView && (
            <Folder
              name={'Add Command'}
              iconName={'plus'}
              gridSize={gridSize}
              style={{
                color: theme.text,
                backgroundColor: theme.textInput,
                textAlign: 'center',
              }}
              iconColor={'dodgerblue'}
              onPress={() => {
                navigation.navigate('AddCommand');
              }}
            />
          )}

          {isFolderView &&
            !activeFolder &&
            boardData.categories
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
            boardData.commands
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
                    iconColor={cmd.iconColor ? cmd.iconColor : theme.iconColor}
                    voice={voice}
                    onPress={() => {
                      setCommandsInPromptBar([cmd, ...commandsInPromptBar]);
                      cmd.timestamp = Date.now();
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
            boardData.commands
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
                    gridSize={gridSize}
                    style={{
                      color: cmd.textColor ? cmd.textColor : theme.text,
                      backgroundColor: cmd.backgroundColor
                        ? cmd.backgroundColor
                        : theme.textInput,
                    }}
                    iconColor={cmd.iconColor ? cmd.iconColor : theme.iconColor}
                    voice={voice}
                    onPress={() => {
                      setCommandsInPromptBar([cmd, ...commandsInPromptBar]);
                      cmd.timestamp = Date.now();
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
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 200,
              borderTopLeftRadius: 15,
              borderBottomRightRadius: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              backgroundColor: theme.buttonColor,
            }}
            onPress={() => {
              if (boardData.public) {
                //* Show Save Modal
                setSaveModalVisible(true);
              } else {
                updateBoard(route.params.boardID, boardData, () =>
                  navigation.pop(),
                );
              }
            }}>
            <Text style={{fontSize: 16, color: '#333'}}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BoardEditorScreen;
