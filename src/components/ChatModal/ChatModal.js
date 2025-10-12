// import React, { useState, useEffect, useRef, useContext } from "react";
// import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
// import axios from "axios";
// import "./ChatModal.css";
// import {
//   GetTicketHistoryAPI,
//   SaveTicketMessageAPI,
// } from "../../stores/apicalls";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../Contexts/AuthContext";
// import LoadingSpinner from "../LoadingSpinner";
// import { Image } from "react-native";

// const ChatModal = ({ isOpen, onClose, Ticket_No, Ticket_ID }) => {
//   const { authUser, saveUserSession } = useContext(AuthContext); // Use Context

//   const [messages, setMessages] = useState([]); // Store chat messages
//   const [inputMessage, setInputMessage] = useState(""); // User input message
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState(null); // Store the selected image
//   const fileInputRef = useRef(null); // Ref for file input

//   useEffect(() => {
//     if (isOpen) {
//       fetchChatHistory(); // Load messages when modal opens
//     }
//   }, [isOpen]);

//   // Fetch messages from API
//   const fetchChatHistory = () => {
//     setLoading(true); // Show the loading spinner
//     setErrorMessage(""); // Clear previous errors

//     const body = {
//       Ticket_No: Ticket_No,
//     };

//     // Call the API to fetch chat history
//     GetTicketHistoryAPI(body, (response) => {
//       setLoading(false);
//       console.log("API Response:", response); // Log the full response

//       // Check for unexpected response format
//       if (
//         !response ||
//         !response.responseBody ||
//         !Array.isArray(response.responseBody.children)
//       ) {
//         const errorMsg =
//           "We couldn't load your data. Please refresh or try again later.";
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//         return;
//       }

//       const children = response.responseBody.children;
//       console.log("Children:", children); // Log the children array

//       // Function to extract values
//       const extractValue = (name) =>
//         children.find((child) => child.name === name)?.value || "";

//       const messageCode = extractValue("MessageCode");
//       const isErrorMessage = extractValue("IsErrorMessage");
//       const message = extractValue("Message");
//       const messageDetails = extractValue("MessageDetails");

//       console.log("MessageCode:", messageCode);
//       console.log("IsErrorMessage:", isErrorMessage);
//       console.log("Message:", message);
//       console.log("MessageDetails:", messageDetails);

//       // Check if API response is successful
//       if (messageCode === "2" && isErrorMessage === "false") {
//         const TicketList = children.find(
//           (child) => child.name === "TicketHistoryList"
//         );

//         console.log("TicketList:", TicketList); // Log TicketList object

//         if (!TicketList || !Array.isArray(TicketList.children)) {
//           const errorMsg = "No chat history found.";
//           setErrorMessage(errorMsg);
//           toast.error(errorMsg);
//           return;
//         }

//         // Extract chat messages
//         const chatMessages = TicketList.children.map((msg) => {
//           const messageData = {};
//           msg.children.forEach((field) => {
//             messageData[field.name] = field.value;
//           });
//           console.log("Message Data:", messageData); // Log each message data
//           return {
//             MessageType: messageData.MessageType,
//             UserLogin: messageData.UserLogin,
//             Response: messageData.Response,
//             Response_date: messageData.Response_date,
//             ImageBase64: messageData.ImageBase64,
//           };
//         });

//         console.log("Chat Messages:", chatMessages); // Log the chat messages before setting them
//         setMessages(chatMessages); // Store in state
//       } else {
//         const errorMsg = `${message} ${messageDetails}`.trim();
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//       }
//     });
//   };

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();

//       // Set up the FileReader to convert the file to Base64
//       reader.onloadend = () => {
//         let base64String = reader.result; // This will be the Base64-encoded string

//         // Remove the "data:image/png;base64," part from the Base64 string
//         base64String = base64String.replace(
//           /^data:image\/(png|jpeg|jpg);base64,/,
//           ""
//         );

//         setImage(base64String); // Set the cleaned Base64 string as the image
//       };

//       // Read the file as a Data URL (Base64)
//       reader.readAsDataURL(file);
//     }
//   };

//   // Send message function
//   const saveTicketMessage = () => {
//     setLoading(true); // Show the loading spinner
//     setErrorMessage(""); // Clear previous errors

