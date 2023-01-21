import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../styles/add_styles';
import {updateCommandList} from '../backend/firestore_functions';
import AppContext from '../components/appContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddCommandScreen = ({route, navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const categories = context.categories;
  const icon = route.params ? route.params.icon : 'star';

  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [category, setCategory] = useState('None');
  const [items, setItems] = useState([
    {label: 'None', value: 'None'},
    ...categories.map(category => {
      return {label: category.name, value: category.name};
    }),
  ]);

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{position: 'absolute', top: 5, left: 5}}
          onPress={() => navigation.navigate('Home')}>
          <Icon name={'arrow-left'} size={30} color={theme.iconColor} />
        </TouchableOpacity>
        <Text style={{color: theme.text, fontSize: 32}}>Add Command</Text>
      </View>
      <View style={styles.textContainer}>
        <Icon
          name={'plus'}
          size={30}
          color={theme.iconColor}
          style={styles.icon}
        />
        <TextInput
          onChangeText={setCommand}
          placeholder={'New command'}
          placeholderTextColor={theme.placeholderText}
          style={{
            ...styles.textInput,
            color: theme.text,
            backgroundColor: theme.textInput,
          }}
        />
      </View>
      <View style={styles.iconSelectContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectIcon')}
          style={styles.iconSelectContainer}>
          <Text>Icon:</Text>
          <View
            style={{...styles.iconContainer, backgroundColor: theme.textInput}}>
            <Icon name={icon} size={50} color={theme.iconColor} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <DropDownPicker
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          containerStyle={{
            ...styles.dropdown,
            backgroundColor: theme.textInput,
          }}
          style={{
            backgroundColor: theme.textInput,
            color: theme.text,
            borderWidth: 0,
          }}
          labelStyle={{backgroundColor: theme.textInput, color: theme.text}}
        />
      </View>
      <View style={styles.footer}>
        <Text style={{color: 'red'}}>{errorMessage}</Text>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: theme.buttonColor}}
          onPress={() => {
            if (command === '') {
              setErrorMessage('Please enter command');
              return;
            }
            const newCmd = {
              category: category,
              name: command,
              iconName: icon,
            };
            updateCommandList(newCmd, () => {});
            context.updateContext({
              ...context,
              commands: [...context.commands, newCmd],
            });
            navigation.navigate('Home');
          }}>
          <Text style={{color: 'black'}}>Add Command</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCommandScreen;
