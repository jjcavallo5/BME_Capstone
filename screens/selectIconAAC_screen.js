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
  Image,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'react-native-config';
import AppContext from '../components/appContext';
import styles from '../styles/selectIcon_styles';

/*

URL for AAC image library API:
https://elelad.github.io/SymboTalkAPIDocs/#introduction

*/

const SelectIconAACScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const iconNames = Object.keys(Icon.getRawGlyphMap());
  const [search, setSearch] = useState('');
  const [responseURLs, setResponseURLs] = useState([]);
  const [isAACIcon, setIsAACIcon] = useState(true);

  const renderAAC = ({item}) => {
    const extension = item.slice(-3);

    return (
      <TouchableOpacity
        style={{
          ...styles.icons,
          height: 80,
          width: 80,
          margin: 10,
          backgroundColor: theme.textInput,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('AddCommand', {iconURL: item})}>
        {extension != 'svg' ? (
          <Image source={{uri: item}} style={{height: 60, width: 60}} />
        ) : (
          <SvgUri uri={item} width={60} height={60} />
        )}
      </TouchableOpacity>
    );
  };

  const renderStandard = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.icons,
          height: 80,
          width: 80,
          margin: 10,
          backgroundColor: theme.textInput,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('AddCommand', {icon: item})}>
        <Icon name={item} size={60} color={theme.iconColor} />
      </TouchableOpacity>
    );
  };

  const MakeRequest = () => {
    let url = `https://symbotalkapiv1.azurewebsites.net/search/?name=${search}&lang=en&repo=all`;
    url = `https://www.opensymbols.org/api/v2/symbols?q=${search}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: Config.KEY_OPENAAC,
      },
    })
      .then(response => response.json())
      .then(json => {
        let urls = [];
        json.forEach(resp => {
          urls.push(resp.image_url);
        });

        setResponseURLs(urls);
      })
      .catch(err => console.error(err));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{...styles.container, backgroundColor: theme.background}}>
        {/* <Text>{iconNames}</Text> */}

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
            onSubmitEditing={MakeRequest}
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

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              marginRight: 10,
              borderBottomColor: theme.text,
              borderBottomWidth: isAACIcon ? 1 : 0,
            }}
            onPress={() => setIsAACIcon(true)}>
            <Text
              style={{
                fontSize: 20,
                color: isAACIcon ? 'dodgerblue' : theme.text,
              }}>
              AAC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 10,
              borderBottomColor: theme.text,
              borderBottomWidth: isAACIcon ? 0 : 1,
            }}
            onPress={() => setIsAACIcon(false)}>
            <Text
              style={{
                fontSize: 20,
                color: theme.text,
                color: isAACIcon ? theme.text : 'dodgerblue',
              }}>
              Symbol
            </Text>
          </TouchableOpacity>
        </View>

        {search === '' ? (
          <Text style={{color: theme.placeholderText}}>
            Search for a symbol
          </Text>
        ) : isAACIcon ? (
          <FlatList
            numColumns={3}
            columnWrapperStyle={styles.columns}
            data={responseURLs}
            initialNumToRender={48}
            renderItem={renderAAC}
            keyExtractor={item => item}
            onEndReachedThreshold={1}
          />
        ) : (
          <FlatList
            numColumns={3}
            columnWrapperStyle={styles.columns}
            data={iconNames.filter(icon => icon.includes(search))}
            initialNumToRender={48}
            renderItem={renderStandard}
            keyExtractor={item => item}
            onEndReachedThreshold={1}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SelectIconAACScreen;
