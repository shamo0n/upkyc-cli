import styled from "styled-components";
import { FaIdCard, FaCamera } from "react-icons/fa";
import Select from "react-select";

// Container for the entire verification page
export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  padding: 20px;
`;

// Form container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Label styling
export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  width: auto;
`;

// Input field styling
export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  &:focus {
    border-color: rgb(223, 78, 78);
    outline: none;
    box-shadow: 0 0 0 2px rgba(223, 78, 78, 0.2);
  }
`;

// Button styling
export const Button = styled.button`
  padding: 12px 24px;
  background-color: rgb(223, 78, 78); /* Updated for consistency with the gradient */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(223, 78, 78); /* Darker shade for hover effect */
  }
`;

// Heading styling
export const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
`;

// Card styling for form sections
export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

// Upload container for image uploads
export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Upload label styling
export const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 10px;
  cursor: pointer;
`;

// Styled button for upload functionality
export const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  border: 2px solid rgb(223, 78, 78);
  border-radius: 4px;
  color: rgb(223, 78, 78);
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  transition: 100ms ease-out;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;

  &:hover {
    background-color: rgb(223, 78, 78);
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  }
`;

// Another styled button for the verification process
export const StyledBTN = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #ffffff, #f1f1f1);
  color: #000000;
  border: none;
  border-radius: 10px;
  padding: 15px 25px;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 200px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgb(223, 78, 78);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

// Styled icons for ID card and camera
export const StyledFaIdCard = styled(FaIdCard)`
  font-size: 100px;
  color: #333;
`;

export const StyledFaCamera = styled(FaCamera)`
  font-size: 55px;
  color: #333;
`;

// Styled select component for dropdowns
export const StyledSelect = styled.select`
  width: 100%;
  max-width: 300px;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }

  &:focus {
    border-color: rgb(223, 78, 78);
    outline: none;
    box-shadow: 0 0 0 2px rgba(223, 78, 78, 0.2);
  }
`;

// Countries select component using react-select
export const CountriesSelect = styled(Select)`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  &:focus {
    border-color: rgb(223, 78, 78);
    outline: none;
    box-shadow: 0 0 0 2px rgba(223, 78, 78, 0.2);
  }
`;

// Status label styling
export const StatusLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;

  @media (max-width: 600px) {
    width: 100%;
    font-size: 12px;
  }
`;

// Status container for the status label
export const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

// Validation message styling
export const ValidationMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: ${(props) => (props.valid ? "green" : "red")};
`;
