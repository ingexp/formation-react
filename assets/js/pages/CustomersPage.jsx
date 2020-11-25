
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import CustomersApi from '../services/CustomersApi';

const CustomersPage = (props) => {
    
const [customers, setCustomers] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [search, setSearch] = useState('');


const recupererClients = async() => {

    try{

        const data = await  CustomersApi.findAll();
        setCustomers(data);
    }catch(error){

        console.log(error.response)
    }

}
useEffect( ()=>{


    recupererClients();

    /*CustomersApi.findAll()
        .then(data => setCustomers(data))
        .catch(error => console.log(error.response));
    */
    },[]);


const handleDelete = async id => {
    const origanaleTable = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id ))

    try{

        await CustomersApi.delete(id);

    }catch(error){

        setCustomers(origanaleTable);
        console.log(error.response);

    }

  /*  CustomersApi.delete(id)
        .catch(error => {
            setCustomers(origanaleTable);
            console.log(error.response);
        });*/
}

const handleCurrentPage = (page,pageCount) => {

if(page <= 1 ){
    setCurrentPage(1);
}else if( page >= pageCount )
{
    setCurrentPage(pageCount);
}else{
    setCurrentPage(page);
}

}
const itemPerPage = 10;


const filtredCustomers = customers.filter(c => c.firstName.toLowerCase().includes(search.toLowerCase().trim()) 
                            || c.lastName.toLowerCase().includes(search.toLowerCase().trim())
                            || c.email.toLowerCase().includes(search.toLowerCase().trim())
                            || (c.company && c.company.toLowerCase().includes(search.toLowerCase().trim()))
                            
                            );
const paginatedCustomers = Pagination.getData(filtredCustomers, currentPage, itemPerPage);


const handleSearch = event =>{

    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);

}
    return ( <>
    <h1>Liste des clients</h1>
    <div className="form-group">
            <input className="form-control" type="text" placeholder="Recherche ..." onChange={handleSearch} value={search}/>
        </div>
    <table className="table table-striped" >
      
        <thead>
            
            <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Email</th>
                <th>Entreprise</th>
                <th className="text-center">Factures</th>
                <th className="text-center">Montant total</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { paginatedCustomers.map(customer => <tr key={customer.id}>
                <td>{customer.id}</td>
                <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
                <td>{customer.email}</td>
                <td>{customer.company ? customer.company : "Null"}</td>
                <td className="text-center">
                  <span className="badge badge-primary">
                  {customer.invoices.length}
                    </span>    
                </td>
                <td className="text-center">{customer.totalAmout.toLocaleString()} $</td>
                <td>
                    <button 
                    onClick={ () => handleDelete(customer.id)}
                    disabled = {customer.invoices.length > 0 }  
                    className="btn btn-sm btn-danger"
                    >Supprimer</button></td>
            </tr> )}
            
        </tbody>

    </table>

    <Pagination currentPage={currentPage} itemPerPage = {itemPerPage} length={filtredCustomers.length} onPageChanged = {handleCurrentPage} />

 
    </> );
}
 
export default CustomersPage;