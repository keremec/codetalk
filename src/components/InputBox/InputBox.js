import React from 'react';
import {TextInput, View} from 'react-native';

import Styles from './InputBox.style';
import ColorCode from '../../utils/ColorCode';

const Input = ({
  onChange,
  placeholder,
  isSecure,
  value,
  theme = 'primary',
  keyboardType = 'default',
}) => {
  return (
    <View style={Styles[theme].container}>
      <TextInput
        value={value}
        style={Styles[theme].input}
        placeholder={placeholder}
        onChangeText={onChange}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={ColorCode('grey2')}
        keyboardType={keyboardType}
        keyboardAppearance={'dark'}
      />
    </View>
  );
};

export default Input;
