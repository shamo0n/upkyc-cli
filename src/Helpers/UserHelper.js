export const colors = {
  MAIN_COLOR: '#93262d',
  ///'#2395f3', //'#273A9B',
  WHITE: 'white',
  TEXT_FIELD_COLOR: '#fff',
  BLACK: 'black',
  PLACE_HOLDER_TEXT: '#2d2e83',
  BorderColor: '#2d2e83',
  BtnCancelColor: '#ca2629',
  btnCameraColor: '#2395f3',
  imgplacecolor: '#dde9ed',
};

export const images = {
  backgroundImageLogin: require('../Assets/images/BG-3.png'),
  backgroundImageSignup: require('../Assets/images/BG-3.png'),
  logo_cc: require('../Assets/images/logo1.png'),
  logo_rx: require('../Assets/images/logo1.png'),
};

export const URL = {
  // API: 'http://192.168.0.67/LiveExMobileApp_WSDL.asmx',
  //API: 'https://amman.circuitcomputer.com/DigiTest/LiveExMobileApp_WSDL.ASMX',
  //API: 'http://192.119.10.162/RemitexAPI/LiveExMobileApp_WSDL.asmx?WSDL',
  // API: 'https://www.saadapp.com/api/LiveExMobileApp_WSDL.asmx',
  // API: 'http://192.168.0.84/RemitEx_Canada_Api/LiveExMobileApp_WSDL.asmx',
  /////REMITEX CANADA LIVE
  // API: 'https://amman.circuitcomputer.com/RemitexAPI/LiveExMobileApp_WSDL.asmx?WSDL',
  /////REMITEX CANADA Local
  API: 'http://192.168.0.84/CC_Money_API/ApiFunctions.asmx',

  //API: 'http://192.119.10.162/RemitexAPI_Test/LiveExMobileApp_WSDL.asmx?WSDL',
};
export const termsAndCondition =
  'https://amman.circuitcomputer.com/RemitexAPI/TermsnCondition.aspx';

export const privacyPolicy =
  'https://amman.circuitcomputer.com/RemitexAPI/PrivacyPolicy.aspx';

export function convertXMLToJson(data) {
  var parseString = require('react-native-xml2js').parseString;
  var xml = data;
  var returnData;
  parseString(xml, function (err, result) {
    returnData = result;
  });
  return returnData;
}
