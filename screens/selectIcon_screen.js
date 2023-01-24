import React, {useContext, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../components/appContext';
import styles from '../styles/selectIcon_styles';

/*

URL for AAC image library API:
https://elelad.github.io/SymboTalkAPIDocs/#introduction

*/

const SelectIconScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const iconNames = Object.keys(Icon.getRawGlyphMap());
  const [search, setSearch] = useState('');

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.icons}
        onPress={() => navigation.navigate('AddCommand', {icon: item})}>
        <Icon name={item} size={60} color={theme.iconColor} />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{...styles.container, backgroundColor: theme.background}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{position: 'absolute', top: 5, left: 5}}
            onPress={() => navigation.goBack()}>
            <Icon name={'arrow-left'} size={30} color={theme.iconColor} />
          </TouchableOpacity>
          <Text style={{fontSize: 32, color: theme.text}}>Select Icon</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={{
              ...styles.searchBar,
              backgroundColor: theme.textInput,
              color: theme.text,
            }}
            placeholder={'Search icons'}
            placeholderTextColor={theme.placeholderText}
          />
          <Icon
            name={'magnify'}
            size={35}
            style={styles.searchIcon}
            color={theme.iconColor}
          />
        </View>
        <FlatList
          numColumns={3}
          columnWrapperStyle={styles.columns}
          data={iconNames.filter(icon => icon.includes(search))}
          initialNumToRender={48}
          renderItem={renderItem}
          keyExtractor={item => item}
          onEndReachedThreshold={1}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SelectIconScreen;
