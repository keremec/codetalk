import {StyleSheet} from 'react-native';
import ColorCode from '../../utils/ColorCode';

const baseStyle = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  input: {
    padding: 15,
    fontSize: 15,
  },
});

export default {
  primary: StyleSheet.create({
    container: {
      ...baseStyle.container,
      borderColor: ColorCode('grey3'),
    },
    input: {
      ...baseStyle.input,
      color: ColorCode('white'),
    },
  }),
  secondary: StyleSheet.create({
    container: {
      ...baseStyle.container,
      borderColor: ColorCode('red'),
    },
    input: {
      ...baseStyle.input,
      color: ColorCode('white'),
    },
  }),
};
