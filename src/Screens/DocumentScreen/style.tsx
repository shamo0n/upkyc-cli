@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

/* Base Styling */
.document-page {
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-image: url('../../assets/images/mobilebg.png');
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.document-page__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 90%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* Back Button */
.back-button-container {
  display: flex;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;
}

.back-button {
  background-color: transparent;
  border: none;
  color: #0F1738;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s ease, color 0.2s ease;
}
.docs-details-box {
  background: #FEFEFE;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;

  overflow-y: auto;
  max-height: 250px;
}
.back-button:hover {
  transform: scale(1.1);
  /* color: #66AE7B; */
}

/* Title */
.screen-name {
  font-weight: 600;
  color: #0F1738;
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}

/* Upload Section */
.upload-section {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: #EBEBEB;
  gap: 10px;
  width: 100%;
  max-width: 698px;
  max-height: 386px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.download-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.download-btn i {
  font-size: 20px; /* Adjust size of the icon */
  color: #007bff; /* Adjust color */
}



/* Modal overlay */
.doc-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal content */
.doc-modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  border-radius: 10px;
  text-align: center;
}

/* Close button */
.doc-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  /* background: #ff5c5c; */
  color: #0F1738;
  border: none;
  font-size: 20px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50%;
}

/* Styling for the document image */
.document-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.upload-icon{
margin-left: 20px;}
/* .input-box:focus, .file-input:focus {
  border-color: #66AE7B;
} */

/* Buttons */
.upload-button {
  background-color: #66AE7B;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  transition: background 0.3s ease;
  box-sizing: border-box;
}
.add-document-button {
  background-color: #D4F0A3; /* Match input box background */
  color: #333;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  width: 100%; /* Match input box width */
  transition: border-color 0.3s ease, background-color 0.3s ease;
  box-sizing: border-box;
}






/* Search Bar */
.search-bar-container {
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.search-bar {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s ease;
  box-sizing: border-box;
}

.search-bar:focus {
  border-color: #66AE7B;
}

/* Document List */
.documents-list {
  width: 100%;
  box-sizing: border-box;
}

.documents-card-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

/* Document Card */
.document-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border-radius: 12px;
  /* background: white; */
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  /* transition: transform 0.3s ease, box-shadow 0.3s ease; */
  width: 100%;
  /* box-sizing: border-box; */
}

.document-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.document-card img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.document-card .doc-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
}

.document-card .doc-info p {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

/* Download Button */
.download-button {
  padding: 10px 20px;
  background-color: #B1E94F;
  color: #0F1738;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-sizing: border-box;
}

.download-button:hover {
  background-color: #D4F0A3;
  transform: scale(1.05);
}

/* RESPONSIVENESS */

@media (max-width: 768px) {
  .document-page__content {
    width: 100%;
    padding: 15px;
  }

  .screen-name {
    font-size: 16px;
  }

  .document-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .document-card img {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .screen-name {
    font-size: 16px;
  }

  .upload-section, .search-bar-container {
    width: 100%;
  }

  .input-box, .file-input, .upload-button, .search-bar {
    font-size: 13px;
    /* padding: 10px; */
  }

  .document-card {
    padding: 10px;
  }

  .document-card img {
    width: 60px;
    height: 60px;
  }
}
