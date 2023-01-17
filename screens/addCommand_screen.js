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

const AddCommandScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const categories = context.categories;

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
        <Text style={{color: theme.text, fontSize: 32}}>Add Command</Text>
      </View>
      <View>
        <TextInput
          onChangeText={setCommand}
          placeholder={'New command'}
          placeholderTextColor={theme.placeholderColor}
          style={{
            ...styles.textInput,
            color: theme.text,
            backgroundColor: theme.textInput,
          }}
        />
      </View>
      <View>
        <DropDownPicker
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            const newCmd = {
              category: category,
              name: command,
              iconName: 'star',
            };
            updateCommandList(newCmd, () => {});
            context.updateContext({
              ...context,
              commands: [...context.commands, newCmd],
            });
            navigation.navigate('Home');
          }}>
          <Text>Add Command</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCommandScreen;
