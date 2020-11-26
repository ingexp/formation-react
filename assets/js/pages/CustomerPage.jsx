import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import CustomersApi from '../services/CustomersApi';

const CustomerPage = ({history, match}) => {
    const {id = "new"} = match.params;
   
    const [customer, setCustomer] = useState({
        lastName : "",
        firstName: "",
        email: "",
        company: ""

    });
    const handleChange = ({currentTarget}) =>{

        const {name,value} = currentTarget;

        setCustomer({...customer, [name]: value});

    }
    const [errors,setErrors] = useState({
        lastName : "",
        firstName: "",
        email: "",
        company: ""
    });

    const [editing,setEditing] = useState(false);
    const recupererClients = async id => {
                try{
                 
                    const {lastName,firstName,email,company} =  await CustomersApi.findCustomer(id);
                    setCustomer({lastName,firstName,email,company});
                }catch(error){

                    console.log(error.response);
                    history.replace("/customers");
                }
              
               
    }

    useEffect( () => {

        if( id !== "new")
        {
             setEditing(true);
             recupererClients(id);
        }else{

            setEditing(false);
        }
    },[id]);
   


    const handleSubmit = async event =>{

        event.preventDefault();
        try{
            if(editing){
                 await CustomersApi.updateCustomer(id,customer);
                 
                
            }else{
                await CustomersApi.createCustomer(customer);
                
                

            }
            setErrors({});
            history.replace("/customers");
           

        }catch({response}){
            const {violations} = response.data;
           if(violations){

            const apiErrors = {};

           violations.forEach(({propertyPath, message}) => {

                apiErrors[propertyPath] =message;

            });
            setErrors(apiErrors);
           }
        }

    }
    
    return ( <>
        {!editing ? <h1> Création d'un client</h1> : <h1> Modification du client</h1> }

        <form onSubmit={handleSubmit}>

        <Field name="lastName" label="Nom de famille " placeholder="Nom de famille" 
                value={customer.lastName} onChange={handleChange} error={errors.lastName} />
        <Field name="firstName" label="Prénom" placeholder="Prénom du client" 
                value={customer.firstName} onChange={handleChange} error={errors.firstName}/>
        <Field name="email" label="email " placeholder="Adresse email du client" type="email" 
                value={customer.email} onChange={handleChange} error={errors.email}/>
        <Field name="company" label="Entreprise" placeholder="L'Entreprise du client" 
                value={customer.company} onChange={handleChange} error={errors.company}/>

        <div className="form-roup">

        <button className="btn btn-success" type="submit">Ajouter</button>
        <Link to="/customers" className="btn btn-link" >Retour à la liste des clients</Link>
        </div>
        </form>
    </> );
}
 
export default CustomerPage;