import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';

import ButtonBox from '../../components/ButtonBox';

import styles from './ProfileModal.style';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ProfileModal = ({visible, onClose, onSend}) => {
  const [text, setText] = useState();
  useEffect(() => {
    setText(null);
  }, [onSend]);

  const user = firebase.auth().currentUser;
  const [username, setUserName] = useState('User');
  database()
    .ref('Profiles/' + user.uid + '/username')
    .once('value')
    .then(snapshot => {
      setUserName(snapshot.val());
    });

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.text}>{`Hello, ${username}!`}</Text>
        <ButtonBox
          text="Sign Out"
          theme={'tertiary'}
          onPress={() => {
            auth().signOut();
            onClose();
          }}
        />
      </View>
    </Modal>
  );
};

export default ProfileModal;
