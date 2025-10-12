// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// interface AuthProps {
//   onLogout: () => void;
// }

// const LogoutButton: React.FC<AuthProps> = ({ onLogout }) => {
//   const [isLoggingOut, setIsLoggingOut] = useState(false); // State to track the logout process
//   const navigate = useNavigate();

//   const handleLogoutClick = () => {
//     // Display a toast asking for confirmation
//     const confirmationToast = toast.loading('Are you sure you want to log out?', {
//       icon: '⚡',
//       duration: 0, // Keep the toast visible until action is taken
//       style: {
//         background: '#333',
//         color: '#fff',
//       },
//     });

//     // Show additional options to confirm or cancel logout
//     setTimeout(() => {
//       toast.remove(confirmationToast); // Remove the confirmation toast after timeout
//       const actionToast = toast.custom((t) => (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: '#333', color: 'white' }}>
//           <span>Are you sure you want to log out?</span>
//           <div style={{ marginLeft: '10px' }}>
//             <button onClick={() => handleConfirmLogout(t)} style={{ marginRight: '5px' }}>Yes</button>
//             <button onClick={() => handleCancelLogout(t)}>No</button>
//           </div>
//         </div>
//       ));
//     }, 1000);
//   };

//   const handleConfirmLogout = (t: any) => {
//     toast.dismiss(t.id); // Dismiss the custom toast

//     // Display success toast and handle logout logic
//     toast.success("Logging out...");
//     onLogout(); // Perform logout logic (clear session, etc.)

//     // Redirect to the login page
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500); // After success toast disappears, navigate to login
//   };

//   const handleCancelLogout = (t: any) => {
//     toast.dismiss(t.id); // Dismiss the custom toast
//     toast.success("Logout canceled!");
//   };

//   return (
//     <div>
//       <button onClick={handleLogoutClick}>Log Out</button>
//     </div>
//   );
// };

// export default LogoutButton;
