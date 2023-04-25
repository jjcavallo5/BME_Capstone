import React, {useContext} from 'react';

import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Linking,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppContext from '../components/appContext';
import styles from '../styles/account_styles';

const ManageSubscriptionScreen = ({navigation}) => {
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
        <Text style={{color: theme.text, fontSize: 24, marginBottom: 20}}>
          Manage Subscription
        </Text>

        <Text style={{color: theme.iconColor, fontSize: 14}}>
          Access to custom commands and premium voices will be revoked upon
          subscription cancelation. If user decides to purchase subscription
          again in the future, custom commands will be saved.
        </Text>

        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
          onPress={() =>
            Linking.openURL(
              'https://play.google.com/store/account/subscriptions?package=com.bme_capstone&sku=premium_subscription',
            )
          }>
          <Text style={{color: 'white', fontSize: 16}}>
            Cancel Subscription
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ManageSubscriptionScreen;
