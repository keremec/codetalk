import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import RoomCard from '../../components/RoomCard';
import RoomModal from '../../components/RoomModal';
import ProfileModal from '../../components/ProfileModal';

import Styles from './Rooms.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorCode from '../../utils/ColorCode';
import FirstTimeModal from '../../components/FirstTimeModal/FirstTimeModal';

const Rooms = ({navigation}) => {
  const [roomList, setRoomList] = useState([]);
  const roomListRender = item => {
    return (
      <RoomCard
        text={item.roomName}
        onPress={() => navigation.navigate('Messages', item)}
      />
    );
  };

  // Modal Actions
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [firstTimeModalVisible, setFirstTimeModalVisible] = useState(false);

  const handleRoomModalToggle = useCallback(() => {
    setRoomModalVisible(!roomModalVisible);
  }, [roomModalVisible]);

  const handleProfileModalToggle = useCallback(() => {
    setProfileModalVisible(!profileModalVisible);
  }, [profileModalVisible]);

  const handleFirstTimeModalToggle = () => {
    setFirstTimeModalVisible(false);
  };

  const handleSendRoomName = roomName => {
    handleRoomModalToggle();
    const contentObject = {
      roomName: roomName,
      roomOwner: auth().currentUser.uid,
    };
    //todo ustte cıkmıyor
    const postkey = database().ref('Rooms/').push(contentObject);
    navigation.navigate('Messages', postkey);
  };

  const handleSendUserName = userName => {
    const user = auth().currentUser;
    handleFirstTimeModalToggle();
    const contentObject = {
      username: userName,
      isNewUser: false,
    };
    database()
      .ref('Profiles/' + user.uid)
      .update(contentObject)
      .then(() => handleFirstTimeModalToggle);
  };

  useEffect(() => {
    //Header Options
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="tooltip-plus-outline"
          style={{marginRight: 15}}
          color={ColorCode('grey5')}
          size={30}
          onPress={handleRoomModalToggle}
        />
      ),
      headerLeft: () => (
        <Icon
          name="account-outline"
          style={{marginLeft: 15}}
          color={ColorCode('grey5')}
          size={30}
          onPress={handleProfileModalToggle}
        />
      ),
    });

    //Firebase Actions
    const user = auth().currentUser;
    database()
      .ref('Profiles/' + user.uid)
      .child('isNewUser')
      .once('value')
      .then(snapshot => {
        snapshot.val() === true
          ? setFirstTimeModalVisible(true)
          : setFirstTimeModalVisible(false);
      });
  }, [handleProfileModalToggle, handleRoomModalToggle, navigation]);

  useEffect(() => {
    //check if the page is rendered to prevent memory leaks
    let isRendered = true;
    // Set Room List from firebase
    database()
      .ref('Rooms/')
      .on('value', snapshot => {
        const rooms = [];
        snapshot.forEach(child => {
          rooms.push({
            key: child.key,
            roomName: child.val().roomName,
            userName: child.val().owner,
          });
        });
        if (isRendered) {
          setRoomList(rooms);
        }
      });

    return () => {
      isRendered = false;
    };
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <FlatList
        style={{marginBottom: 15}}
        data={roomList}
        renderItem={({item}) => roomListRender(item)}
      />
      <RoomModal
        visible={roomModalVisible}
        onClose={handleRoomModalToggle}
        onSend={handleSendRoomName}
      />
      <ProfileModal
        visible={profileModalVisible}
        onClose={handleProfileModalToggle}
      />
      <FirstTimeModal
        visible={firstTimeModalVisible}
        onClose={handleFirstTimeModalToggle}
        onSend={handleSendUserName}
      />
    </SafeAreaView>
  );
};

export default Rooms;
