import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './TextBar.style';
import ColorCode from '../../utils/ColorCode';

const TextBar = props => {
  const [isEmpty, setIsEmpty] = useState(true);

  const [inputValue, setInputValue] = useState('');

  const inputValueChange = text => {
    text === '' ? setIsEmpty(true) : setIsEmpty(false);
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="/>type something"
        placeholderTextColor={ColorCode('dark3')}
        onChangeText={inputValueChange}
        keyboardAppearance={'dark'}
        value={inputValue}
        multiline={true}
      />
      {isEmpty ? (
        <TouchableOpacity style={styles.button_null} disabled={true}>
          <Icon
            name="arrow-right"
            color={ColorCode('grey5')}
            size={25}
            allowFontScaling={true}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.onSave(inputValue);
            inputValueChange('');
          }}>
          <Icon
            name="arrow-right"
            color={ColorCode('white')}
            size={25}
            allowFontScaling={true}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextBar;
