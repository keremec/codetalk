import {StyleSheet} from 'react-native';
import ColorCode from '../../utils/ColorCode';

export default StyleSheet.create({
  container: {
    margin: 7,
    backgroundColor: ColorCode('grey3'),
    padding: 7,
    borderRadius: 7,
    minHeight: 60,
  },
  inContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderColor: ColorCode('dark0'),
  },
  metadata: {fontStyle: 'italic', fontWeight: '200'},
  contentContainer: {
    flex: 1,
    marginTop: 5,
  },
  content: {
    fontWeight: '400',
  },
});
