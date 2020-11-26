import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
const RegisterPage = (props) => {

    const [user,setUser] = useState({
        firstName : "" ,
        lastName : "",
        email : "",
        password: "",
        passwordConfirm: ""
    });
    const [errors,setErrors] = useState({
        firstName : "" ,
        lastName : "",
        email : "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = ({currentTarget}) =>{

        const {name,value} = currentTarget;

        setUser({...user, [name]: value});

    }

    

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};

        if(user.password !== user.passwordConfirm){
            
            apiErrors.passwordConfirm = "Vos mots de passe ne sont pas identiques";
            setErrors(apiErrors);
            return;
        }

        try{

            const data = await Axios.post("http://localhost:8000/api/users", user);
            setErrors({});
            props.history.replace("/login");
           

        }catch(error){
            
            const {violations} = error.response.data;
            if(violations) {

                
                violations.forEach(violation => {

                    apiErrors[violation.propertyPath] = violation.message;

                });

                setErrors(apiErrors);

            }
        }

      
    }
    return (<>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <Field name="firstName" label="Prénom"  placeholder="Votre prénom" 
                    error={errors.firstName} value={user.firstName} onChange={handleChange} />
            <Field name="lastName" label="Nom de famille"  placeholder="Votre nom de famille" 
                    error={errors.lastName} value={user.lastName} onChange={handleChange} />
            <Field name="email" label="Adresse email"  placeholder="Votre email"  type="email"
                    error={errors.email} value={user.email} onChange={handleChange} />
            <Field name="password" label="Mot de passe"  placeholder="Votre mot de passe" type="password"
                    error={errors.password} value={user.password} onChange={handleChange} />
            <Field name="passwordConfirm" label="Confirmer votre mot de passe"  placeholder="Veuillez ressaisir votre mot de passe"  type="password"
                    error={errors.passwordConfirm} value={user.passwordConfirm} onChange={handleChange} />
        <button className="btn btn-success">Enregistrer</button>
        <Link to="/login" className="btn btn-link" >J'ai déjà un compte</Link>
        </form>
    </>  );
}
 
export default RegisterPage;