import {StyleSheet} from 'react-native';
import ColorCode from '../../utils/ColorCode';

const baseStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 12,
    borderRadius: 7,
    minHeight: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default {
  primary: StyleSheet.create({
    container: {
      ...baseStyle.container,
      backgroundColor: ColorCode('blue0'),
    },
    text: {
      ...baseStyle.text,
      color: ColorCode('white'),
    },
  }),
  secondary: StyleSheet.create({
    container: {
      ...baseStyle.container,
      backgroundColor: ColorCode('grey0'),
    },
    text: {
      ...baseStyle.text,
      color: ColorCode('blue0'),
    },
  }),
  tertiary: StyleSheet.create({
    container: {
      ...baseStyle.container,
      backgroundColor: ColorCode('red'),
    },
    text: {
      ...baseStyle.text,
      color: ColorCode('white'),
    },
  }),
};
