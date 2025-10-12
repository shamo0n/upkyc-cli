// // ProfileHeader.js
// import React from 'react';

// const ProfileHeader = ({ customerProfile }) => {
//   const getProfileStatus = (statusId) => {
//     const statusMap = {
//       '4': { status: 'Active', color: '#4CAF50' },
//       '5': { status: 'Active', color: '#4CAF50' },
//       default: { status: 'Inactive', color: '#F44336' },
//     };

//     return statusMap[statusId] || statusMap.default;
//   };

//   const profileStatus = getProfileStatus(customerProfile.StatusID);

//   return (
//     <div>
//       <p style={{ color: '#fff' }}>
//         Profile Status:{' '}
//         <span style={{ color: profileStatus.color, fontWeight: 'bold' }}>
//           {profileStatus.status}
//         </span>
//       </p>
//       <p style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
//         Welcome{' '}
//       </p>
//       <p style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
//         {[
//           customerProfile.FirstName,
//           customerProfile.MiddleName,
//           customerProfile.LastName,
//         ]
//           .filter(Boolean)
//           .join(' ')}
//       </p>
//       <p
//         style={{
//           color: '#fff',
//           fontSize: '12px',
//           fontWeight: '500',
//         }}
//       >
//         {parseInt(customerProfile.StatusID) < 4
//           ? 'Validate your profile to get full features of our app'
//           : 'Your profile is validated and ready to use all features'}
//       </p>
//     </div>
//   );
// };

// export default ProfileHeader;