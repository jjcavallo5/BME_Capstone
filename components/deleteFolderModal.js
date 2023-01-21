import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/modalStyles';

const DeleteFolderModal = props => {
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
              <Text style={styles.text}>Delete Folder?</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  props.deleteCallback();
                  props.minimizeModal();
                }}>
                <Text style={styles.text}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteFolderModal;
