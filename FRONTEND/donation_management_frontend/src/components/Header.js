import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg flex-column bg-primary">
            <h1 style={{color: "white" }}>Forever Caring Corner</h1>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/donorDashboard" className='nav-link'>Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/allDonors" className='nav-link'>Donors</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/allDonations" className='nav-link'>Donations</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Contact Us
                            </a>
                            <ul className="dropdown-menu">
                                <Link to="/contactUs" className='nav-link'>Contact Us</Link>
                                <li><hr class="dropdown-divider"></hr></li>
                                <Link to="/aboutUs" className='nav-link'>About Us</Link>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/help" className='nav-link'>Help</Link>
                        </li>
                    </ul>
                    <form className="d-flex" id="searchForm" role="search">
                        <input className="form-control me-2 btn-outline-light" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header;