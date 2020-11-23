import React from 'react';

const Navbar = (props) => {
    return ( 
    <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">SymReact</a>
      </div>
  
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
         
          <li><a href="#">Clients</a></li>
          <li><a href="#">Factures</a></li>
        </ul>
       
        <ul className="nav navbar-nav navbar-right">
         
          <li><a href="#">Inscription</a></li>
          <li><a href="#" className="btn btn-success">Connexion</a></li>
          <li><a href="#" className="btn btn-danger">Déconnexion</a></li>
        </ul>
      </div>
    </div>
  </nav> );
}
 
export default Navbar;