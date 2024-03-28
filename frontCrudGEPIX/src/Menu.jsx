import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="menu-container">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to="/" className="nav-link active">Syndic</Link>
        </li>
        <li className="nav-item">
          <Link to="/copropriete" className="nav-link">Copropriété</Link>
        </li>
        <li className="nav-item">
          <Link to="/coproprietaire" className="nav-link">Copropriétaire</Link>
        </li>
        <li className="nav-item">
          <Link to="/lot" className="nav-link">Lot</Link>
        </li>
        <li className="nav-item">
          <Link to="/documentcopro" className="nav-link">Document Copro</Link>
        </li>
        <li className="nav-item">
          <Link to="/document" className="nav-link">Document</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
