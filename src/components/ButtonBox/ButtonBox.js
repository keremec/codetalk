import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import Styles from './ButtonBox.style';

const Button = ({isLoading, onPress, text, theme = 'primary'}) => {
  return (
    <TouchableOpacity
      style={Styles[theme].container}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color={'white'} />
      ) : (
        <Text style={Styles[theme].text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
