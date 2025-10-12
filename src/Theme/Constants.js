import {Dimensions} from 'react-native';

const domain = 'http://192.168.100.93';
const Constants = {
  ApiPrefix: `${domain}/pawtai-backend-laravel/api`,
  API: 'https://amman.circuitcomputer.com/UG_DEMO_QTECH_API/LiveExMobileApp_WSDL.asmx',
  StoragePawtaiProfile: `${domain}/pawtai-backend-laravel/storage/app/public/pawtaiProfile`,
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
};

export default Constants;
