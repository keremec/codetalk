import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import Modal from 'react-native-modal';

import ButtonBox from '../../components/ButtonBox';

import styles from './FirstTimeModal.style';
import {firebase} from '@react-native-firebase/auth';
import ColorCode from '../../utils/ColorCode';

const ProfileModal = ({visible, onClose, onSend}) => {
  const [text, setText] = useState();
  useEffect(() => {
    setText(null);
  }, [onSend]);

  const user = firebase.auth().currentUser;

  return (
    <Modal style={styles.modal} isVisible={visible}>
      <View style={styles.container}>
        <TextInput
          style={styles.text}
          placeholder="Enter Your Nickname"
          placeholderTextColor={ColorCode('grey3')}
          onChangeText={setText}
          autoCorrect={false}
          maxLength={20}
          autoCapitalize={'none'}
          keyboardAppearance={'dark'}
        />
        <ButtonBox text="Confirm" onPress={() => onSend(text)} />
      </View>
    </Modal>
  );
};

export default ProfileModal;
