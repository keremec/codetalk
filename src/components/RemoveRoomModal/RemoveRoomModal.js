import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';

import ButtonBox from '../../components/ButtonBox';

import styles from './RemoveRoomModal.style';
import {firebase} from '@react-native-firebase/auth';

const ProfileModal = ({visible, onClose, onSend}) => {
  const [text, setText] = useState();
  useEffect(() => {
    setText(null);
  }, [onSend]);

  const user = firebase.auth().currentUser;

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.text}>Are you sure to delete this room?</Text>
        <ButtonBox text="Delete Room" theme={'tertiary'} onPress={onSend} />
      </View>
    </Modal>
  );
};

export default ProfileModal;
