import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children, onClose }) => {
  // Ensure we don't try to render the portal on the server if using SSR
  if (typeof document === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="popup-overlay" onClick={onClose} />
      <div className="popup-iframe">
        <div className="modal-content-area">
            {children}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </>,
    document.body // Append modal directly to the body
  );
};

export default Modal;
