import {StyleSheet} from 'react-native';
import ColorCode from '../../utils/ColorCode';

export default StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
    color: ColorCode('white'),
  },
});
