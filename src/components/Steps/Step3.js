// import React from "react";
// import PropTypes from "prop-types";
// import { Image } from "react-native";

// const Step3 = ({
//   formData,
//   errors,
//   handleUploadFileChange,
//   handleIDBACKuploadFileChange,
//   handleUploadPDFFileChange,
//   handleUploadPDFIMGFileChange,
//   selectedIDFrontCroppedImage,
//   selectedIDBackImage,
//   selectedPDFFile,
// }) => {
//   return (
//     <div className="step">
//       {formData.customerType === "natural" ? (
//         <div className="row justify-content-center">
//           <h3>{formData.idTypeName}</h3>
//           {formData.idTypeName !== "Passport" ? (
//             <>
//               {/* ID Front */}
//               <div className="col-md-4">
//                 <div className="card-body text-center">
//                   <div className="upload-container">
//                     <label htmlFor="idFrontStep3" className="upload-label">
//                       <input
//                         type="file"
//                         id="idFrontStep3"
//                         name="idFrontStep3"
//                         capture="environment"
//                         accept="image/*"
//                         onChange={handleUploadFileChange}
//                         style={{ display: "none" }}
//                         disabled={!!selectedIDFrontCroppedImage}
//                       />
//                       <div className="upload-content">
//                         <Image
//                           src={
//                             selectedIDFrontCroppedImage
//                               ? require("../../assets/images/selectedidfront.png")
//                               : require("../../assets/images/unselectedidfront.png")
//                           }
//                           alt="ID Front Icon"
//                           className="icon-image"
//                         />
//                       </div>
//                     </label>
//                   </div>
//                   {selectedIDFrontCroppedImage && (
//                     <Image
//                       src={selectedIDFrontCroppedImage}
//                       alt="Selected ID Front"
//                       className="id-preview"
//                     />
//                   )}
//                   {!selectedIDFrontCroppedImage && (
//                     <p style={{ color: "red" }}>{errors.idFrontStep3}</p>
//                   )}
//                 </div>
//               </div>

