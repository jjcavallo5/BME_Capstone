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

const SelectIconScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const iconNames = Object.keys(Icon.getRawGlyphMap());
  const [lastIndex, setLastIndex] = useState(48);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const loadNextBatch = async () => {
    if (loading) return;

    setLoading(true);
    setLastIndex(lastIndex + 12);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 32, color: theme.text}}>Select Icon</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={{...styles.searchBar, backgroundColor: theme.textInput}}
            placeholder={'Search icons'}
            placeholderTextColor={theme.placeholderText}
          />
          <Icon name={'magnify'} size={35} style={styles.searchIcon} />
        </View>
        <FlatList
          numColumns={3}
          columnWrapperStyle={styles.columns}
          data={iconNames
            .filter(icon => {
              return icon.includes(search.toLowerCase());
            })
            .slice(0, lastIndex)}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.icons}
                onPress={() => navigation.navigate('AddCommand', {icon: item})}>
                <Icon name={item} size={60} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item}
          onEndReachedThreshold={1}
          onEndReached={loadNextBatch}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SelectIconScreen;
