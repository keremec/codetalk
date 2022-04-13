import {StyleSheet} from 'react-native';
import ColorCode from '../../utils/ColorCode';

export default StyleSheet.create({
  containerTop: {
    flex: 0,
    backgroundColor: ColorCode('dark2'),
  },
  container: {
    flex: 1,
    backgroundColor: ColorCode('dark2'),
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorCode('dark2'),
  },
  containerForm: {
    flex: 1,
    marginHorizontal: 10,
  },
  containerButton: {
    flex: 1,
    marginTop: 20,
  },
  loadButton: {
    color: ColorCode('white'),
  },
});
