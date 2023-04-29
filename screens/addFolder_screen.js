import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/add_styles';
import AppContext from '../components/appContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddFolderScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;

  const [errorMessage, setErrorMessage] = useState('');
  const [newCategory, setNewCategory] = useState('');

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{position: 'absolute', top: 5, left: 5}}
          onPress={() => navigation.navigate('Home')}>
          <Icon name={'arrow-left'} size={30} color={theme.iconColor} />
        </TouchableOpacity>
        <Text style={{color: theme.text, fontSize: 32}}>Add Folder</Text>
      </View>
      <View style={styles.textContainer}>
        <Icon
          name={'plus'}
          size={30}
          color={theme.iconColor}
          style={styles.icon}
        />
        <TextInput
          onChangeText={setNewCategory}
          placeholder={'New folder name'}
          placeholderTextColor={theme.placeholderText}
          style={{
            ...styles.textInput,
            color: theme.text,
            backgroundColor: theme.textInput,
          }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={{color: 'red'}}>{errorMessage}</Text>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: theme.buttonColor}}
          onPress={() => {
            if (newCategory === '') {
              setErrorMessage('Please enter folder name');
              return;
            }
            for (var i = 0; i < context.categories.length; i++) {
              if (context.categories[i].name === newCategory) {
                setErrorMessage('Folder already exists');
                return;
              }
            }
            const newCat = {
              name: newCategory,
              iconName: 'folder-open',
            };
            // updateCategoryList(newCat, () => {});
            context.updateContext(context, {
              categories: [...context.categories, newCat],
            });
            navigation.pop();
          }}>
          <Text style={{color: 'black'}}>Add Folder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddFolderScreen;
