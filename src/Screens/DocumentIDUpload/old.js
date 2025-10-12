// import React, { useState } from "react";
// import "./PersonalInformation.css";
// import { Image } from "react-native";

// const PersonalInformation = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     gender: "",
//     dob: "",
//     mobile: "",
//     email: "",
//     confirmEmail: "",
//     address: "",
//     city: "",
//     province: "",
//     postalCode: "",
//     country: "",
//   });

//   const stepTitles = ["Personal Information", "Contact Information", "Address Information"];

//   const handleNext = () => {
//     if (currentStep < 3) setCurrentStep(currentStep + 1);
//   };

//   const handleCancel = () => {
//     setCurrentStep(0);
//     setFormData({
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       gender: "",
//       dob: "",
//       mobile: "",
//       email: "",
//       confirmEmail: "",
//       address: "",
//       city: "",
//       province: "",
//       postalCode: "",
//       country: "",
//     });
//   };

//   return (
//     <div className="Signup-page">
//       {/* <div className="Signup-page__header">
//         <h2>Kyc - Verification</h2>
//       </div> */}
//       <div className="Personal-page__content">
//         {currentStep === 0 && (
//           <div className="Personal-page__form-container">
//             <h2 className="Signup-page__form-title">
//               Follow these steps to complete KYC - Verification
//             </h2>
//             <div className="steps-progress">
//               <div className="">
//                 <div className="step-logo-container">
//                   <div className="step-logo">
//                     <Image
//                       src={require("../../assets/images/steps/personalinfo.png")} // Static image for Step 2
//                       alt="Step 2"
//                     />
//                   </div>
//                   <Image
//                     className="arrow"
//                     src={require("../../assets/images/arrow.png")}
//                     alt="Arrow"
//                   />
//                 </div>
//                 <div className="step-wrapper">
//                   <div className="step-number">1</div>{" "}
//                   {/ Rounded step number /}
//                   <div className="step-label">Personal Details</div>
//                 </div>
//               </div>

//               <div className="">
//                 <div className="step-logo-container">
//                   <div className="step-logo">
//                     <Image
//                       className="arrow"
//                       src={require("../../assets/images/steps/contact.png")} // Static image for Step 2
//                       alt="Step 2"
//                     />
//                   </div>
//                   <Image
//                     className="arrow"
//                     src={require("../../assets/images/arrow.png")} 
//                     alt="Arrow"
//                   />{" "}
//                 </div>
//                 <div className="step-wrapper">
//                   <div className="step-number">2</div>{" "}
//                   {/ Rounded step number /}
//                   <div className="step-label">Contact</div>
//                 </div>
//               </div>
//               <div className="">
//                 <div className="step-logo-container">
//                   <div className="step-logo">
//                     <Image
//                       src={require("../../assets/images/steps/address.png")} // Static image for Step 2
//                       alt="Step 3"
//                     />
//                   </div>
//                 </div>
//                 <div className="step-wrapper">
//                   <div className="step-number">3</div>{" "}
//                   {/ Rounded step number /}
//                   <div className="step-label">Address</div>
//                 </div>
//               </div>
//             </div>
//             <button className="Signup-button" onClick={() => setCurrentStep(1)}>
//               <Image
//                 src={require("../../assets/images/buttonarrow.png")} / PNG start image /
//                 alt="Start"
//                 style={{
//                   width: "20px",
//                   height: "20px",
//                   marginRight: "20px",
//                   alignSelf: "center",
//                 }}
//               />
//               Start
//             </button>
//           </div>
//         )}

//         {/ Progress Indicator /}

//         {/ Step 1: Personal Information Form /}
//         {currentStep === 1 && (
//           <div className="Personal-page__form-container">
//             <h2 className="Signup-page__form-title">Personal Information</h2>
//             <form className="Signup-page__form">
//               {currentStep > 0 && (
//                 <div className="progress-indicator">
//                   <div
//                     className={`step-circle ${
//                       currentStep >= 1 ? "active" : ""
//                     }`}
//                   >
//                     1
//                   </div>
//                   <div
//                     className={`step-line ${currentStep >= 2 ? "active" : ""}`}
//                   ></div>

//                   <div
//                     className={`step-circle ${
//                       currentStep >= 2 ? "active" : ""
//                     }`}
//                   >
//                     2
//                   </div>
//                   <div
//                     className={`step-line ${currentStep >= 3 ? "active" : ""}`}
//                   ></div>

