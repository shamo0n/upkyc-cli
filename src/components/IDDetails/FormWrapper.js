// import React, { useState } from 'react';
// import IDTypeComponent from './IDTypeComponent';
// import IDDetailsComponent from './IDDetailsComponent';
// import DocumentUploadComponent from './DocumentUploadComponent';

// const FormWrapper = () => {
//   const [step, setStep] = useState(1);  // Initial step set to 1
//   const [formData, setFormData] = useState({
//     idType: null,
//     idImages: {},
//     document: null,
//   });

//   const handleIdTypeSelect = (type) => {
//     setFormData({ ...formData, idType: type });
//     setStep(2); // Proceed to step 2 for ID details
//   };

//   const handleImageUpload = (type, image) => {
//     setFormData({
//       ...formData,
//       idImages: { ...formData.idImages, [type]: image },
//     });
//   };

//   const handleDocumentUpload = (document) => {
//     setFormData({ ...formData, document });
//     setStep(4); // Proceed to the next step after document upload
//     // console.log(formData);  // You can remove this when you move to actual submission logic
//   };

//   const handleNextStep = () => {
//     setStep(prevStep => prevStep + 1);  // Increment step to move to the next
//   };

//   return (
//     <div className="form-container">
//       {step === 1 && (
//         <div className="step-container">
//           <IDTypeComponent onSelect={handleIdTypeSelect} />
//           <button onClick={handleNextStep}>Next</button> {/* Button to proceed */}
//         </div>
//       )}

//       {step === 2 && (
//         <div className="step-container">
//           <IDDetailsComponent onUpload={handleImageUpload} />
//           <button onClick={handleNextStep}>Next</button> {/* Button to proceed */}
//         </div>
//       )}

//       {step === 3 && (
//         <div className="step-container">
//           <DocumentUploadComponent onSubmit={handleDocumentUpload} />
//           <button onClick={handleNextStep}>Next</button> {/* Button to proceed */}
//         </div>
//       )}

//       {step === 4 && (
//         <div className="step-container">
//           <h3>Form Submitted</h3>
//           <pre>{JSON.stringify(formData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormWrapper;
