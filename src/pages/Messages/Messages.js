import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import MessageCard from '../../components/MessageCard';
import TextBar from '../../components/TextBar';

import Styles from './Messages.style';
import parseContentData from '../../utils/parseContentData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorCode from '../../utils/ColorCode';
import RemoveRoomModal from '../../components/RemoveRoomModal/RemoveRoomModal';

const Messages = ({route, navigation}) => {
  const [contentList, setContentList] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const {roomName, key} = route.params;

  const [removeRoomModalVisible, setRemoveRoomModalVisible] = useState(false);

  const handleRemoveRoomModalToggle = useCallback(() => {
    setRemoveRoomModalVisible(!removeRoomModalVisible);
  }, [removeRoomModalVisible]);

  const handleRemoveRoom = () => {
    handleRemoveRoomModalToggle();
    database()
      .ref(`Rooms/${key}`)
      .set(null)
      .then(() => navigation.navigate('Rooms'));
  };

  useEffect(() => {
    //check if the page is rendered to prevent memory leaks
    let isRendered = true;
    //header components
    database()
      .ref(`Rooms/${key}`)
      .child('roomOwner')
      .on('value', snapshot => {
        const ownerID = snapshot.val();
        if (isRendered) {
          setIsOwner(ownerID == auth().currentUser.uid);
        }
      });

    navigation.setOptions({
      title: roomName,
      headerRight: () =>
        isOwner && (
          <Icon
            name="card-remove-outline"
            style={{marginRight: 15}}
            color={ColorCode('grey5')}
            size={30}
            onPress={handleRemoveRoomModalToggle}
          />
        ),
      headerLeft: () => (
        <Icon
          name="chevron-left"
          style={{marginLeft: 15}}
          color={ColorCode('grey5')}
          size={30}
          onPress={() => navigation.navigate('Rooms')}
        />
      ),
    });
    return () => {
      isRendered = false;
    };
  }, [handleRemoveRoomModalToggle, isOwner, key, navigation, roomName]);

  useEffect(() => {
    //check if the page is rendered to prevent memory leaks
    let isRendered = true;
    //firebase actions
    database()
      .ref(`Rooms/${key}/Messages/`)
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parseContentData(contentData || {});

        if (isRendered) {
          setContentList(parsedData);
        }
      });

    return () => {
      isRendered = false;
    };
  }, [key]);

  const handleSendMessage = content => {
    sendMessage(content);
  };

  const sendMessage = content => {
    const userName = auth().currentUser.email;

    const contentObject = {
      text: content,
      name: userName.split('@')[0],
      date: new Date().toISOString(),
    };
    database().ref(`Rooms/${key}/Messages/`).push(contentObject);
  };

  const handleMessageCard = ({item}) => {
    return <MessageCard item={item} />;
  };

  return (
    <KeyboardAvoidingView
      style={Styles.container}
      behavior={'padding'}
      keyboardVerticalOffset={70}>
      <FlatList
        data={contentList}
        renderItem={handleMessageCard}
        inverted={true}
      />
      <TextBar onSave={handleSendMessage} />
      <RemoveRoomModal
        visible={removeRoomModalVisible}
        onClose={handleRemoveRoomModalToggle}
        onSend={handleRemoveRoom}
      />
    </KeyboardAvoidingView>
  );
};

export default Messages;
