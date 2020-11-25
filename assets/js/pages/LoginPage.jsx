import React, {useContext, useState} from 'react';
import axios from'axios';
import AuthApi from '../services/AuthApi';
import AuthContext from '../contexts/AuthContext';
const LoginPage = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({

        username:"",
        password:""
    });
    
  
     const handleChange= ({currentTarget}) =>{

        setCredentials({
            ...credentials,
            [currentTarget.name] : currentTarget.value
        })

    }

    const [error, setError] = useState('');

    const handleSubmit = async event =>{

        event.preventDefault();
        
        try{


            await AuthApi.authenticate(credentials);
            
            setError("");
            setIsAuthenticated(true);
            history.replace("/customers");
        }catch(error){

            setError("Adresse email invalide et / ou introuvable");
    
        }

    }
    return ( <>
        <h1>Authentification</h1>

        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="username">Adresse Email</label>
                <input type="email" 
                    value={credentials.username}
                    onChange={ handleChange}
                    className= { "form-control" + (error  && " is-invalid") }
                    id="username" 
                    name="username" 
                    placeholder="Adresse Email de connexion"
                    
                    />
                   { error && <p className="invalid-feedback">{error}</p>  }
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" 
                    value={credentials.password}
                    onChange={ handleChange}
                    className="form-control" 
                    id="password" 
                    name="password" 
                    placeholder="Mot de passe"
                    />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success">Se connecter</button>
            </div>
        </form>
    </> );
}
 
export default LoginPage;