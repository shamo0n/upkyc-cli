import {combineReducers} from 'redux';

const authData = (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return {
        isLoggedIn: true,
      };

    case 'AUTH_USER_FAIL':
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

const loginUser = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case 'LOGIN_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case 'LOGIN_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  loginUser,
  authData,
});
