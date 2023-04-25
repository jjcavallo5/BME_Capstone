import React, {useContext} from 'react';

import {Text, SafeAreaView, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppContext from '../components/appContext';
import styles from '../styles/account_styles';

const PremiumPurchased = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#000044',
      }}>
      <View
        style={{
          display: 'flex',
          width: '100%',
          backgroundColor: '#000044',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{position: 'absolute', top: 20, left: 20}}
          onPress={() => navigation.navigate('NavBar')}>
          <Icon size={30} name={'close'} color={'white'} />
        </TouchableOpacity>
        <Image
          source={require('../images/logo.png')}
          style={{width: 205, height: 200, margin: 40}}
        />
      </View>
      <View
        style={{
          display: 'flex',
          backgroundColor: theme.background,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          padding: 40,
        }}>
        <Text
          style={{
            color: theme.text,
            fontSize: 24,
            marginTop: 40,
            textAlign: 'center',
          }}>
          Thank You for Purchasing SpeakUp Premium!
        </Text>

        <View style={{margin: 20, display: 'flex', alignItems: 'center'}}>
          <Text style={{color: theme.iconColor, textAlign: 'center'}}>
            Your investment will help us develop new features that fit your
            needs
          </Text>

          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.buttonColor,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={() => navigation.navigate('VoiceSelection')}>
            <Text style={{color: 'black', fontSize: 16}}>
              Select Premium Voice!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('NavBar')}>
            <Text style={{color: theme.iconColor, fontSize: 14}}>
              Return to Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PremiumPurchased;
