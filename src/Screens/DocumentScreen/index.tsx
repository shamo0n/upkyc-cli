// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import toast, { Toaster } from "react-hot-toast";
// import { AuthContext } from "../../Contexts/AuthContext";
// import {
//   GetDocumentByFilePathAPI,
//   GetDocumentListingAPI,
//   SaveCustomerDocumentAPI,
// } from "../../stores/apicalls";
// import passportImg from "../../assets/images/idfront.jpg";
// import licenseImg from "../../assets/images/idback.jpg";
// import selfieImg from "../../assets/images/idback.jpg";
// import "./DocumentScreen.css";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import { Image } from "react-native";

// const DocumentScreen = () => {
//   const navigate = useNavigate();
//   const { authUser } = useContext(AuthContext);
//   const [documentType, setDocumentType] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectBase64img, setSelectBase64img] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [doctype, setDoctype] = useState("");
//   const [documentListing, setDocumentsListing] = useState([]);
//   const [imageUrl, setImageURL] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     handleGetDocumentListing();
//   }, []);
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       // console.log("Selected File Name:", file.name);
//       // console.log("File Size (bytes):", file.size);
//       // console.log("File Type:", file.type);

//       // Check if file type is allowed
//       const allowedTypes = ["image/jpeg", "image/png"];
//       if (!allowedTypes.includes(file.type)) {
//         alert("Invalid file type. Please upload a JPG or PNG image.");
//         return;
//       }

//       // Read file as Base64
//       const reader = new FileReader();
//       setSelectedFile(file);

//       reader.onloadend = () => {
//         let base64Data = reader.result;

//         if (base64Data) {
//           base64Data = base64Data.replace(/^data:.+;base64,/, "");
//         }

//         // console.log("Clean Base64 Data:", base64Data);
//         setSelectBase64img(base64Data);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveCustomerDocument = () => {
//     // Clear previous error messages
//     setErrorMessage("");
//     if (!documentType) {
//       toast.error("Please select a document type.");
//       setErrorMessage("No document type selected.");
//       return;
//     }
//     // Ensure the file is selected and document type is chosen
//     if (!selectedFile) {
//       toast.error("Please select a document to upload.");
//       setErrorMessage("No document selected.");
//       return;
//     }

//     // Ensure Base64 data is available for the document
//     if (!selectBase64img) {
//       toast.error("Document data is not available.");
//       setErrorMessage("Base64 data is missing.");
//       return;
//     }

//     // Show loading state before making the API call
//     setLoading(true);

//     const body = {
//       CUSTID_DIGITAL_GID: authUser.CUSTID_GID
//         ? authUser.CUSTID_GID
//         : authUser.CUSTID_DIGITAL_GID,
//       Email: authUser.Email,
//       Doccument_type: documentType,
//       Document_NO: "",
//       Document_issue_Date: "",
//       Document_expiry_Date: "",
//       doc_MASTER_DETAILS: "",
//       remarks: "",
//       doc_name: selectedFile.name,
//       doc_Base64: selectBase64img,
//     };

//     SaveCustomerDocumentAPI(body, (response) => {
//       // console.log("API Call Response:", response);

//       // Check if the response contains the expected structure
//       if (response?.responseBody?.children) {
//         // Extract message-related fields from the response
//         const messageCode = response.responseBody.children.find(
//           (item) => item.name === "MessageCode"
//         )?.value;

//         const isErrorMessage =
//           response.responseBody.children.find(
//             (item) => item.name === "IsErrorMessage"
//           )?.value === "true";

//         const message = response.responseBody.children.find(
//           (item) => item.name === "Message"
//         )?.value;

//         // Show the message from the response based on the success or error
//         if (isErrorMessage || messageCode === "1") {
//           toast.error(message || "An error occurred. Please try again.");
//           setErrorMessage(message || "An error occurred.");
//         } else {
//           toast.success(message || "Document uploaded successfully.");
//           setDocumentType("");
//           setSelectBase64img(null);
//           setSelectedFile(null);
//           // Handle further actions like storing the document list if needed
//           handleGetDocumentListing();
//         }
//       } else {
//         toast.error("Unexpected response format.");
//       }

//       // Hide loading state after API call
//       setLoading(false);
//     });
//   };

//   const handleGetDocumentListing = () => {
//     // console.log(authUser);

