import React, {useContext} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Command from '../components/command';
import AppContext from '../components/appContext';
import styles from '../styles/homescreen_styles';

const FolderScreen = ({route, navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const voice = context.voice;
  const {category, commands} = route.params;

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: theme.background}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{position: 'absolute', top: 5, left: 5}}
          onPress={() => navigation.navigate('Home')}>
          <Icon name={'arrow-back'} size={30} color={theme.iconColor} />
        </TouchableOpacity>
        <Text style={{fontSize: 32, color: theme.text}}>{category}</Text>
      </View>
      <View style={styles.commandContainer}>
        {commands.map(cmd => {
          return (
            <Command
              name={cmd.name}
              iconName={cmd.iconName}
              iconURL={cmd.iconURL}
              key={cmd.name}
              style={{
                color: cmd.textColor ? cmd.textColor : theme.text,
                backgroundColor: cmd.backgroundColor
                  ? cmd.backgroundColor
                  : theme.textInput,
              }}
              iconColor={cmd.iconColor ? cmd.iconColor : theme.iconColor}
              voice={voice}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default FolderScreen;