//     const body = {
//       CUSTID_GID: authUser.CUSTID_GID,
//       CUSTID_DIGITAL_GID: authUser.CUSTID_DIGITAL_GID,
//       CustomerEmail: authUser.Email,
//       CustomerName: authUser.CustName,
//       BranchId: authUser.nCCID,
//       Ticket_ID: Ticket_ID,
//       Ticket_Display_id: Ticket_No,
//       Details: inputMessage,
//       string: image || "",
//     };

//     // Call the API to save the ticket message
//     SaveTicketMessageAPI(body, (response) => {
//       setLoading(false);
//       console.log("API Response:", response); // Log the full response

//       // Extract values from responseBody.children
//       const responseChildren = response.responseBody.children;

//       // Convert array into an object for easier access
//       const responseData = Object.fromEntries(
//         responseChildren.map((child) => [child.name, child.value])
//       );

//       const messageCode = responseData.MessageCode;
//       const message = responseData.Message;
//       const messageDetails = responseData.MessageDetails;

//       console.log("MessageCode:", messageCode);
//       console.log("Message:", message);
//       console.log("MessageDetails:", messageDetails);

//       // Check if the message was saved successfully
//       if (messageCode === "2") {
//         toast.success("Message saved successfully!");
//         // Clear input fields and selected image
//         setInputMessage("");
//         setImage(null);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = ""; // Reset file input field
//         }
//         // Optionally, fetch the updated chat history
//         fetchChatHistory();
//       } else {
//         const errorMsg = `${message} ${messageDetails}`.trim();
//         setErrorMessage(errorMsg);
//         toast.error(errorMsg);
//       }
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="chat-modal-overlay">
//       {loading && <LoadingSpinner />}

//       <div className="chat-modal">
//         {/* Header */}
//         <div className="chat-header">
//           <h2>Chat</h2>
//           <button onClick={onClose} className="chat-close-button">
//             ✖
//           </button>
//         </div>

//         {/* Chat Messages */}
//         <div className="chat-body">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 msg.MessageType === "1" ? "user-message" : "bot-message"
//               }`}
//             >
//               {/* Show bot image if UserLogin is "bot", otherwise show the username */}

//               <>
//                 {/* {msg.MessageType === "2" ? (
//                   <Image
//                     src={require("../../assets/images/SVG/boticon.svg")}
//                     alt="Bot"
//                     className="chat-avatar"
//                   />
//                 ) : (
//                   <span className="user-name">{msg.UserLogin}</span>
//                 )} */}

//                 {/* Message content and image */}
//                 {/* <div style={{display: 'flex', flexDirection: 'row'}}> */}
//                 {msg.MessageType === "2" && (
//                   <Image
//                     src={require("../../assets/images/SVG/boticon.svg")}
//                     alt="Bot"
//                     className="chat-avatar"
//                   />
//                 )}
//                 <div className="message-content">
//                   {msg.Response}
//                   {msg.ImageBase64 ? (
//                     <Image
//                       src={`data:image/png;base64,${msg.ImageBase64}`}
//                       alt="attachment"
//                       className="message-image"
//                       onError={(e) => {
//                         e.target.style.display = "none";
//                       }} // Hide if image is broken
//                     />
//                   ) : null}
//                 </div>

//                 {/* </div> */}
//               </>
//               <p style={{ fontSize: "xx-small" }}>{msg.Response_date}</p>
//             </div>
//           ))}
//         </div>

//         {/* Input Field */}
//         <div className="chat-footer">
//           <input
//             type="text"
//             placeholder="Type a message"
//             className="chat-input"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//           />
//           {/* Attach Button */}
//           <button
//             className="attach-button"
//             onClick={() => fileInputRef.current.click()}
//           >
//             <FaPaperclip className="attach-icon" />
//           </button>
//           {/* Hidden File Input */}
//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             className="image-upload"
//             onChange={handleImageChange}
//             style={{ display: "none" }}
//           />
//           {/* Send Button */}
//           <button className="send-button" onClick={saveTicketMessage}>
//             <FaPaperPlane />
//           </button>
//         </div>

//         {/* Error Message */}
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//       </div>
//     </div>
//   );
// };

// export default ChatModal;
