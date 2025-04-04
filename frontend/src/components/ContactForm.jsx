import React, { useState } from "react";
import "../styles/contact.css";
import Modal from "./Modal";
import axios from "axios";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.message) formErrors.message = "Message is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form data:", formData);
      try {
        const res = await axios.post(
          "http://localhost:8080/api/message",
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(res);
        if (res.status === 200) {
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
          setModalVisible(true);
          console.log(res.data);
        } else {
          console.error("Failed to send message");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="box-form">
      <div className="containerForm">
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group half-width">
            <label htmlFor="name">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="email">Your Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group full-width">
            <label htmlFor="message">Your Message*</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>

      {modalVisible && (
        <Modal onClose={closeModal}>
          <h2>Message Sent Successfully!</h2>
          <p>Your message has been sent. Thank you!</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default ContactForm;
