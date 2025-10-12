import {StyleSheet} from 'react-native';

import {Colors} from '../../Theme';

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    backgroundColor: Colors.white,
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
    marginHorizontal: 10,
    width: 50,
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
    color: Colors.white,
    alignSelf: 'center',
  },

  headerTextFont: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
  },

  imageStyle: {
    resizeMode: 'contain',
  },
});

export default styles;
