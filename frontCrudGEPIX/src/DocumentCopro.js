import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

function DocumentCopro() {
  const [documentcopro, setDocumentCopro] = useState([]);
  const [newDocumentCopro, setNewDocumentCopro] = useState({
    type: "",
  });
  const [selectedDocumentCopro, setSelectedDocumentCopro] = useState(null);
  const [toView, setToView] = useState({
    type: "",
  });
  // Initialisation corrigée
  const [openView, setOpenView] = useState(false);

  // Exécution de useEffect avec un tableau de dépendances vide pour s'exécuter une seule fois lors du montage du composant
  useEffect(() => {
    fetchDocumentCopro();
  }, []);

  const fetchDocumentCopro = async () => { //await pour une syntaxe plus propre
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/documentcopro");
      setDocumentCopro(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputchange = (e) => {
    setNewDocumentCopro({ ...newDocumentCopro, [e.target.name]: e.target.value });
  };

  const handleAddDocumentCopro = () => {
    axios
      .post("http://127.0.0.1:8000/api/documentcopro/", newDocumentCopro)
      .then((response) => {
        setDocumentCopro([...documentcopro, response.data]);
        setNewDocumentCopro({
          type: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleViewClick = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/documentcopro/${id}/`
    );
    setToView(response.data);
    setOpenView(true); // Use the correct variable 'openView'
  };
  const handleEditclick = (documentcopro) => {
    setSelectedDocumentCopro(documentcopro);
    setNewDocumentCopro(documentcopro);
  };

  const handleUpdateDocumentCopro = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/documentcopro/${selectedDocumentCopro.id}/`, newDocumentCopro)
      .then((response) => {
        fetchDocumentCopro();
        setNewDocumentCopro({
            type: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleCanelUpdateDocumentCopro = () => {
    setSelectedDocumentCopro(null);
    setNewDocumentCopro({
      type: "",
    });
  };

  const handleDeleteDocumentCopro = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/documentcopro/${id}/`)
      .then((response) => {
        fetchDocumentCopro();
        setNewDocumentCopro({
           type: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app-container">
      <h1>Système de gestion de Document Copro</h1>
      <div className="form-container">
        <div className="form-inputs">
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={newDocumentCopro.type}
            onChange={handleInputchange}
          />
          <div className="form-buttons">
            {selectedDocumentCopro ? (
              <>
                <button onClick={handleUpdateDocumentCopro}>Update</button>
                <button onClick={handleCanelUpdateDocumentCopro}>Canel</button>
              </>
            ) : (
              <button onClick={handleAddDocumentCopro}>Add New DocumentCopro</button>
            )}
          </div>
        </div>
      </div>

      {/* Type iany de on peut fair sans view */}
      <ul className="student-list">
        {documentcopro.map((documentcopro) => (
          <li key={documentcopro.id}>
            <div>
              <strong>
                {documentcopro.type}
              </strong>
            </div>
            <div className="actions">
              <button
                className="view"
                onClick={() => handleViewClick(documentcopro.id)}
              >
                View
              </button>
              <button className="edit" onClick={() => handleEditclick(documentcopro)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteDocumentCopro(documentcopro.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Single View */}
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

export default DocumentCopro;

