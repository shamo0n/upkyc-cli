// import React, { useState } from "react";
// import {
//   Autocomplete,
//   TextField,
//   Typography,
//   Button,
//   FormControl,
// } from "@mui/material";
// import toast from "react-hot-toast";

// const documentOptions = [
//   { label: "Citizenship Card", value: "citizenshipcard" },
//   { label: "Passport", value: "passport" },
//   { label: "Birth Certificate", value: "birthcertificate" },
// ];
// const inputStyles = {
//   input: { color: "white", backgroundColor: "transparent" },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": { borderColor: "#FEFEFE45" },
//     "&:hover fieldset": { borderColor: "#FEFEFE45" },
//     "&.Mui-focused fieldset": { borderColor: "#FEFEFE45" },
//     "& .MuiOutlinedInput-input": { backgroundColor: "transparent" },
//   },
//   "& .MuiInputLabel-root": { color: "white" },
//   "& .MuiSelect-select": { backgroundColor: "transparent", color: "white" },
//   "& .MuiSelect-icon": { color: "white" },
// };
// const DocumentUploadComponent = ({ onUpload }) => {
//   const [document, setDocument] = useState(null);
//   const [documentType, setDocumentType] = useState(null);
//   const [documentName, setDocumentName] = useState("");
//   const [fileExtension, setFileExtension] = useState("");

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const ext = file.name.split(".").pop().toLowerCase();
//     const docname = file.name;

//     setFileExtension(ext);
//     setDocumentName(docname);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64File = reader.result;
//       setDocument(base64File);

//       if (onUpload) {
//         onUpload({
//           documentType: documentType?.value || "",
//           documentName: docname,
//           document: base64File,
//           fileExtension: ext,
//         });
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//       {/* Document Type */}
//       <FormControl fullWidth variant="outlined" sx={inputStyles}>
//         <Autocomplete
//           options={documentOptions}
//           sx={{
//             "& .MuiSvgIcon-root": {
//               color: "#fff", // your custom icon color
//             },
//           }}
//           value={documentType}
//           onChange={(e, newValue) => setDocumentType(newValue)}
//           getOptionLabel={(option) => option.label || ""}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label="Document Type"
//               variant="outlined"
//               InputLabelProps={{
//                 style: { color: "#355042" },
//               }}
//               InputProps={{
//                 ...params.InputProps,
//                 id: "combo_doc_type",
//                 style: { borderColor: "#355042", color: "#355042" },
//               }}
//             />
//           )}
//         />
//       </FormControl>

//       {/* File Upload */}
//       <div>
//         <Button
//           component="label"
//           variant="outlined"
//           onClick={(e) => {
//             if (!documentType) {
//               e.preventDefault(); // stop the file dialog
//               toast.error("Please select a document type before uploading.");
//               return;
//             }
//           }}
//           style={{
//             color: "#FFFFFF",
//             borderColor: "#355042",
//             textTransform: "none",
//           }}
//         >
//           Upload Document
//           <input
//             type="file"
//             id="proof_doc"
//             hidden
//             // accept=".pdf,.jpg,.png"
//             accept="application/pdf"
//             onChange={handleFileUpload}
//           />
//         </Button>
//         <Typography variant="body2" style={{ marginTop: 8, color: "#FFFFFF" }}>
//           {documentName
//             ? `File: ${documentName} (${fileExtension})`
//             : "No file chosen"}
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default DocumentUploadComponent;
