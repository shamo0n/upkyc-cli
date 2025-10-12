// import React, { useEffect, useState } from "react";
// import "./CustomAlert.css"; // For styling the modal

// const CustomAlert = ({ type = "success", description, onClose, duration = 3000 }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false); // Hide the alert
//       if (onClose) onClose(); // Optional callback to handle additional logic on close
//     }, duration);

//     return () => clearTimeout(timer); // Cleanup the timer on unmount
//   }, [duration, onClose]);

//   if (!isVisible) return null; // Don't render if the alert is not visible

//   const isSuccess = type === "success";

//   return (
//     <div
//       className={`custom-alert ${
//         isSuccess ? "success-alert" : "error-alert"
//       }`}
//     >
//       <div className="icon">
//         {isSuccess ? (
//           <span>✔️</span> // Replace with an actual success icon if needed
//         ) : (
//           <span>❌</span> // Replace with an actual error icon if needed
//         )}
//       </div>
//       <div className="content">
//         <h3 className="title">{isSuccess ? "Success" : "Error"}</h3>
//         <p className="description">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default CustomAlert;
