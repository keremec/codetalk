import {StyleSheet} from 'react-native';
import ColorCode from '../../utils/ColorCode';

export default StyleSheet.create({
  container: {
    backgroundColor: ColorCode('grey0'),
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 10,
    borderRadius: 7,
    flexDirection: 'row',
  },
  input: {
    flex: 0.9,
    marginBottom: 10,
    height: 38,
    color: ColorCode('white'),
    borderBottomWidth: 1,
    borderBottomColor: '#728791',
    fontSize: 16,
  },

  button_null: {
    flex: 0.1,
    alignItems: 'center',
    alignContent: 'flex-end',
    backgroundColor: ColorCode('dark3'),
    height: 40,
    justifyContent: 'center',
    borderRadius: 7,
    marginLeft: 7,
  },
  button: {
    flex: 0.1,
    alignItems: 'center',
    alignContent: 'flex-end',
    backgroundColor: ColorCode('blue0'),
    height: 40,
    justifyContent: 'center',
    borderRadius: 7,
    marginLeft: 7,
  },
});
