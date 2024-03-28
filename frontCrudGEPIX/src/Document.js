import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

function App() {
  const [document, setDocument] = useState([]);
  const [newDocument, setNewDocument] = useState({
    type: "",
  });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [toView, setToView] = useState({
    type: "",
  });

  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => { 
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/document");
      setDocument(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputchange = (e) => {
    setNewDocument({ ...newDocument, [e.target.name]: e.target.value });
  };

  const handleAddDocument = () => {
    axios
      .post("http://127.0.0.1:8000/api/document/", newDocument)
      .then((response) => {
        setDocument([...document, response.data]);
        setNewDocument({
          type: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleViewClick = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/document/${id}/`
    );
    setToView(response.data);
    setOpenView(true); 
  };
  const handleEditclick = (document) => {
    setSelectedDocument(document);
    setNewDocument(document);
  };

  const handleUpdateDocument = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/document/${selectedDocument.id}/`, newDocument)
      .then((response) => {
        fetchDocument();
        setNewDocument({
            type: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleCanelUpdateDocument = () => {
    setSelectedDocument(null);
    setNewDocument({
      type: "",
    });
  };

  const handleDeleteDocument = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/document/${id}/`)
      .then((response) => {
        fetchDocument();
        setNewDocument({
           type: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app-container">
      <h1>Système de gestion de Document pour le Lot</h1>
      <div className="form-container">
        <div className="form-inputs">
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={newDocument.type}
            onChange={handleInputchange}
          />
          <div className="form-buttons">
            {selectedDocument ? (
              <>
                <button onClick={handleUpdateDocument}>Update</button>
                <button onClick={handleCanelUpdateDocument}>Canel</button>
              </>
            ) : (
              <button onClick={handleAddDocument}>Add New Document</button>
            )}
          </div>
        </div>
      </div>
{/* Liste */}
      <ul className="student-list">
        {document.map((document) => (
          <li key={document.id}>
            <div>
              <strong>
                {document.type}
              </strong>
            </div>
            <div className="actions">
              <button
                className="view"
                onClick={() => handleViewClick(document.id)}
              >
                View
              </button>
              <button className="edit" onClick={() => handleEditclick(document)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteDocument(document.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* pOUR voir le detail */}
      {openView && (
        <>
          <div className="outer-box">
            <strong>
              {toView.type}
            </strong>{" "}
          </div>
          <button onClick={() => setOpenView(false)}>close</button>
        </>
      )}
    </div>
  );
}

export default App;

