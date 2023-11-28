import React, {useContext, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';

import styles from '../styles/settings_styles';
import Command from '../components/command';

import AppContext from '../components/appContext';
import {TouchableOpacity} from 'react-native';

const GridSizeScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const [gridSize, setGridSize] = useState(6 - context.gridSize);
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.background,
        height: '100%',
      }}>
      <View style={styles.header}>
        <Icon
          name={'arrow-back'}
          size={30}
          color={theme.iconColor}
          onPress={() => navigation.navigate('Account')}
          style={styles.backIcon}
        />
        <Text style={{color: theme.text, fontSize: 32}}>Grid Size</Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Slider
          style={{
            width: 300,
            height: 60,
            justifySelf: 'center',
          }}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={gridSize}
          onValueChange={setGridSize}
          minimumTrackTintColor={theme.iconColor}
          maximumTrackTintColor={theme.iconColor}
          thumbTintColor="dodgerblue"
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <Command
            name={'Preview'}
            iconName={'folder-open'}
            iconURL={''}
            gridSize={6 - gridSize}
            style={{
              color: theme.text,
              backgroundColor: theme.textInput,
            }}
            iconColor={theme.iconColor}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 100,
        }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 200,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            backgroundColor: theme.buttonColor,
          }}
          onPress={() => {
            context.updateContext(context, {gridSize: 6 - gridSize});
            navigation.pop();
          }}>
          <Text style={{fontSize: 16, color: '#333'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GridSizeScreen;
