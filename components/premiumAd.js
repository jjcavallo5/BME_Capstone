import React, {useContext} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/premiumAdStyles';
import AppContext from './appContext';

const PremiumAd = props => {
  const context = useContext(AppContext);

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
              <Text
                style={{fontSize: 24, textAlign: 'center', marginBottom: 20}}>
                You have found a premium feature!
              </Text>
              <Text>What you get with premium:</Text>
              <Text>- Google Cloud voices</Text>
              <Text>- Add and delete your own commands</Text>
              <Text>- Add and delete your own folders</Text>
              <Text>- Color customization</Text>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'center',
                  marginTop: 20,
                  color: 'black',
                }}>
                Only $9.99/month!
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigate();
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
