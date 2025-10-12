// import React from "react";
// import PropTypes from "prop-types";

// const Step2 = ({
//   formData,
//   errors,
//   handleInputChange,
//   uaeStatesList,
//   trIdentifiertypeINDList,
//   identifierType,
// }) => {
//   // console.log("Form Data:", formData);
//   // console.log("Natural ID Type List:", trIdentifiertypeINDList);

//   return (
//     <div className="step">
//       {/* UAE State Dropdown - Only for legal customer type */}
//       {formData.customerType === "legal" && (
//         <div className="row">
//           <h3>Select UAE State</h3>
//           <label htmlFor="uaeState">Please select the UAE state</label>
//           <select
//             id="combo_uaeState"
//             name="uaeState"
//             value={formData.uaeState}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select UAE State</option>
//             {uaeStatesList.map((state) => (
//               <option key={state.code} value={state.code}>
//                 {state.name}
//               </option>
//             ))}
//           </select>
//           {errors.uaeState && <p style={{ color: "red" }}>{errors.uaeState}</p>}
//         </div>
//       )}

//       {/* ID Type Dropdown */}
//       {/* For legal customers, show the ID Type section only after selecting a UAE state */}
//       {formData.customerType === "legal" && formData.uaeState && (
//         <div className="row">
//           <h3>ID Type ?</h3>
//           <label htmlFor="idType">Please select the ID type you want.</label>
//           <select
//             id="combo_idType"
//             name="idType"
//             value={formData.idType}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select ID Type</option>
//             {identifierType && identifierType.length > 0 ? (
//               identifierType.map((idTypes) => (
//                 <option key={idTypes.ROW_ID._text} value={idTypes.ROW_ID._text}>
//                   {idTypes.IDType._text}
//                 </option>
//               ))
//             ) : (
//               <option value="" disabled>
//                 No ID types available
//               </option>
//             )}
//           </select>
//           {errors.idType && <p style={{ color: "red" }}>{errors.idType}</p>}
//         </div>
//       )}

//       {/* For Natural Customers, Display ID Type Dropdown Immediately */}
//       {formData.customerType === "natural" && (
//         <div className="row">
//           <h3>ID Type ?</h3>
//           <label htmlFor="idType">Please select the ID type you want.</label>
//           <select
//             id="combo_idType"
//             name="idType"
//             value={formData.idType}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select ID Type</option>
//             {trIdentifiertypeINDList && trIdentifiertypeINDList.length > 0 ? (
//               trIdentifiertypeINDList.map((idTypes) => (
//                 <option key={idTypes.ROW_ID._text} value={idTypes.ROW_ID._text}>
//                   {idTypes.IDType._text}
//                 </option>
//               ))
//             ) : (
//               <option value="" disabled>
//                 No ID types available
//               </option>
//             )}
//           </select>
//           {errors.idType && <p style={{ color: "red" }}>{errors.idType}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// Step2.propTypes = {
//   formData: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
//   handleInputChange: PropTypes.func.isRequired,
//   uaeStatesList: PropTypes.array.isRequired,
//   trIdentifiertypeINDList: PropTypes.array.isRequired,
//   identifierType: PropTypes.array.isRequired,
// };

// export default Step2;
