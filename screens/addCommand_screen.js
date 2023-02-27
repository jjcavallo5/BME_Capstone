import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import styles from '../styles/add_styles';
import {updateCommandList} from '../backend/firestore_functions';
import AppContext from '../components/appContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Command from '../components/command';
import ColorPickerModal from '../components/colorPicker';

const AddCommandScreen = ({route, navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const categories = context.categories;
  const icon = route.params ? route.params.icon : 'star';

  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [category, setCategory] = useState('None');
  const [backgroundColor, setBackgroundColor] = useState(theme.textInput);
  const [textColor, setTextColor] = useState(theme.text);
  const [iconColor, setIconColor] = useState(theme.iconColor);
  const [backgroundColorDisplay, setBackgroundColorDisplay] = useState('none');
  const [textColorDisplay, setTextColorDisplay] = useState('none');
  const [iconColorDisplay, setIconColorDisplay] = useState('none');
  const [items, setItems] = useState([
    {label: 'None', value: 'None'},
    ...categories.map(category => {
      return {label: category.name, value: category.name};
    }),
  ]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setBackgroundColorDisplay('none');
        setTextColorDisplay('none');
        setIconColorDisplay('none');
        Keyboard.dismiss();
      }}>
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

        <ColorPickerModal
          callback={setBackgroundColor}
          hideModal={setBackgroundColorDisplay}
          display={backgroundColorDisplay}
        />
        <ColorPickerModal
          callback={setTextColor}
          hideModal={setTextColorDisplay}
          display={textColorDisplay}
        />
        <ColorPickerModal
          callback={setIconColor}
          hideModal={setIconColorDisplay}
          display={iconColorDisplay}
        />

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
          <Text style={{color: theme.text, fontSize: 16}}>Icon:</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectIcon')}
            style={styles.iconSelectContainer}>
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: theme.textInput,
              }}>
              <Icon name={icon} size={50} color={theme.iconColor} />
            </View>
          </TouchableOpacity>
          <Text style={{color: theme.text, fontSize: 16}}>Color:</Text>
          <TouchableOpacity
            style={styles.iconSelectContainer}
            onPress={() => setBackgroundColorDisplay('flex')}>
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: theme.textInput,
              }}>
              <View
                style={{
                  ...styles.iconContainer,
                  height: 35,
                  width: 35,
                  backgroundColor: backgroundColor,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.iconSelectContainer}>
          <Text style={{color: theme.text, fontSize: 16}}>Icon Color:</Text>
          <TouchableOpacity
            onPress={() => setIconColorDisplay('flex')}
            style={styles.iconSelectContainer}>
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: theme.textInput,
              }}>
              <Icon name={icon} size={50} color={iconColor} />
            </View>
          </TouchableOpacity>
          <Text style={{color: theme.text, fontSize: 16}}>Text Color:</Text>
          <TouchableOpacity
            style={styles.iconSelectContainer}
            onPress={() => setTextColorDisplay('flex')}>
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: theme.textInput,
              }}>
              <View
                style={{
                  ...styles.iconContainer,
                  height: 35,
                  width: 35,
                  backgroundColor: textColor,
                }}
              />
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
        <View style={styles.preview}>
          <View
            style={{
              ...styles.commandContainer,
              backgroundColor: backgroundColor,
            }}>
            <Icon name={icon} size={50} color={iconColor} />
            <Text style={{color: textColor}}>{command}</Text>
          </View>
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
                backgroundColor: backgroundColor,
                textColor: textColor,
                iconColor: iconColor,
              };
              // updateCommandList(newCmd, () => {});
              context.updateContext(context, {
                commands: [...context.commands, newCmd],
              });
              navigation.navigate('Home');
            }}>
            <Text style={{color: 'black'}}>Add Command</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddCommandScreen;
