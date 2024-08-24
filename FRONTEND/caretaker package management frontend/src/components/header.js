import React from "react";
import { Link } from 'react-router-dom';
import logoImage from './logo.jpg';
import './header.css'; // Assuming this file contains styles for the header

function Header() {
  return (
    <div>
      {/* Blue color rectangle */}
      <div className="blue-rectangle"><p className="rectangle-text">Forever Caring Corner</p></div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img src={logoImage} alt="Logo" className="logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/UserReport" className="nav-link">Caretaker Report</Link>
            </li>
            <li className="nav-item">
              <Link to="/packageReport" className="nav-link">Standard Package Report</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Create
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/add" className="dropdown-item">Create Caretakers</Link>
                <Link to="/add1" className="dropdown-item">Create New Packages</Link>
              </div>        
              
            </li>
            <li className="rectangle-text"><h1>Forever Caring Corner</h1></li>

          </ul>
          
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Header;
