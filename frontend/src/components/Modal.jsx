import ReactDOM from "react-dom";
import "../styles/contact.css";
const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal-msg-container">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("message-modal") // Ensure this element exists in your HTML
  );
};

export default Modal;