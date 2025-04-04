import ReactDOM from "react-dom";
import "../styles/contact.css";
const ModalMessage = ({ message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-msg-container">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Notification</h2>
          <p>{message}</p>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("message-modal")
  );
};
export default ModalMessage;
