import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('Home')}>
        <Image style={styles.icons} source={'../images/home_icon.png'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('TTS')}>
        <Image style={styles.icons} source={'../images/search_icon.png'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('Account')}>
        <Image style={styles.icons} source={'../images/account_icon.png'} />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: 'red',
  },
  buttons: {
    width: '33%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  icons: {
    width: 75,
    height: 75,
  },
});
