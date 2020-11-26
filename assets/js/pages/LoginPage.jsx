import React, {useContext, useState} from 'react';
import axios from'axios';
import AuthApi from '../services/AuthApi';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import { toast } from 'react-toastify';



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
            toast.success("Vous êtes connecté :D");
            history.replace("/customers");
        }catch(error){

            setError("Adresse email invalide et / ou introuvable");
    
        }

    }
    return ( <>
        <h1>Authentification</h1>

        <form onSubmit={handleSubmit}>

            <Field label="Adresse Email" type="email" value={credentials.username} onChange={ handleChange} 
                        name="username" placeholder="Adresse Email de connexion" error={error}/>
            
            <Field label="Mot de passe" type="password" value={credentials.password} onChange={ handleChange} 
                        name="password" placeholder="Mot de passe" error=""/>
            
            <div className="form-group">
                <button type="submit" className="btn btn-success">Se connecter</button>
            </div>
        </form>
    </> );
}
 
export default LoginPage;