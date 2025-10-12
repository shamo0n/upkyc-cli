import {StyleSheet} from 'react-native';

import {Colors} from '../../Theme';

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },

  mainContainer: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },

  viewContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },

  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '60%',
  },

  justifyContent: {
    justifyContent: 'center',
  },

  textStyle: {
    color: Colors.MAIN_COLOR,
    alignSelf: 'center',
  },

  headerTextFont: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.MAIN_COLOR,
  },

  imageStyle: {
    resizeMode: 'contain',
  },
});

export default styles;
