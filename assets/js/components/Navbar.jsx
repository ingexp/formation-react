import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import AuthApi from '../services/AuthApi';


const Navbar = ({history}) => {

  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  const handleLogout = () => {

    AuthApi.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnecté ");
    history.push("/Login");
  }


    return (  
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className="navbar-brand" to="/">SymReact</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarColor02">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/customers">Clients
         
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/invoices">Factures</NavLink>
      </li>
    
    </ul>
    <form className="form-inline my-2 my-lg-0">
      { ( !isAuthenticated && (<>
      
        <NavLink className="btn btn-secondary my-2 my-sm-0 mr4" to ="/register">Inscription</NavLink>
        <NavLink className="btn btn-success my-2 my-sm-0 mr4" to ="/Login">Connexion</NavLink>
      
      </> )) || ( 
      
      <button className="btn btn-danger my-2 my-sm-0 " onClick={handleLogout}>Déconnexion</button>
      )}
     
      
    </form>
  </div>
</nav>
    );



}
 
export default Navbar;