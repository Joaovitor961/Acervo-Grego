import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">GreekMyth</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/gods">Gods</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/heroes">Heroes</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/monsters">Monsters</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
