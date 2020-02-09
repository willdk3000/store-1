import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (

  <React.Fragment>

    <div id="headnav" className="container">
      <nav className="navbar navbar-expand-md">
        <p className="navbar-brand mb-0 h1 text-white"><i className="far fa-address-card"></i> Auth Tester</p>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars" style={{ color: '#FFFFFF' }}></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link text-white" to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              Home
            </Link>
          </div>
        </div>
      </nav>
    </div>

  </React.Fragment>
);

export default Header;