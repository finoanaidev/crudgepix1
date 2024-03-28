import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

function Copropriete() {
  const [copropriete, setCopropriete] = useState([]);
  const [newCopropriete, setNewCopropriete] = useState({
    nom: "",
    adresse: "",
    syndic: "",
    autre_info: "",
    documentcopro: "",
  });
  const [selectedCopropriete, setSelectedCopropriete] = useState(null);
  const [toView, setToView] = useState({
    nom: "",
    adresse: "",
    syndic: "",
    autre_info: "",
    documentcopro: "",
  });
  const [openView, setOpenView] = useState(false);
  const [syndics, setSyndics] = useState([]);
  const [documentcopro, setDocumentcopro] = useState([]); //pour le clé secondaire du document copro

  useEffect(() => {
    fetchCopropriete();
    fetchSyndics(); // Appel de la fonction pour récupérer les syndics
    fetchDocumentcopro(); // Appel de la fonction pour récuperer les document du copropriete
  }, []);

  const fetchCopropriete = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/copropriete");
      setCopropriete(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //fonction syndic
  const fetchSyndics = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/syndic");
      setSyndics(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //fonction document copro
  const fetchDocumentcopro = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/documentcopro"
      );
      setDocumentcopro(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewCopropriete({ ...newCopropriete, [e.target.name]: e.target.value });
  };

  const handleAddCopropriete = () => {
    axios
      .post("http://127.0.0.1:8000/api/copropriete/", newCopropriete)
      .then((response) => {
        setCopropriete([...copropriete, response.data]);
        setNewCopropriete({
          nom: "",
          adresse: "",
          syndic: "",
          autre_info: "",
          documentcopro: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };

  const handleViewClick = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/copropriete/${id}/`
    );
    setToView(response.data);
    setOpenView(true);
  };

  const handleEditClick = (copropriete) => {
    setSelectedCopropriete(copropriete);
    setNewCopropriete(copropriete);
  };

  const handleUpdateCopropriete = () => {
    axios
      .put(
        `http://127.0.0.1:8000/api/copropriete/${selectedCopropriete.id}/`,
        newCopropriete
      )
      .then((response) => {
        fetchCopropriete();
        setNewCopropriete({
          nom: "",
          adresse: "",
          syndic: "",
          autre_info: "",
          documentcopro: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };

  const handleCancelUpdateCopropriete = () => {
    setSelectedCopropriete(null);
    setNewCopropriete({
      nom: "",
      adresse: "",
      syndic: "",
      autre_info: "",
      documentcopro: "",
    });
  };

  const handleDeleteCopropriete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/copropriete/${id}/`)
      .then((response) => {
        fetchCopropriete();
        setNewCopropriete({
          nom: "",
          adresse: "",
          syndic: "",
          autre_info: "",
          documentcopro: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };

  return (
    <div className="app-container">
      <h1>Système de gestion de copropriete</h1>
      <div className="form-container">
        <div className="form-inputs">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={newCopropriete.nom}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={newCopropriete.adresse}
            onChange={handleInputChange}
          />
          <select
            name="syndic"
            value={newCopropriete.syndic}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez un syndic</option>
            {syndics.map((syndic) => (
              <option key={syndic.id} value={syndic.id}>
                {syndic.id}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="autre_info"
            placeholder="Autre info"
            value={newCopropriete.autre_info}
            onChange={handleInputChange}
          />
          <select
            name="documentcopro"
            value={newCopropriete.documentcopro}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez un document</option>
            {documentcopro.map((documentcopro) => (
              <option key={documentcopro.id} value={documentcopro.id}>
                {documentcopro.id}
              </option>
            ))}
          </select>

          <div className="form-buttons">
            {selectedCopropriete ? (
              <>
                <button onClick={handleUpdateCopropriete}>Update</button>
                <button onClick={handleCancelUpdateCopropriete}>Cancel</button>
              </>
            ) : (
              <button onClick={handleAddCopropriete}>
                Add New Copropriete
              </button>
            )}
          </div>
        </div>
      </div>

      <ul className="student-list">
        {copropriete.map((copropriete) => (
          <li key={copropriete.id}>
            <div>
              <strong>{copropriete.nom}</strong>
            </div>
            <div className="actions">
              <button
                className="view"
                onClick={() => handleViewClick(copropriete.id)}
              >
                View
              </button>
              <button
                className="edit"
                onClick={() => handleEditClick(copropriete)}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => handleDeleteCopropriete(copropriete.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {openView && (
        <>
          <div className="outer-box">
            <strong>{toView.nom}</strong> <br />
            <span>Adresse : {toView.adresse}</span> <br />
            <span>Syndic ID : {toView.syndic}</span> <br />{" "}
            <span>Autre_info : {toView.autre_info}</span> <br />
            <span>DocumentCopro : {toView.documentcopro}</span> <br />
          </div>
          <button onClick={() => setOpenView(false)}>close</button>
        </>
      )}
    </div>
  );
}

export default Copropriete;
