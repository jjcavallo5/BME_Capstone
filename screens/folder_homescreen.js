import React, {useContext, useState, useEffect} from 'react';

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
import BoardContext from '../components/boardContext';
import Command from '../components/command';
import {getActiveBoard} from '../backend/firestore_functions';

const FolderHomeScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const boardContext = useContext(BoardContext);
  const theme = context.theme;
  const commands = boardContext.commands;
  const categories = boardContext.categories;
  const name = context.firstName;

  const [modalVisible, setModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [cmdToDelete, setCmdToDelete] = useState('');
  const [folderToDelete, setFolderToDelete] = useState('');
  const [premiumAdVisible, setPremiumAdVisible] = useState(false);
  const [savedBoards, setSavedBoards] = useState([]);

  const recursiveGetBoard = (array, i, callback) => {
    getActiveBoard(boardContext.savedBoards[i], boardData => {
      array.push(boardData);

      if (i + 1 < boardContext.savedBoards.length)
        recursiveGetBoard(array, i + 1, callback);
      else callback(array);
    });
  };

  useEffect(() => {
    let array = [];
    recursiveGetBoard(array, 0, arr => setSavedBoards(arr));

    // getActiveBoard(boardContext.savedBoards[i], boardData => {
    //   if (!savedBoards.some(e => e.name === boardData.name)) {
    //     setSavedBoards([...savedBoards, boardData]);
    //     // console.log(boardContext.savedBoards[i], savedBoards);
    //   }
    // });

    // console.log(boardContext.savedBoards.length);
    // console.log('HI', savedBoards);
  }, [boardContext]);

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.header}>
        <Text style={{...styles.headerText, color: theme.text}}>My Boards</Text>
      </View>
      <PremiumAd
        modalVisible={premiumAdVisible}
        minimizeModal={() => setPremiumAdVisible(false)}
        navigate={() => {
          setPremiumAdVisible(false);
          navigation.navigate('PurchaseScreen');
        }}
      />
      <ScrollView>
        <Text style={{color: theme.text}}>Active Board</Text>
        <Text>{boardContext.name}</Text>
        <View style={{...styles.commandContainer}}>
          {commands
            .sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            })
            .slice(0, 5)
            .map(cmd => {
              return (
                <Command
                  name={cmd.name}
                  iconName={cmd.iconName}
                  iconURL={cmd.iconURL}
                  key={cmd.name}
                  style={{color: theme.text, backgroundColor: theme.textInput}}
                  iconColor={theme.iconColor}
                  gridSize={3}
                />
              );
            })}

          <Command
            name={'More...'}
            iconName={'arrow-right'}
            style={{color: theme.text, backgroundColor: theme.textInput}}
            iconColor={theme.iconColor}
            gridSize={3}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#dddddd77',
              borderRadius: 10,
              paddingTop: 10,
              paddingBottom: 10,
              bottom: 0,
              top: 0,
              zIndex: 3,
            }}
            onPress={() =>
              navigation.navigate('BoardEditor', {boardID: context.boardID})
            }
          />
        </View>
        <Text style={{color: theme.text}}>Saved</Text>
        {savedBoards.length > 0 ? (
          savedBoards.map((boardData, idx) => {
            return (
              <View key={idx}>
                <Text>{boardData.name}</Text>
                <View style={styles.commandContainer}>
                  {commands
                    .sort((a, b) => {
                      if (a.name.toLowerCase() < b.name.toLowerCase())
                        return -1;
                      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    })
                    .slice(0, 5)
                    .map(cmd => {
                      return (
                        <Command
                          name={cmd.name}
                          iconName={cmd.iconName}
                          iconURL={cmd.iconURL}
                          key={cmd.name}
                          style={{
                            color: theme.text,
                            backgroundColor: theme.textInput,
                          }}
                          iconColor={theme.iconColor}
                          gridSize={3}
                        />
                      );
                    })}
                  <Command
                    name={'More...'}
                    iconName={'arrow-right'}
                    style={{
                      color: theme.text,
                      backgroundColor: theme.textInput,
                    }}
                    iconColor={theme.iconColor}
                    gridSize={3}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      width: '100%',
                      backgroundColor: '#dddddd77',
                      borderRadius: 10,
                      paddingTop: 10,
                      paddingBottom: 10,
                      bottom: 0,
                      top: 0,
                      zIndex: 3,
                    }}
                    onPress={() =>
                      navigation.navigate('BoardEditor', {
                        boardID: boardContext.savedBoards[idx],
                      })
                    }
                  />
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.commandContainer}>
            <Text>Saved Boards Will Appear Here</Text>
          </View>
        )}
      </ScrollView>

      {/* <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            if (context.isPremiumUser) navigation.navigate('AddFolder');
            else setPremiumAdVisible(true);
          }}>
          <Icon name={'plus'} size={35} color={theme.iconColor} />
        </TouchableOpacity>
        <Text>Create New</Text>
      </View> */}
    </SafeAreaView>
  );
};

export default FolderHomeScreen;
