import auth from '@react-native-firebase/auth';
import React, {useContext} from 'react';

import {Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppContext from '../components/appContext';
import styles from '../styles/account_styles';

const AccountScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.background,
      }}>
      <View style={styles.header}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsIcon}>
          <Icon name={'settings-outline'} size={30} color={theme.iconColor} />
        </TouchableOpacity> */}
        <Text style={{color: theme.text, fontSize: 32}}>Account</Text>
      </View>

      <Text style={{...styles.subheader, color: theme.iconColor}}>
        User Information
      </Text>
      <View style={{...styles.accountInfo, borderBottomColor: theme.iconColor}}>
        <View style={styles.infoTags}>
          <Text style={{...styles.accountInfoText, color: theme.text}}>
            Name:
          </Text>
          <Text style={{...styles.accountInfoText, color: theme.text}}>
            Email:
          </Text>
          <Text style={{...styles.accountInfoText, color: theme.text}}>
            Age:
          </Text>
        </View>
        <View style={styles.accountInfoText}>
          <Text style={{...styles.accountInfoText, color: theme.iconColor}}>
            {context.firstName} {context.lastName}
          </Text>
          <View style={styles.email}>
            <Text
              style={{
                ...styles.accountInfoText,
                width: 160,
                color: theme.iconColor,
              }}
              numberOfLines={1}>
              {auth().currentUser.email}
            </Text>
            <TouchableOpacity
              style={{display: 'flex', flexDirection: 'row'}}
              disabled={auth().currentUser.emailVerified}
              onPress={() => {
                auth().currentUser.sendEmailVerification();
              }}>
              <Icon
                name="ios-shield-checkmark"
                size={20}
                color={
                  auth().currentUser.emailVerified
                    ? 'dodgerblue'
                    : theme.iconColor
                }
                style={{marginLeft: 10}}
              />
              <Text
                style={{
                  color: auth().currentUser.emailVerified
                    ? 'dodgerblue'
                    : theme.iconColor,
                }}>
                {auth().currentUser.emailVerified ? ' Verified' : ' Unverified'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{...styles.accountInfoText, color: theme.iconColor}}>
            {context.chronologicalAge}
          </Text>
        </View>
      </View>

      <Text style={{...styles.subheader, color: theme.iconColor}}>
        Customization Options
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('VoiceSelection')}
        style={styles.selectionMenu}>
        <Text style={{color: theme.text, fontSize: 16}}>Voice Selection</Text>
        <Icon name="ios-chevron-forward" size={25} color={theme.iconColor} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        style={styles.selectionMenu}>
        <Text style={{color: theme.text, fontSize: 16}}>Theme Selection</Text>
        <Icon name="ios-chevron-forward" size={25} color={theme.iconColor} />
      </TouchableOpacity>

      <View
        style={{
          ...styles.accountOptions,
          borderTopColor: theme.iconColor,
        }}>
        <Text
          style={{
            color: theme.iconColor,
            width: '100%',
            fontSize: 16,
            marginBottom: 15,
          }}>
          Account Options
        </Text>

        {context.isPremiumUser ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('ManageSubscriptions')}>
            <Text style={{color: 'dodgerblue'}}>Premium Account</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row'}}
            onPress={() => navigation.navigate('PurchaseScreen')}>
            <Text style={{color: theme.iconColor, marginRight: 10}}>
              Standard Account
            </Text>
            <Text style={{color: 'dodgerblue'}}>Upgrade</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            auth().signOut();
            context.clearContext();
            navigation.navigate('Login');
          }}>
          <Text style={{color: theme.iconColor}}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
