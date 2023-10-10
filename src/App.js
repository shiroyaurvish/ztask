// App.js

import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Create a Modal component

const YourComponent = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch data from API and set it in the state (example using a placeholder API)
    // Replace with your actual API endpoint and authentication mechanism
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const handleOpenModal = (selectedItem) => {
    setModalOpen(true);
    setSelectedData(selectedItem);
  };

  const handleEditSave = (editedData) => {
    // Implement functionality to save edited data
    console.log("Edited data:", editedData);
    setModalOpen(false);
  };

  const handleAddClick = () => {
    setSelectedData(null);
    setModalOpen(true);
  };

  return (
    <div>
      <h1>Data</h1>
      <button onClick={handleAddClick}>Add</button>

      {data.map((item) => (
        <div key={item.id} onClick={() => handleOpenModal(item)}>
          <h3>{item.title}</h3>
          <h4>{item.body}</h4>
        </div>
      ))}

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          selectedData={selectedData}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default YourComponent;
