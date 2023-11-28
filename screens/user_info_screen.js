import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

import styles from '../styles/registration_styles';
import {storeUserInfo} from '../backend/firestore_functions';
import {
  defaultCategoryList,
  defaultCommandList,
} from '../components/default_commands';
import {default_commands_05} from '../components/default_commands_05';
import {default_commands_69} from '../components/default_commands_69';
import AppContext from '../components/appContext';

const UserInfoScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [chronologicalAge, setChronologicalAge] = useState(-1);
  const [cognitiveAge, setCognitiveAge] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');

  const continuePressed = () => {
    var commandList = defaultCommandList;
    if (cognitiveAge < 6) commandList = default_commands_05;
    else if (cognitiveAge < 10) commandList = default_commands_69;

    storeUserInfo(
      first,
      last,
      chronologicalAge,
      cognitiveAge,
      () => {
        var update = {
          firstName: first,
          lastName: last,
          chronologicalAge: chronologicalAge,
          cognitiveAge: cognitiveAge,
          commands: commandList,
        };
        context.setNewContext({...context, ...update});
        navigation.navigate('NavBar');
      },
      setErrorMessage,
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView
        style={{...styles.container, backgroundColor: theme.background}}>
        <Text style={{...local_styles.header, color: theme.text}}>
          Welcome to SpeakUp!
        </Text>
        <Text style={{...local_styles.subheader, color: theme.text}}>
          Tell us more about yourself!
        </Text>

        <View style={styles.input}>
          <Icon
            name={'account-box'}
            size={30}
            containerStyle={styles.icons}
            color={theme.iconColor}
          />
          <TextInput
            style={{
              ...styles.textInput,
              backgroundColor: theme.textInput,
              color: theme.text,
            }}
            placeholder={'First Name'}
            placeholderTextColor={theme.placeholderText}
            onChangeText={setFirst}
            value={first}
          />
        </View>

        <View style={styles.input}>
          <Icon
            name={'account-box'}
            size={30}
            containerStyle={styles.icons}
            color={theme.iconColor}
          />
          <TextInput
            style={{
              ...styles.textInput,
              backgroundColor: theme.textInput,
              color: theme.text,
            }}
            placeholder={'Last Name'}
            placeholderTextColor={theme.placeholderText}
            onChangeText={setLast}
            value={last}
          />
        </View>

        <View style={styles.input}>
          <Icon
            name={'elderly'}
            size={30}
            containerStyle={styles.icons}
            color={theme.iconColor}
          />
          <TextInput
            style={{
              ...styles.textInput,
              backgroundColor: theme.textInput,
              color: theme.text,
            }}
            placeholder={'Chronological Age'}
            placeholderTextColor={theme.placeholderText}
            keyboardType={'numeric'}
            onChangeText={setChronologicalAge}
            value={chronologicalAge}
          />
        </View>

        <View style={styles.input}>
          <Icon
            name={'psychology'}
            size={30}
            containerStyle={styles.icons}
            color={theme.iconColor}
          />
          <TextInput
            style={{
              ...styles.textInput,
              backgroundColor: theme.textInput,
              color: theme.text,
            }}
            placeholder={'Cognitive Age'}
            placeholderTextColor={theme.placeholderText}
            keyboardType={'numeric'}
            onChangeText={setCognitiveAge}
            value={cognitiveAge}
          />
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity
          style={{...styles.loginButton, backgroundColor: theme.buttonColor}}
          onPress={continuePressed}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UserInfoScreen;

const local_styles = StyleSheet.create({
  header: {
    fontSize: 32,
    marginTop: 50,
  },
  subheader: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 40,
  },
});