//               {/* ID Back */}
//               <div className="col-md-4">
//                 <div className="card-body text-center">
//                   <div className="upload-container">
//                     <label htmlFor="idBackStep3" className="upload-label">
//                       <input
//                         type="file"
//                         id="idBackStep3"
//                         name="idBackStep3"
//                         capture="environment"
//                         accept="image/*"
//                         onChange={
//                           selectedIDFrontCroppedImage
//                             ? handleIDBACKuploadFileChange
//                             : () => alert("Please upload ID Front first")
//                         }
//                         style={{ display: "none" }}
//                         disabled={!!selectedIDBackImage}
//                       />
//                       <div className="upload-content">
//                         <Image
//                           src={
//                             selectedIDBackImage
//                               ? require("../../assets/images/selectedidback.png")
//                               : require("../../assets/images/unselectedidback.png")
//                           }
//                           alt="ID Back Icon"
//                           className="icon-image"
//                         />
//                       </div>
//                     </label>
//                   </div>
//                   {selectedIDBackImage && (
//                     <Image
//                       src={selectedIDBackImage}
//                       alt="Selected ID Back"
//                       className="id-preview"
//                     />
//                   )}
//                   {!selectedIDBackImage && (
//                     <p style={{ color: "red" }}>{errors.idBackStep3}</p>
//                   )}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="col-md-4">
//               <div className="card-body text-center">
//                 <div className="upload-container">
//                   <label htmlFor="idFrontStep3" className="upload-label">
//                     <input
//                       type="file"
//                       id="idFrontStep3"
//                       name="idFrontStep3"
//                       capture="environment"
//                       accept="image/*"
//                       onChange={handleUploadFileChange}
//                       style={{ display: "none" }}
//                       disabled={!!selectedIDFrontCroppedImage}
//                     />
//                     <div className="upload-content">
//                       <Image
//                         src={
//                           selectedIDFrontCroppedImage
//                             ? require("../../assets/images/selectedfront.png")
//                             : require("../../assets/images/unselectedfront.png")
//                         }
//                         alt="ID Front Icon"
//                         className="icon-image"
//                       />
//                     </div>
//                   </label>
//                 </div>
//                 {selectedIDFrontCroppedImage && (
//                   <Image
//                     src={selectedIDFrontCroppedImage}
//                     alt="Selected ID Front"
//                     className="id-preview"
//                   />
//                 )}
//                 {!selectedIDFrontCroppedImage && (
//                   <p style={{ color: "red" }}>{errors.idFrontStep3}</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="row justify-content-center">
//           <h3>{formData.idTypeName}</h3>
//           <div className="row">
//             {/* Passport PDF */}
//             <div className="col-md-4">
//               <div className="card-body text-center">
//                 <div className="upload-container">
//                   <label htmlFor="passportFrontStep3" className="upload-label">
//                     <input
//                       type="file"
//                       id="passportFrontStep3"
//                       name="passportFrontStep3"
//                       accept=".pdf"
//                       onChange={handleUploadPDFFileChange}
//                       style={{ display: "none" }}
//                       disabled={
//                         !!selectedPDFFile || !!selectedIDFrontCroppedImage
//                       }
//                     />
//                     <div className="upload-content">
//                       <Image
//                         src={
//                           selectedPDFFile
//                             ? require("../../assets/images/selectedpdf.png")
//                             : require("../../assets/images/unselectedpdf.png")
//                         }
//                         alt="Passport PDF Icon"
//                         className="icon-image"
//                       />
//                     </div>
//                   </label>
//                 </div>
//                 {selectedPDFFile && <p>{formData.idTypeName} uploaded.</p>}
//                 {!selectedPDFFile && (
//                   <p style={{ color: "red" }}>{errors.passportFrontStep3}</p>
//                 )}
//               </div>
//             </div>

//             <div className="d-flex align-items-center justify-content-center col-md-4">
//               <span style={{ fontSize: "20px", fontWeight: "bold" }}>OR</span>
//             </div>

//             {/* ID Image */}
//             <div className="col-md-4">
//               <div className="card-body text-center">
//                 <div className="upload-container">
//                   <label htmlFor="idFrontStep3" className="upload-label">
//                     <input
//                       type="file"
//                       id="idFrontStep3"
//                       name="idFrontStep3"
//                       capture="environment"
//                       accept="image/*"
//                       onChange={handleUploadPDFIMGFileChange}
//                       style={{ display: "none" }}
//                       disabled={
//                         !!selectedPDFFile || !!selectedIDFrontCroppedImage
//                       }
//                     />
//                     <div className="upload-content">
//                       <Image
//                         src={
//                           selectedIDFrontCroppedImage
//                             ? require("../../assets/images/selecteduploadimg.png")
//                             : require("../../assets/images/unselecteduploadimg.png")
//                         }
//                         alt="ID Image Icon"
//                         className="icon-image"
//                       />
//                     </div>
//                   </label>
//                 </div>
//                 {selectedIDFrontCroppedImage && (
//                   <p>{formData.idTypeName} uploaded.</p>
//                 )}
//                 {!selectedIDFrontCroppedImage && (
//                   <p style={{ color: "red" }}>{errors.idFrontStep3}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// Step3.propTypes = {
//   formData: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
//   handleUploadFileChange: PropTypes.func.isRequired,
//   handleIDBACKuploadFileChange: PropTypes.func.isRequired,
//   handleUploadPDFFileChange: PropTypes.func.isRequired,
//   handleUploadPDFIMGFileChange: PropTypes.func.isRequired,
//   selectedIDFrontCroppedImage: PropTypes.string,
//   selectedIDBackImage: PropTypes.string,
//   selectedPDFFile: PropTypes.string,
// };

// export default Step3;
