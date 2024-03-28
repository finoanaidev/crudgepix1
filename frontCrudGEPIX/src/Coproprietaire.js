

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

function Coproprietaire() {
  const [coproprietaire, setCoproprietaire] = useState([]);
  const [newCoproprietaire, setNewCoproprietaire] = useState({
    nom: "",
    prenom: "",
    mail: "",
    telephone: "",
    copropriete_gere: "",
    syndic: "",
  });
  const [selectedCoproprietaire, setSelectedCoproprietaire] = useState(null);
  const [toView, setToView] = useState({
    nom: "",
    prenom: "",
    mail: "",
    telephone: "",
    copropriete_gere: "",
    syndic: "",
  });
  const [openView, setOpenView] = useState(false);
  const [syndics, setSyndics] = useState([]);

  useEffect(() => {
    fetchCoproprietaire();
    fetchSyndics(); // Appel de la fonction pour récupérer les syndics
  }, []);

  const fetchCoproprietaire = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/coproprietaire");
      setCoproprietaire(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSyndics = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/syndic");
      setSyndics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewCoproprietaire({ ...newCoproprietaire, [e.target.name]: e.target.value });
  };

  const handleAddCoproprietaire = () => {
    axios
      .post("http://127.0.0.1:8000/api/coproprietaire/", newCoproprietaire)
      .then((response) => {
        setCoproprietaire([...coproprietaire, response.data]);
        setNewCoproprietaire({
          nom: "",
          prenom: "",
          mail: "",
          telephone: "",
          copropriete_gere: "",
          syndic: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };
  
  const handleViewClick = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/coproprietaire/${id}/`
    );
    setToView(response.data);
    setOpenView(true); 
  };
  
  const handleEditClick = (coproprietaire) => {
    setSelectedCoproprietaire(coproprietaire);
    setNewCoproprietaire(coproprietaire);
  };

  const handleUpdateCoproprietaire = () => {
    axios
      .put(`http://127.0.0.1:8000/api/coproprietaire/${selectedCoproprietaire.id}/`, newCoproprietaire)
      .then((response) => {
        fetchCoproprietaire();
        setNewCoproprietaire({
          nom: "",
          prenom: "",
          mail: "",
          telephone: "",
          copropriete_gere: "",
          syndic: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };

  const handleCancelUpdateCoproprietaire = () => {
    setSelectedCoproprietaire(null);
    setNewCoproprietaire({
      nom: "",
      prenom: "",
      mail: "",
      telephone: "",
      copropriete_gere: "",
      syndic: "",
    });
  };

  const handleDeleteCoproprietaire = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/coproprietaire/${id}/`)
      .then((response) => {
        fetchCoproprietaire();
        setNewCoproprietaire({
          nom: "",
          prenom: "",
          mail: "",
          telephone: "",
          copropriete_gere: "",
          syndic: "",
        });
      })
      .catch((error) => console.error(error.response.data)); // Afficher les détails de l'erreur
  };

  return (
    <div className="app-container">
      <h1>Système de gestion de coproprietaire</h1>
      <div className="form-container">
        <div className="form-inputs">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={newCoproprietaire.nom}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prenom"
            value={newCoproprietaire.prenom}
            onChange={handleInputChange}
          />
          <input
            type="mail"
            name="mail"
            placeholder="Mail"
            value={newCoproprietaire.mail}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="telephone"
            placeholder="telephone"
            value={newCoproprietaire.telephone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="copropriete_gere"
            placeholder="Copropriete_gere"
            value={newCoproprietaire.copropriete_gere}
            onChange={handleInputChange}
          />

          <select
            name="syndic"
            value={newCoproprietaire.syndic}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez un syndic</option>
            {syndics.map((syndic) => (
              <option key={syndic.id} value={syndic.id}>
                {syndic.id}
              </option>
            ))}
          </select>

          <div className="form-buttons">
            {selectedCoproprietaire ? (
              <>
                <button onClick={handleUpdateCoproprietaire}>Update</button>
                <button onClick={handleCancelUpdateCoproprietaire}>Cancel</button>
              </>
            ) : (
              <button onClick={handleAddCoproprietaire}>Add New Coproprietaire</button>
            )}
          </div>
        </div>
      </div>

      <ul className="student-list">
        {coproprietaire.map((coproprietaire) => (
          <li key={coproprietaire.id}>
            <div>
              <strong>
                {coproprietaire.nom} {coproprietaire.prenom}
              </strong>

            </div>
            <div className="actions">
              <button
                className="view"
                onClick={() => handleViewClick(coproprietaire.id)}
              >
                View
              </button>
              <button className="edit" onClick={() => handleEditClick(coproprietaire)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteCoproprietaire(coproprietaire.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {openView && (
  <>
    <div className="outer-box">
      <strong>
        {toView.nom} {toView.prenom}
      </strong>{" "}
      <br />
      <span>Mail : {toView.mail}</span> <br />
      <span>Telephone : {toView.telephone}</span> <br />
      <span>Copropriete_gere : {toView.copropriete_gere}</span> <br />
      <span>Syndic ID : {toView.syndic}</span> <br /> {/* Affichage de l'ID du syndic */}
    </div>
    <button onClick={() => setOpenView(false)}>close</button>
  </>
)}
    </div>
  );
}

export default Coproprietaire;

