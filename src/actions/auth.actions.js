import { Login_API, Get_User_Details } from '../Utils/API';
import { convertXMLToJson } from '../Helpers/UserHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Action to login the user
export const loginUser = (payload: {
  login_name: string;
  password: string;
  reg_phone: string;
}) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: 'LOGIN_USER_LOADING' });

      let tokenInfo = await AsyncStorage.getItem('@tokenInfo');
      tokenInfo = tokenInfo ? JSON.parse(tokenInfo) : null;
      console.log('Token info from AsyncStorage:', tokenInfo);

      // Call login API
      const loginResponse: any = await Login_API(
        payload.login_name,
        payload.password,
        payload.reg_phone,
        tokenInfo,
      );

      console.log('Login API response:', loginResponse);

      if (!loginResponse.success) {
        throw loginResponse;
      }

      // Call Get_User_Details API
      let userDetails: any = await Get_User_Details(payload.login_name);
      console.log('Get_User_Details API response:', userDetails);

      userDetails.responseBody = convertXMLToJson(userDetails.responseBody);
      const customerData =
        userDetails.responseBody['soap:Envelope']['soap:Body'][0]
          .getCustomerResponse[0].getCustomerResult[0];

      console.log('Parsed customer data:', customerData);

      // Save session in AsyncStorage
      await AsyncStorage.setItem('@userSession', JSON.stringify(customerData));
      console.log('User session saved in AsyncStorage');

      // Dispatch success actions
      dispatch({ type: 'LOGIN_USER_SUCCESS' });
      dispatch({ type: 'AUTH_USER_SUCCESS' });
      dispatch({ type: 'GET_USER_SUCCESS', payload: customerData });

      return loginResponse;
    } catch (e: any) {
      console.log('Login failed:', e);
      dispatch({ type: 'LOGIN_USER_FAIL', payload: e.responseBody });
      return e;
    }
  };
};

// Action to logout the user
export const logoutUser = () => {
  return async (dispatch: any) => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem('@userSession');
      console.log('User session removed from AsyncStorage');

      dispatch({ type: 'AUTH_USER_FAIL' });
      dispatch({ type: 'GET_USER_FAIL' });
    } catch (e) {
      console.log('Logout error:', e);
    }
  };
};
