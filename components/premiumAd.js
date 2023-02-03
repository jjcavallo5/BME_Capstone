import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/premiumAdStyles';

const PremiumAd = props => {
  return (
    <Modal
      visible={props.modalVisible}
      transparent={true}
      onRequestClose={props.minimizeModal}>
      <TouchableWithoutFeedback onPress={props.minimizeModal}>
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={props.minimizeModal}
              style={styles.closeButton}>
              <Icon name="close" size={30} />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.text}>Premium Feature</Text>
            </View>
            <View style={styles.body}>
              <Text style={{fontSize: 24, textAlign: 'center'}}>
                You have found a premium feature!
              </Text>
              <Text style={{textAlign: 'center', marginBottom: 10}}>
                Visit us at [insert link] to purchase a premium subscription
              </Text>
              <Text>What you get with premium:</Text>
              <Text>- Google machine learning-backed voices</Text>
              <Text>- Ability to add and delete your own commands</Text>
              <Text>- Ability to add and delete your own folders</Text>
              <Text>- Color customization</Text>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                Only $9.99/month!
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                //Open webpage
                const url = 'https://www.google.com/';
                Linking.canOpenURL(url)
                  .then(() => {
                    Linking.openURL(url);
                  })
                  .catch(err => {
                    console.error(err);
                  });
              }}>
              <Text style={{fontSize: 24, color: 'black'}}>Lets Go!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PremiumAd;
