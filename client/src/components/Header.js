import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (

  <React.Fragment>

    <div id="headnav" className="container">
      <nav className="navbar navbar-expand-md">
        <i className="far fa-credit-card" style={{ textDecoration: 'none', color: '#FFFFFF' }}></i>
        <Link className="nav-item nav-link text-white" to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Store Tester</Link>
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