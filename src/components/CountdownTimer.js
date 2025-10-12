// import { useEffect, useState, useRef } from "react";

// const CountdownTimer = ({ trTime, trExpirationTime }) => {
//   const [remainingTime, setRemainingTime] = useState(0);
//   const timerRef = useRef(null);

//   // ✅ Parses date in "DD-MM-YYYY HH:mm:ss" or ISO format
//   const parseDate = (dateString) => {
//     if (!dateString) return null;

//     const parts = dateString.split(" ");
//     if (parts.length === 2) {
//       const [datePart, timePart] = parts;
//       const [day, month, year] = datePart.split("-");
//       if (day && month && year) {
//         const formatted = `${year}-${month}-${day}T${timePart}`;
//         const parsed = new Date(formatted);
//         if (!isNaN(parsed.getTime())) return parsed.getTime();
//       }
//     }

//     const fallback = new Date(dateString);
//     return isNaN(fallback.getTime()) ? null : fallback.getTime();
//   };

//   const transactionTime = parseDate(trTime);
//   const expirationTime = parseDate(trExpirationTime);

//   useEffect(() => {
//     if (!expirationTime || !transactionTime) return;

//     const updateTimer = () => {
//       const vancouverTime = new Date().toLocaleString("en-US", {
//         timeZone: "America/Vancouver",
//       });
//       const now = new Date(vancouverTime).getTime();
//       const timeLeft = Math.max(0, expirationTime - now);
//       setRemainingTime(timeLeft);

//       if (timeLeft <= 0 && timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//         console.log("⏳ Timer expired!");
//       }
//     };

//     updateTimer(); // Initial call
//     timerRef.current = setInterval(updateTimer, 1000);

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [expirationTime, transactionTime]);

//   const minutes = Math.floor(remainingTime / 60000);
//   const seconds = Math.floor((remainingTime % 60000) / 1000);

//   return (
//     <div className="track-transaction-row">
//       {remainingTime > 0 ? (
//         <>
//           <div className="track-transaction-label">
//             <p>Expires in:</p>
//           </div>
//           <div className="track-transaction-value">
//             <p>{`${minutes}m ${seconds.toString().padStart(2, "0")}s`}</p>
//           </div>
//         </>
//       ) : (
//         <div className="track-transaction-value">
//           <p style={{ color: "red", fontWeight: "bold" }}>Time expired!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountdownTimer;
