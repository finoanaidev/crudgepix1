import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

function Lot() {
  const [lot, setLot] = useState([]);
  const [newLot, setNewLot] = useState({
    copropriete: "",
    coproprietaire: "",
    surface: "",
    document: "",
    autre: "",
  });
  const [selectedLot, setSelectedLot] = useState(null);
  const [toView, setToView] = useState({
    copropriete: "",
    coproprietaire: "",
    surface: "",
    document: "",
    autre: "",
  });
  const [openView, setOpenView] = useState(false);
  const [copropriete, setCopropriete] = useState([]);
  const [coproprietaire, setCoproprietaire] = useState([]);
  const [document, setDocument] = useState([]);
  useEffect(() => {
    fetchLot();
    fetchCopropriete(); // Appel de la fonction pour récupérer les coproprietaires
    fetchCoproprietaire();
    fetchDocument();
  }, []);

  const fetchLot = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/lot");
      setLot(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCopropriete = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/copropriete");
      setCopropriete(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCoproprietaire = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/coproprietaire");
      setCoproprietaire(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDocument = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/document");
      setDocument(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewLot({ ...newLot, [e.target.name]: e.target.value });
  };

  const handleAddLot = () => {
    axios
      .post("http://127.0.0.1:8000/api/lot/", newLot)
      .then((response) => {
        setLot([...lot, response.data]);
        setNewLot({
          copropriete: "",
          coproprietaire: "",
          surface: "",
          document: "",
          autre: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };
  
  const handleViewClick = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/lot/${id}/`
    );
    setToView(response.data);
    setOpenView(true); 
  };
  
  const handleEditClick = (lot) => {
    setSelectedLot(lot);
    setNewLot(lot);
  };

  const handleUpdateLot = () => {
    axios
      .put(`http://127.0.0.1:8000/api/lot/${selectedLot.id}/`, newLot)
      .then((response) => {
        fetchLot();
        setNewLot({
          copropriete: "",
          coproprietaire: "",
          surface: "",
          document: "",
          autre: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };

  const handleCancelUpdateLot = () => {
    setSelectedLot(null);
    setNewLot({
      copropriete: "",
      coproprietaire: "",
      surface: "",
      document: "",
      autre: "",
    });
  };

  const handleDeleteLot = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/lot/${id}/`)
      .then((response) => {
        fetchLot();
        setNewLot({
          copropriete: "",
          coproprietaire: "",
          surface: "",
          document: "",
          autre: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };

  return (
    <div className="app-container">
      <h1>Système de gestion de Lot</h1>
      <div className="form-container">
        <div className="form-inputs">
        <select
            name="copropriete"
            value={newLot.copropriete}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez un copropriete</option>
            {copropriete.map((copropriete) => (
              <option key={copropriete.id} value={copropriete.id}>
                {copropriete.id}
              </option>
            ))}
          </select>
          <select
            name="coproprietaire"
            value={newLot.coproprietaire}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez un coproprietaire</option>
            {coproprietaire.map((coproprietaire) => (
              <option key={coproprietaire.id} value={coproprietaire.id}>
                {coproprietaire.id}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="surface"
            placeholder="surface"
            value={newLot.surface}
            onChange={handleInputChange}
          />
          <select
            name="document"
            value={newLot.document}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez un document</option>
            {document.map((document) => (
              <option key={document.id} value={document.id}>
                {document.id}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="autre"
            placeholder="Autre"
            value={newLot.autre}
            onChange={handleInputChange}
          />

          <div className="form-buttons">
            {selectedLot ? (
              <>
                <button onClick={handleUpdateLot}>Update</button>
                <button onClick={handleCancelUpdateLot}>Cancel</button>
              </>
            ) : (
              <button onClick={handleAddLot}>Add New Coproprietaire</button>
            )}
          </div>
        </div>
      </div>

      <ul className="student-list">
        {lot.map((lot) => (
          <li key={lot.id}>
            <div>
              <strong>
                {lot.copropriete} {lot.coproprietaire} {lot.surface} {lot.document} {lot.autre} 
              </strong>

            </div>
            <div className="actions">
              <button
                className="view"
                onClick={() => handleViewClick(lot.id)}
              >
                View
              </button>
              <button className="edit" onClick={() => handleEditClick(lot)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteLot(lot.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {openView && (
  <>
    <div className="outer-box">
      <strong>
        {toView.copropriete} {toView.coproprietaire} {toView.surface} {toView.document} {toView.autre}
      </strong>{" "}
      <br />
      <span>Surface : {toView.surface}</span> <br />
      <span>Document : {toView.document}</span> <br />
      <span>Autre : {toView.autre}</span> <br />
    </div>
    <button onClick={() => setOpenView(false)}>close</button>
  </>
)}
    </div>
  );
}

export default Lot;

