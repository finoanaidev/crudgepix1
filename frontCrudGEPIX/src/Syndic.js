

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

function App() {
  const [syndic, setSyndic] = useState([]);
  const [newSyndic, setNewSyndic] = useState({
    nom: "",
    prenom: "",
    mail: "",
    telephone: "",
    copropriete_gere: "",
  });
  const [selectedSyndic, setSelectedSyndic] = useState(null);
  const [toView, setToView] = useState({
    nom: "",
    prenom: "",
    mail: "",
    telephone: "",
    copropriete_gere: "",
  });
   // Initialisation corrigée
  const [openView, setOpenView] = useState(false);

  // Exécution de useEffect avec un tableau de dépendances vide pour s'exécuter une seule fois lors du montage du composant
  useEffect(() => {
    fetchSyndic();
  }, []);

  const fetchSyndic = async () => { // Utilisation de async
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/syndic");
      setSyndic(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputchange = (e) => {
    setNewSyndic({ ...newSyndic, [e.target.name]: e.target.value });
  };

  const handleAddSyndic = () => {
    axios
      .post("http://127.0.0.1:8000/api/syndic/", newSyndic)
      .then((response) => {
        setSyndic([...syndic, response.data]);
        setNewSyndic({
          nom: "",
          prenom: "",
          mail: "",
          telephone: "",
          copropriete_gere: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleViewClick = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/syndic/${id}/`
    );
    setToView(response.data);
    setOpenView(true); 
  };
  const handleEditclick = (syndic) => {
    setSelectedSyndic(syndic);
    setNewSyndic(syndic);
  };

  const handleUpdateSyndic = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/syndic/${selectedSyndic.id}/`, newSyndic)
      .then((response) => {
        fetchSyndic();
        setNewSyndic({
          nom: "",
          prenom: "",
          mail: "",
          telephone: "",
          copropriete_gere: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleCanelUpdateSyndic = () => {
    setSelectedSyndic(null);
    setNewSyndic({
      nom: "",
      prenom: "",
      mail: "",
      telephone: "",
      copropriete_gere: "",
    });
  };

  const handleDeleteSyndic = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/syndic/${id}/`)
      .then((response) => {
        fetchSyndic();
        setNewSyndic({
          nom: "",
          prenom: "",
          mail: "",
          telephone: "",
          copropriete_gere: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app-container">
      <h1>Système de gestion de Syndic</h1>
      <div className="form-container">
        <div className="form-inputs">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={newSyndic.nom}
            onChange={handleInputchange}
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prenom"
            value={newSyndic.prenom}
            onChange={handleInputchange}
          />
          <input
            type="text"
            name="nom"
            placeholder="First name"
            value={newSyndic.nom}
            onChange={handleInputchange}
          />
          <input
            type="mail"
            name="mail"
            placeholder="Mail"
            value={newSyndic.mail}
            onChange={handleInputchange}
          />
          <input
            type="number"
            name="telephone"
            placeholder="telephone"
            value={newSyndic.telephone}
            onChange={handleInputchange}
          />
          <input
            type="text"
            name="copropriete_gere"
            placeholder="Copropriete_gere"
            value={newSyndic.copropriete_gere}
            onChange={handleInputchange}
          />
          <div className="form-buttons">
            {selectedSyndic ? (
              <>
                <button onClick={handleUpdateSyndic}>Update</button>
                <button onClick={handleCanelUpdateSyndic}>Canel</button>
              </>
            ) : (
              <button onClick={handleAddSyndic}>Add New Syndic</button>
            )}
          </div>
        </div>
      </div>

      {/* Syndic List */}
      <ul className="student-list">
        {syndic.map((syndic) => (
          <li key={syndic.id}>
            <div>
              <strong>
                {syndic.nom} {syndic.prenom}
              </strong>
            </div>
            <div className="actions">
              <button
                className="view"
                onClick={() => handleViewClick(syndic.id)}
              >
                View
              </button>
              <button className="edit" onClick={() => handleEditclick(syndic)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteSyndic(syndic.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Single View */}
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
          </div>
          <button onClick={() => setOpenView(false)}>close</button>
        </>
      )}
    </div>
  );
}

export default App;

