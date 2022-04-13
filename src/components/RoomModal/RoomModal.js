import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import Modal from 'react-native-modal';

import ButtonBox from '../../components/ButtonBox';

import styles from './RoomModal.style';
import ColorCode from '../../utils/ColorCode';

const RoomModal = ({visible, onClose, onSend}) => {
  const [text, setText] = useState();
  useEffect(() => {
    setText(null);
  }, [onSend]);

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <TextInput
          style={styles.text}
          placeholder="Enter a Channel Name"
          placeholderTextColor={ColorCode('grey3')}
          onChangeText={setText}
          autoCorrect={false}
          maxLength={22}
        />
        <ButtonBox text="Create" onPress={() => onSend(text)} />
      </View>
    </Modal>
  );
};

export default RoomModal;
