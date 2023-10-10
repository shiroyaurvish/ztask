// Modal.js

import React, { useState, useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, selectedData, onSave }) => {
  const [editedData, setEditedData] = useState(
    selectedData || { title: "", body: "" }
  );
  const modalRef = useRef(null);

  useEffect(() => {
    setEditedData(selectedData || { title: "", body: "" });
  }, [selectedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (selectedData) {
      onSave(editedData);
    } else {
      // Implement functionality to add data to the API
      // Replace the following with your actual API endpoint and authentication mechanism
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      })
        .then((response) => response.json())
        .then((newData) => {
          console.log("Added data:", newData);
          onClose(); // Close the modal after adding data
        })
        .catch((error) => {
          console.error("Error adding data:", error);
        });
    }
  };

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Close the modal if clicked outside of it
    }
  };

  return (
    <div
      style={{
        display: isOpen ? "block" : "none",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        overflow: "auto",
        padding: "20px",
      }}
      onClick={handleModalClick}
    >
      <div
        ref={modalRef}
        style={{
          background: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          margin: "5% auto",
          maxWidth: "500px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            border: "none",
            background: "none",
            fontSize: "20px",
          }}
        >
          &times;
        </button>
        <h2>{selectedData ? "Edit Data" : "Add Data"}</h2>
        <input
          type="text"
          name="title"
          value={editedData.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="body"
          value={editedData.body}
          onChange={handleInputChange}
          placeholder="Body"
        />
        <button onClick={handleSave}>{selectedData ? "Save" : "Add"}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