//                   <div
//                     className={`step-circle ${
//                       currentStep >= 3 ? "active" : ""
//                     }`}
//                   >
//                     3
//                   </div>
//                 </div>
//               )}
//               <div className="form-group">
//                 <label className="form-label">First Name</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="First Name"
//                   value={formData.firstName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, firstName: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Middle Name</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Middle Name"
//                   value={formData.middleName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, middleName: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Last Name</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Last Name"
//                   value={formData.lastName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, lastName: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Gender</label>
//                 <select
//                   className="form-input"
//                   value={formData.gender}
//                   onChange={(e) =>
//                     setFormData({ ...formData, gender: e.target.value })
//                   }
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Date of Birth</label>
//                 <input
//                   className="form-input"
//                   type="date"
//                   value={formData.dob}
//                   onChange={(e) =>
//                     setFormData({ ...formData, dob: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="buttons">
//                 <button className="Signup-button" onClick={handleCancel}>
//                   Cancel
//                 </button>
//                 <button className="signup-button" onClick={handleNext}>
//                   Next
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/ Step 2: Contact Form /}
//         {currentStep === 2 && (
//           <div className="Personal-page__form-container">
//             <h2 className="Signup-page__form-title">Contact Information</h2>
//             <form className="Signup-page__form">
//               {currentStep > 0 && (
//                 <div className="progress-indicator">
//                   <div
//                     className={`step-circle ${
//                       currentStep >= 1 ? "active" : ""
//                     }`}
//                   >
//                     1
//                   </div>
//                   <div
//                     className={`step-line ${currentStep >= 2 ? "active" : ""}`}
//                   ></div>

//                   <div
//                     className={`step-circle ${
//                       currentStep >= 2 ? "active" : ""
//                     }`}
//                   >
//                     2
//                   </div>
//                   <div
//                     className={`step-line ${currentStep >= 3 ? "active" : ""}`}
//                   ></div>

//                   <div
//                     className={`step-circle ${
//                       currentStep >= 3 ? "active" : ""
//                     }`}
//                   >
//                     3
//                   </div>
//                 </div>
//               )}
//               <div className="form-group">
//                 <label className="form-label">Mobile Number</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Mobile Number"
//                   value={formData.mobile}
//                   onChange={(e) =>
//                     setFormData({ ...formData, mobile: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Email</label>
//                 <input
//                   className="form-input"
//                   type="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Confirm Email</label>
//                 <input
//                   className="form-input"
//                   type="email"
//                   placeholder="Confirm Email"
//                   value={formData.confirmEmail}
//                   onChange={(e) =>
//                     setFormData({ ...formData, confirmEmail: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="buttons">
//                 <button className="Signup-button" onClick={handleCancel}>
//                   Cancel
//                 </button>
//                 <button className="signup-button" onClick={handleNext}>
//                   Next
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/ Step 3: Address Form /}
//         {currentStep === 3 && (
//           <div className="Personal-page__form-container">
//             <h2 className="Signup-page__form-title">Address Information</h2>
//             <form className="Signup-page__form">
//               {currentStep > 0 && (
//                 <div className="progress-indicator">
//                   <div
//                     className={`step-circle ${
//                       currentStep >= 1 ? "active" : ""
//                     }`}
//                   >
//                     1
//                   </div>
//                   <div
//                     className={`step-line ${currentStep >= 2 ? "active" : ""}`}
//                   ></div>

//                   <div
//                     className={`step-circle ${
//                       currentStep >= 2 ? "active" : ""
//                     }`}
//                   >
//                     2
//                   </div>
//                   <div
//                     className={`step-line ${currentStep >= 3 ? "active" : ""}`}
//                   ></div>

//                   <div
//                     className={`step-circle ${
//                       currentStep >= 3 ? "active" : ""
//                     }`}
//                   >
//                     3
//                   </div>
//                 </div>
//               )}
//               <div className="form-group">
//                 <label className="form-label">Address</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Address"
//                   value={formData.address}
//                   onChange={(e) =>
//                     setFormData({ ...formData, address: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">City</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={(e) =>
//                     setFormData({ ...formData, city: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Province</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Province"
//                   value={formData.province}
//                   onChange={(e) =>
//                     setFormData({ ...formData, province: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Postal Code</label>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Postal Code"
//                   value={formData.postalCode}
//                   onChange={(e) =>
//                     setFormData({ ...formData, postalCode: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Country</label>
//                 <select
//                   className="form-input"
//                   value={formData.country}
//                   onChange={(e) =>
//                     setFormData({ ...formData, country: e.target.value })
//                   }
//                 >
//                   <option value="">Select Country</option>
//                   <option value="uae">UAE</option>
//                   <option value="us">US</option>
//                 </select>
//               </div>
//               <div className="buttons">
//                 <button className="Signup-button" onClick={handleCancel}>
//                   Cancel
//                 </button>
//                 <button
//                   className="signup-button"
//                   onClick={() => alert("Form Submitted!")}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalInformation;
