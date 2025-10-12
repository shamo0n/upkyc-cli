// // StatusCard.js
// import React from 'react';
// import { Image } from 'react-native';

// const StatusCard = ({
//   id,
//   className,
//   onClick,
//   icon,
//   label,
//   status,
//   progress,
// }) => {
//   return (
//     <button id={id} className={className} onClick={onClick}>
//       <div className="status-icon">
//         <Image src={icon} alt={label} />
//       </div>
//       <div className="status-label">{label}</div>
//       <div className={`status-badge ${status}`}></div>
//       <div className="progress-bar">
//         <div
//           className="progress-fill"
//           style={{
//             width: `${progress}%`,
//             backgroundColor: '#6e817b',
//             height: '100%',
//             transition: 'width 0.3s ease',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: '#fff',
//             fontWeight: 'bold',
//             whiteSpace: 'nowrap',
//             padding: '0 5px',
//           }}
//         >
//           {progress}%
//         </div>
//       </div>
//     </button>
//   );
// };

// export default StatusCard;