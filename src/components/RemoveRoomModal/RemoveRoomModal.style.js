import {Dimensions, StyleSheet} from 'react-native';
import ColorCode from '../../utils/ColorCode';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: ColorCode('grey0'),
    height: height / 5,
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 7,
  },
  text: {
    color: ColorCode('white'),
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    fontSize: 20,
    marginTop: 20,
  },
  modal: {
    justifyContent: 'center',
  },
});
