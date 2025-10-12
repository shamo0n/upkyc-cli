import moment from "moment";

export const emailValidator = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (!email || email.length <= 0) {
    return "Email field cannot be empty.";
  }
  if (!re.test(email)) {
    return "Oops! We need a valid email address.";
  }
  return "";
};
export const validateName = (name) => {
  if (!name.trim()) {
    return ""; // Hide the validation message when input is empty
  }

  const regex = /^[A-Za-z\s]+$/;
  if (!regex.test(name)) {
    return "Field contains only characters";
  }

  return ""; // No error
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
    return `${filedName} field contains only characters `;
  }
  return "";
};
export const validateNumber = (number) => {
  if (!number.trim()) {
    return ""; // Hide validation message when input is empty
  }

  const regex = /^[0-9]+$/;
  if (!regex.test(number)) {
    return "Field contains only digits.";
  }

  if (number.length < 14) {
    return "Number cannot be less than 14 digits.";
  }

  return ""; // No error
};

export const validateAccountNumber = (accountNo) => {
  if (!accountNo) return ""; // Allow empty values (optional field)

  if (!/^\d+$/.test(accountNo)) {
    return "Account Number must contain only numbers."; // Restrict non-numeric characters
  }

  if (accountNo.length > 14) {
    return "Account Number cannot be more than 14 digits."; // Clear and natural phrasing
  }

  return "";
};

export const NumberValidator = (number) => {
  if (!number || number.length <= 0) {
    return " cannot be empty.";
  }
  if (isNaN(number)) {
    return " feild contains only digits.";
  }
  if (number.length < 14) {
    return "Number cannot be less then 14 Digits.";
  }
  return "";
};

export const passwordValidator = (text) => {
  const letters = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!text || text.length <= 0) {
    return "Password cannot be empty.";
  }
  if (!text || text.length <= 6) {
    return "Password cannot be less then 6 character.";
  }
  if (!letters.test(text)) {
    return "Password must contain a special characters and a number ";
  }
  return "";
};
export const dateformatted = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};
export const simplePasswordValidator = (text) => {
  const containsAmpersandAndAsterisk = /[&*]/;

  if (!text || text.length <= 0) {
    return "Password cannot be empty.";
  }

  if (containsAmpersandAndAsterisk.test(text)) {
    return 'Password cannot contain "&" or "*".';
  }

  return "";
};

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};

export const getMonthsFirstDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const dateFormat = (date) => {
  // Check if the date is valid before attempting to format it
  if (!date || !moment(date).isValid()) {
    return ""; // Return an empty string for invalid or empty dates
  }

  return moment(date).format("DD/MM/YYYY");
};

export const dateFor = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined values

  // Detect and parse YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    // Convert to local time by using moment.js and formatting to DD-MM-YYYY
    return moment(dateString).local().format("DD-MM-YYYY");
  }

  // Detect and parse DD/MM/YYYY format (return as is)
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return dateString; // Already in DD/MM/YYYY
  }

  // Detect and parse DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    return moment(dateString, "DD-MM-YYYY").format("DD-MM-YYYY");
  }

  // Attempt to parse other formats using moment.js
  const parsedDate = moment(dateString);
  if (parsedDate.isValid()) {
    return parsedDate.local().format("DD-MM-YYYY"); // Standardize to DD-MM-YYYY
  }

  console.error("Unrecognized date format:", dateString);
  return ""; // Return empty string for unrecognized formats
};

export const dateTimeFormat = (date) => {
  return moment(date).format("DD/MM/YYYY hh:mm A");
};

export const formatAmount = (value) => {
  try {
    return Number(value).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  } catch (error) {
    return "0.00";
  }
};
