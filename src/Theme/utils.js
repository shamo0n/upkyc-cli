import moment from 'moment';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const emailValidator = email => {
  // const re = /\S+@\S+\.\S+/;
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (!email || email.length <= 0) {
    return 'Email field cannot be empty.';
  }
  if (!re.test(email)) {
    return 'Oops! We need a valid email address.';
  }

  return '';
};

export const TextValidator = (text, filedName) => {
  const rex = /^[a-zA-Z ]+$/;
  if (!text || text.length <= 0) {
    return `${filedName} cannot be empty.`;
  }
  if (text.length < 6) {
    return `${filedName} cannot be less then 6 characters.`;
  }
  if (!rex.test(text)) {
    return `${filedName}  field contains only characters `;
  }
  return '';
};

export const NumberValidator = number => {
  if (!number || number.length <= 0) {
    return ' cannot be empty.';
  }
  if (isNaN(number)) {
    return ' Should be in number format';
  }
  if (number.length < 14) {
    return 'Number cannot be less then 14 character.';
  }
  return '';
};

export const passwordValidator = text => {
  const letters = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!text || text.length <= 0) {
    return 'Password cannot be empty.';
  }
  if (!text || text.length <= 6) {
    return 'Password cannot be less then 6 character.';
  }
  if (!letters.test(text)) {
    return 'Password must contain a special characters and a number ';
  }
  return '';
};

export const convertTime12to24 = time12h => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};

export const getMonthsFirstDate = date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const dateFormat = date => {
  return moment(date).format('DD/MM/YYYY');
};

export const dateTimeFormat = date => {
  return moment(date).format('DD/MM/YYYY hh:mm A');
};

export const formatAmount = value => {
  try {
    if (Platform.OS === 'ios') {
      return Number(value).toLocaleString('en-US', {
        maximumFractionDigits: 2,
      });
    } else {
      return value;
    }
  } catch (error) {
    return '0.00';
  }
};

export const getStorage = async key => {
  return await AsyncStorage.getItem(key);
};

export const setStorage = async (key, value) => {
  AsyncStorage.setItem(key, value);
  return true;
};