//     setErrorMessage("");
//     setLoading(true);

//     const body = {
//       CUSTID_DIGITAL_GID: authUser.CUSTID_GID
//         ? authUser.CUSTID_GID
//         : authUser.CUSTID_DIGITAL_GID,
//     };

//     GetDocumentListingAPI(body, (response) => {
//       // console.log("API Call Response:", response);

//       if (response?.responseBody?.children) {
//         // Check for MessageCode, IsErrorMessage, and Message
//         const messageCode = response.responseBody.children.find(
//           (item) => item.name === "MessageCode"
//         )?.value;

//         const isErrorMessage =
//           response.responseBody.children.find(
//             (item) => item.name === "IsErrorMessage"
//           )?.value === "true";

//         const message = response.responseBody.children.find(
//           (item) => item.name === "Message"
//         )?.value;

//         // Check if documents are available
//         const documentList = response.responseBody.children.find(
//           (item) => item.name === "DocumentList"
//         );

//         if (documentList) {
//           // Extract documents from DocumentList
//           const documents = documentList.children.map((document) => {
//             const docDetails = document.children.reduce((acc, child) => {
//               acc[child.name] = child.value;
//               return acc;
//             }, {});

//             return docDetails;
//           });

//           // console.log("@Extracted Documents:", documents);

//           if (isErrorMessage) {
//             toast.error(message || "An error occurred. Please try again.");
//             setErrorMessage(message || "An error occurred.");
//           } else if (documents.length > 0) {
//             // toast.success(message || "Documents retrieved successfully.");
//             // Handle documents (store them in state or further processing)
//             setDocumentsListing(documents);
//           } else {
//             toast.warning("No documents found.");
//           }
//         } else {
//           toast.error("No DocumentList found in the response.");
//         }
//       } else {
//         toast.error("Unexpected response format.");
//       }

//       setLoading(false);
//     });
//   };

//   const handleGetDocumentByFilePath = (filePath) => {
//     // console.log("filePath", filePath);

//     // console.log(authUser);

//     setErrorMessage("");
//     setLoading(true);

//     const body = {
//       docFilePath: filePath,
//     };

//     GetDocumentByFilePathAPI(body, (response) => {
//       // console.log("API Call Response:", response);

//       if (response?.responseBody?.children) {
//         // Extracting necessary fields
//         const messageCode = response.responseBody.children.find(
//           (item) => item.name === "MessageCode"
//         )?.value;

//         const isErrorMessage =
//           response.responseBody.children.find(
//             (item) => item.name === "IsErrorMessage"
//           )?.value === "true";

//         const message = response.responseBody.children.find(
//           (item) => item.name === "Message"
//         )?.value;

//         // Find the doc_Base64 which contains the image data
//         const docBase64Node = response.responseBody.children.find(
//           (item) => item.name === "doc_Base64"
//         );
//         const doc_Type = response.responseBody.children.find(
//           (item) => item.name === "doc_Type"
//         );
//         if (docBase64Node) {
//           const base64Data = docBase64Node.value; // This contains the base64 string

//           // Check if there was an error in the response
//           if (isErrorMessage) {
//             toast.error(message || "An error occurred. Please try again.");
//             setErrorMessage(message || "An error occurred.");
//           } else if (base64Data) {
//             // toast.success(message || "Document retrieved successfully.");
//             // Create the image URL for display
//             // console.log("@doc_Type", doc_Type);
//             // console.log("@doc_Type", doc_Type.value);

//             const imageUrl = base64Data
//               ? `data:image/png;base64,${base64Data}`
//               : null;
//             const pdfurl = base64Data
//               ? `data:application/pdf;base64,${base64Data}`
//               : null;
//             setDoctype(doc_Type.value);
//             // Handle displaying the image (set it to state or directly in the component)
//             setImageURL(doc_Type.value === "PDF" ? pdfurl : imageUrl); // Assuming you have a state to hold the image URL
//           } else {
//             toast.warning("No base64 image data found.");
//           }
//         } else {
//           toast.error("No doc_Base64 found in the response.");
//         }
//       } else {
//         toast.error("Unexpected response format.");
//       }

//       setLoading(false);
//     });
//   };

