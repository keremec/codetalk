import {StyleSheet} from 'react-native';
import ColorCode from '../../utils/ColorCode';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorCode('grey0'),
    justifyContent: 'flex-end',
  },
  textContainer: {
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: '#fff',
    borderRadius: 7,
  },
  text: {
    color: '#fff',
  },
});
