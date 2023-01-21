import React, {useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteCommandModal = props => {
  return (
    <Modal
      visible={props.modalVisible}
      transparent={true}
      onRequestClose={props.minimizeModal}>
      <TouchableWithoutFeedback onPress={props.minimizeModal}>
        <View style={localStyles.container}>
          <View style={localStyles.content}>
            <TouchableOpacity
              onPress={props.minimizeModal}
              style={localStyles.closeButton}>
              <Icon name="close" size={30} />
            </TouchableOpacity>
            <View style={localStyles.header}>
              <Text style={localStyles.text}>Delete Command?</Text>
            </View>
            <View>
              <TouchableOpacity
                style={localStyles.deleteButton}
                onPress={() => {
                  props.deleteCallback();
                  props.minimizeModal();
                }}>
                <Text style={localStyles.text}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteCommandModal;

const localStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    height: 150,
    width: 225,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  deleteButton: {
    height: 50,
    width: 110,
    borderRadius: 25,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});