//   const handleCloseModal = () => {
//     setImageURL(null); // Close the modal by resetting the image URL
//   };
//   const handleBack = () => {
//     navigate(-1);
//   };
//   const handleOpenPdf = () => {
//     const byteCharacters = atob(imageUrl.split(",")[1]);
//     const byteNumbers = new Array(byteCharacters.length)
//       .fill(0)
//       .map((_, i) => byteCharacters.charCodeAt(i));
//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray], { type: "application/pdf" });
//     const blobUrl = URL.createObjectURL(blob);
//     window.open(blobUrl, "_blank");
//   };
//   return (
//     <div className="document-page">
//       {loading && <LoadingSpinner />}
//       {/* Back Button */}
//       <div className="back-button-container">
//         <button id="btn_back" className="back-button" onClick={handleBack}>
//           <div className="back-icon">
//             <Image
//               src={require("../../assets/images/SVG/arrowleftt.svg")}
//             />
//           </div>
//           Back
//         </button>
//         <h1 className="screen-name">Documents</h1>
//       </div>
//       <button className="home-button" onClick={() => navigate("/home")}>
//         <Image
//           src={require("../../assets/images/SVG/homeicon.svg")}
//           alt="home"
//         />
//       </button>
//       <div className="form-wrapper">
//         <h2>Uploaded Documents</h2>
//         <div style={{ marginBottom: "20px" }}>
//           <div className="input-row">
//             <div className="input-group">
//               {/* <label className="form-label">Document Type:</label> */}
//               <select
//                 id="combo_document_type"
//                 className="input-box"
//                 value={documentType}
//                 onChange={(e) => setDocumentType(e.target.value)}
//               >
//                 <option value="" disabled>
//                   Select Document Type
//                 </option>
//                 <option value="Citizenship Card">Citizenship Card</option>
//                 <option value="Passport">Passport</option>
//                 <option value="Birth Certificate">Birth Certificate</option>
//                 {/* Add more options here */}
//               </select>
//             </div>
//             <div className="input-group">
//               <button
//                 className="input-box"
//                 onClick={() => document.getElementById("fileInput").click()}
//                 aria-label="Add document"
//               >
//                 <div
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <span>Upload Document</span>
//                   <Image
//                     src={require("../../assets/images/uploaddoc.png")} // Replace with your local icon path
//                     alt="Upload Icon"
//                     className="upload-icon"
//                   />
//                 </div>
//               </button>
//               <input
//                 type="file"
//                 // accept=".pdf,.jpg,.png"
//                 accept=".jpg,.jpeg,.png"
//                 id="fileInput"
//                 className=""
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//                 aria-label="Upload document file"
//               />
//             </div>
//           </div>
//           <div style={{ textAlign: "end" }}>
//             {selectedFile && selectedFile.name && <p>{selectedFile.name}</p>}
//           </div>

//           <div className="BtnRow">
//             <button
//               className="button GreenBtn"
//               onClick={() => handleSaveCustomerDocument()}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//         <div className="docs-details-box">
//           {documentListing.length > 0 ? (
//             documentListing.map((document, index) => (
//               <div className="details-row" key={index}>
//                 <p>{document.Doccument_type}</p>

//                 <button
//                   onClick={() =>
//                     handleGetDocumentByFilePath(document.docFilePath)
//                   }
//                   className="download-btn"
//                 >
//                   <Image
//                     src={require("../../assets/images/downloaddoc.png")} // Replace with your local icon path
//                     alt="Upload Icon"
//                   />
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No documents available</p>
//           )}
//         </div>
//         {/* Show the image when base64 data is available */}
//         {/* Modal to show image */}
//         {imageUrl && (
//           <div className="doc-modal-overlay">
//             <div className="doc-modal-content">
//               <button className="doc-close-btn" onClick={handleCloseModal}>
//                 X
//               </button>
//               {doctype === "PDF" ? (
//                 // Show PDF using <embed> for better compatibility
//                 <object
//                   data={imageUrl}
//                   type="application/pdf"
//                   width="100%"
//                   height="500px"
//                 >
//                   <p>
//                     Your browser does not support PDFs.
//                     <a
//                       href={imageUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Click here to download the PDF.
//                     </a>
//                   </p>
//                 </object>
//               ) : (
//                 // Show Image
//                 <Image src={imageUrl} alt="Document"/>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <Toaster position="top-center" />
//     </div>
//   );
// };

// export default DocumentScreen;
