import React, {useState} from 'react';
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

const UserInfoScreen = ({navigation}) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [chronologicalAge, setChronologicalAge] = useState(-1);
  const [cognitiveAge, setCognitiveAge] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');

  const continuePressed = () => {
    storeUserInfo(
      first,
      last,
      chronologicalAge,
      cognitiveAge,
      () => navigation.navigate('NavBar'),
      setErrorMessage,
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={styles.container}>
        <Text style={local_styles.header}>Welcome to [APP NAME]</Text>
        <Text style={local_styles.subheader}>Tell us more about yourself!</Text>

        <View style={styles.input}>
          <Icon
            name={'account-box'}
            size={30}
            containerStyle={styles.icons}
            color={'gray'}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'First Name'}
            onChangeText={setFirst}
            value={first}
          />
        </View>

        <View style={styles.input}>
          <Icon
            name={'account-box'}
            size={30}
            containerStyle={styles.icons}
            color={'gray'}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Last Name'}
            onChangeText={setLast}
            value={last}
          />
        </View>

        <View style={styles.input}>
          <Icon
            name={'elderly'}
            size={30}
            containerStyle={styles.icons}
            color={'gray'}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Chronological Age'}
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
            color={'gray'}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Cognitive Age'}
            keyboardType={'numeric'}
            onChangeText={setCognitiveAge}
            value={cognitiveAge}
          />
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity style={styles.loginButton} onPress={continuePressed}>
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
