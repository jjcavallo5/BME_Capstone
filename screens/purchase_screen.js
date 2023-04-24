import auth from '@react-native-firebase/auth';
import React, {useContext, useState, useEffect} from 'react';

import {Text, SafeAreaView, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {requestSubscription, useIAP} from 'react-native-iap';

import AppContext from '../components/appContext';
import styles from '../styles/account_styles';

const PurchaseScreen = ({navigation}) => {
  const context = useContext(AppContext);
  const theme = context.theme;
  const [autoRenew, setAutoRenew] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    connected,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    finishTransaction,
  } = useIAP();

  const handleSubscriptionPurchase = () => {
    subscribe('premium_subscription', null);
  };

  const subscribe = async (sku, offerToken) => {
    try {
      await requestSubscription({
        skus: ['premium_subscription'],
        subscriptionOffers: [
          {
            sku: 'premium_subscription',
            offerToken:
              subscriptions[0]['subscriptionOfferDetails'][0]['offerToken'],
          },
        ],
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const _initRNIAP = async () => {
    try {
      await getSubscriptions({skus: ['premium_subscription']});
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
    // getSubscriptions({
    //   skus: ['premium_subscription'],
    // })
    //   .then(subs => {
    //     console.log(subs, subs[0]['subscriptionOfferDetails']);
    //   })
    //   .catch(err => setErrorMessage(err.message));

    // const subscriptions = await getSubscriptions({
    //   skus: ['test.sub1'],
    // });
    // console.log(subscriptions);
  };

  useEffect(() => {
    if (!connected) console.log('error connecting');
    if (connected) console.log('connected');
    _initRNIAP();
  }, []);

  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        console.log(currentPurchase);
        if (currentPurchase?.productId) {
          console.log('Called');
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: false,
          });

          console.log('Transaction Complete');
          context.updateContext(context, {isPremiumUser: true});
          navigation.navigate('PremiumPurchased');
        }
      } catch (error) {
        setErrorMessage(`[${error.code}]: ${error.message}`);
      }
    };

    checkCurrentPurchase();
  }, [currentPurchase, finishTransaction]);

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
          onPress={() => navigation.pop()}>
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
        }}>
        <Text style={{color: theme.text, fontSize: 32, marginTop: 40}}>
          SpeakUp! Premium
        </Text>

        <View style={{margin: 20}}>
          <Text style={{color: theme.iconColor, fontSize: 16, paddingLeft: 40}}>
            {'\u2022  Voices backed by Google Cloud'}
          </Text>
          <Text style={{color: theme.iconColor, fontSize: 16, paddingLeft: 40}}>
            {'\u2022  Create custom commands'}
          </Text>
          <Text style={{color: theme.iconColor, fontSize: 16, paddingLeft: 40}}>
            {'\u2022  Select from nearly 2,000 symbols'}
          </Text>
          <Text style={{color: theme.iconColor, fontSize: 16, paddingLeft: 40}}>
            {'\u2022  Organize commands into folders'}
          </Text>
          <Text style={{color: theme.iconColor, fontSize: 16, paddingLeft: 40}}>
            {'\u2022  Customize colors for each command'}
          </Text>
          <View
            style={{
              disply: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: theme.iconColor, fontSize: 14}}>
              {'All for just'}
            </Text>
            <Text style={{color: theme.text, fontSize: 24, fontWeight: 'bold'}}>
              {'$9.99/month'}
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
              }}
              onPress={handleSubscriptionPurchase}>
              <Text style={{color: 'black', fontSize: 16}}>
                Purchase Subscription
              </Text>
            </TouchableOpacity>

            <Text>{errorMessage}</Text>

            <View
              style={{
                margin: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox
                value={autoRenew}
                onChange={() => setAutoRenew(!autoRenew)}
                tintColors={{true: '#000044'}}
                onCheckColor="#000044"
              />
              <Text style={{color: theme.iconColor, fontSize: 14}}>
                Check to turn on automatic subscription renewal
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PurchaseScreen;
