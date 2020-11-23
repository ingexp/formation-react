
import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from '../components/Pagination';


const CustomersPageWithApiPagination = (props) => {
    
const [customers, setCustomers] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalItems, setTotalItems] = useState(0);
const itemPerPage = 10;
useEffect(()=>{

    axios.get(`http://127.0.0.1:8000/api/clients?pagination=true&count=${itemPerPage}&page=${currentPage}`)
        .then(response => {
            setCustomers(response.data["hydra:member"]);
      
            setTotalItems(response.data["hydra:totalItems"]);
            
            

        })
       
        .catch(error => console.log(error.response));
    
    },[currentPage]);


const handleDelete = id => {
    const origanaleTable = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id ))
    axios.delete("http://127.0.0.1:8000/api/clients/"+ id)
        .then(response => console.log("ok"))
        .catch(error => {
            setCustomers(origanaleTable);
            console.log(error.response);
        });
}

const handleCurrentPage = (page,pageCount) => {

    setCustomers([]);
if(page <= 1 ){
    setCurrentPage(1);
}else if( page >= pageCount )
{
    setCurrentPage(pageCount);
}else{
    setCurrentPage(page);
}

}




const paginatedCustomers = Pagination.getData(customers, currentPage, itemPerPage);

    return ( <>
    <h1>Liste des clients Api Pagination</h1>
   
    <table className="table table-striped" >
    {customers.length === 0 && (<tr><td>Chargement en cours ...</td></tr>)}
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
            { customers.map(customer => <tr key={customer.id}>
                <td>{customer.id}</td>
                <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
                <td>{customer.email}</td>
                <td>{customer.company}</td>
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

    <Pagination currentPage={currentPage} itemPerPage = {itemPerPage} length={totalItems} onPageChanged = {handleCurrentPage} />

 
    </> );
}
 
export default CustomersPageWithApiPagination;