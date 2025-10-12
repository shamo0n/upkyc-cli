// import React from "react";
// import PropTypes from "prop-types";
// import { Image } from "react-native";

// const Step1 = ({ formData, errors, handleInputChange }) => {
//   return (
//     <div className="step">
//       <h3>Customer Type?</h3>
//       {/* Customer Type Selection */}
//       <label htmlFor="customerType">
//         Please Select the Customer type which you want.
//       </label>
//       <div className="customer-type-toggle">
//         <input
//           type="radio"
//           id="natural"
//           name="customerType"
//           value="natural"
//           checked={formData.customerType === "natural"}
//           onChange={handleInputChange}
//           className="radio-input"
//         />
//         <label htmlFor="natural" className="toggle-option">
//           <Image
//             src={
//               formData.customerType === "natural"
//                 ? require("../../assets/images/selectednatural.png")
//                 : require("../../assets/images/unselectednatural.png")
//             }
//             alt="Natural Person"
//             className="toggle-image"
//           />
//         </label>

//         <input
//           type="radio"
//           id="legal"
//           name="customerType"
//           value="legal"
//           checked={formData.customerType === "legal"}
//           onChange={handleInputChange}
//           className="radio-input"
//         />
//         <label htmlFor="legal" className="toggle-option">
//           <Image
//             src={
//               formData.customerType === "legal"
//                 ? require("../../assets/images/selectedlegal.png")
//                 : require("../../assets/images/unselectedlegal.png")
//             }
//             alt="Legal Entities"
//             className="toggle-image"
//           />
//         </label>
//       </div>

//       {errors.customerType && (
//         <p style={{ color: "red" }}>{errors.customerType}</p>
//       )}
//     </div>
//   );
// };

// Step1.propTypes = {
//   formData: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
//   handleInputChange: PropTypes.func.isRequired,
// };

// export default Step1;
