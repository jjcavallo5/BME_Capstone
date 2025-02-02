import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../styles/add_styles';
import AppContext from '../components/appContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorPickerModal from '../components/colorPicker';
import CommandIcon from '../components/CommandIcon';

const AddCommandScreen = ({route, navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const categories = context.categories;
  const icon = route.params ? route.params.icon : 'star';
  const iconURL = route.params?.iconURL;

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
          caption={'Change Background'}
        />
        <ColorPickerModal
          callback={setTextColor}
          hideModal={setTextColorDisplay}
          display={textColorDisplay}
          caption={'Change Text Color'}
        />
        <ColorPickerModal
          callback={setIconColor}
          hideModal={setIconColorDisplay}
          display={iconColorDisplay}
          caption={'Change Background'}
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

        <TouchableOpacity
          style={{...styles.iconSelectContainer, borderColor: theme.iconColor}}
          onPress={() => navigation.navigate('SelectIconAAC')}>
          <Text style={{color: theme.text, fontSize: 16}}>Select Icon</Text>
          <View>
            <Icon name="chevron-right" size={25} color={theme.iconColor} />
          </View>
        </TouchableOpacity>

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
            maxHeight={400}
          />
        </View>

        <View style={styles.preview}>
          <View
            style={{
              ...styles.commandContainer,
              backgroundColor: backgroundColor,
            }}>
            <CommandIcon
              command={{iconURL: iconURL, iconName: icon}}
              style={{height: 50, width: 50}}
              size={50}
              color={iconColor}
            />
            <Text style={{color: textColor}}>{command}</Text>
          </View>

          <View style={styles.colorSelectionPanel}>
            <TouchableOpacity
              style={{
                ...styles.iconContainer,
                height: 40,
                width: 40,
                marginBottom: 5,
                backgroundColor: theme.textInput,
              }}
              onPress={() => setBackgroundColorDisplay('flex')}>
              <Icon
                name="format-color-fill"
                size={30}
                color={theme.iconColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.iconContainer,
                height: 40,
                width: 40,
                marginTop: 5,
                backgroundColor: theme.textInput,
              }}
              onPress={() => setTextColorDisplay('flex')}>
              <Icon name="format-text" size={30} color={theme.iconColor} />
            </TouchableOpacity>
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
              for (var i = 0; i < context.commands.length; i++) {
                if (context.commands[i].name === command) {
                  setErrorMessage('Command already exists');
                  return;
                }
              }
              const newCmd = {
                category: category,
                name: command,
                iconName: icon ? icon : '',
                iconURL: iconURL ? iconURL : '',
                backgroundColor: backgroundColor,
                textColor: textColor,
                iconColor: iconColor,
                timeStamp: Date.now(),
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
