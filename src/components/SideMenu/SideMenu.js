// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./SideMenu.css";
// import toast from "react-hot-toast";
// import { Image } from "react-native";

// const SideMenu = ({
//   onClose,
//   className = "",
//   customerProfile,
//   onProfileClick,
//   onOnboardingClick,
//   onKycClick,
//   onCamloClick,
//   onSupportClick,
//   onLogoutClick,
// }) => {
//   return (
//     <div className={`side-menu ${className}`}>
//       <div className="side-menu-header">
//         {/* <button
//           className="hamburger-toggle open"
//           onClick={onClose}
//           aria-label="Close Menu"
//         >
//           <span className="bar top"></span>
//           <span className="bar middle"></span>
//           <span className="bar bottom"></span>
//         </button> */}

//         <div className="profile-image-container">
//           <Image
//             className="profile-image"
//             src={`data:image/*;base64,${customerProfile.SELFIE_FILEPATH}`}
//             alt="Profile"
//           />
//         </div>
//       </div>

//       <ul className="menu-list">
//         <li>
//           <button
//             className="menu-button"
//             onClick={() => {
//               onProfileClick();
//               onClose();
//             }}
//           >
//             Profile
//           </button>
//         </li>
//         <li>
//           <button
//             className="menu-button"
//             onClick={() => {
//               onOnboardingClick();
//               onClose();
//             }}
//           >
//             Onboarding
//           </button>
//         </li>
//         <li>
//           <button
//             className="menu-button"
//             onClick={() => {
//               onKycClick();
//               onClose();
//             }}
//           >
//             KYC
//           </button>
//         </li>
//         <li>
//           <button
//             className="menu-button"
//             onClick={() => {
//               onSupportClick();
//               onClose();
//             }}
//           >
//             Support
//           </button>
//         </li>
//         <li>
//           <button
//             className="menu-button"
//             onClick={() => {
//               onLogoutClick();
//               onClose();
//             }}
//           >
//             Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default SideMenu;
