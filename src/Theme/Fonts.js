import { Platform } from 'react-native';

const Fonts = {
  LeagueSpartan: Platform.OS === 'ios' ? 'League Spartan' : 'league-spartan.bold',
  OpenSans: 'Open Sans',
  OpenSansBold: 'OpenSans-Bold',
};

export default Fonts;
