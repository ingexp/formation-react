import React, { useEffect,useState } from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';
import moment from 'moment';
import { INVOICES_API } from '../Config';


const STATUS_CLASSES = {
    PAID : 'success',
    CANCELLED : 'danger',
    SENT: 'info'

}
const STATUS_LABELS = {
    PAID : 'payée',
    CANCELLED : 'annulée',
    SENT: 'envoyée'

}
const itemPerPage = 10;
const InvoicesPage = (props) => {

    const formatdate = (str) => moment(str).format('DD/MM/YYYY');
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const recupererInvoices= async()=>{

  
            try{
             const data =  await axios.get(INVOICES_API)
                         .then(reponse => reponse.data["hydra:member"]);

             setInvoices(data)
            }catch(error){

                console.log(error.response);
            }


    }

    useEffect(() => {

        recupererInvoices();

    },[]);


    const handleDelete = async id => {

        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
         try{

            await axios.delete(INVOICES_API+"/"+id);

           

        }catch(error){

            console.log(error.response);
            setInvoices(originalInvoices);
        }
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
    

        const filteredInvoices = invoices.filter(i => 
            i.customer.lastName.toLowerCase().includes(search.toLowerCase().trim()) ||
            i.customer.firstName.toLowerCase().includes(search.toLowerCase().trim()) || 
            i.amout.toString().startsWith(search.toLowerCase().trim()) 
        
        );

        const handleSearch = ({currentTarget}) =>{

            const value = currentTarget.value;
            setSearch(value);
            setCurrentPage(1);
        
        }


        const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemPerPage);
    return ( <>
    <h1>Liste des factures</h1> 
    <div className="form-group">
            <input className="form-control" type="text" placeholder="Recherche ..." onChange={handleSearch} value={search}/>
        </div>
    <table className="table table-striped" >
      
        <thead>
            
            <tr>
                <th>Numéro</th>
                <th>Client</th>
                <th>Date d'envoie</th>
                <th className="text-center">Status</th>
                <th className="text-center">Montant</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {paginatedInvoices.map(invoice => (
                <tr key = {invoice.id}>
                    <td>{invoice.chrono}</td>
                    <td><a href="#">{invoice.customer.firstName}&nbsp;{invoice.customer.lastName}</a></td>
                    <td>{ formatdate(invoice.sentAt)}</td>
                    <td className="text-center"><button className={"btn btn-sm btn-" + STATUS_CLASSES[invoice.status]}>{ STATUS_LABELS[invoice.status]}</button></td>
                    <td className="text-center">{invoice.amout.toLocaleString()} $</td>
                    <td>
                        <button className="btn btn-sm btn-primary">Modifier</button>&nbsp;
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                    </td>
            </tr>
            ))}
            
        </tbody>
        </table>

        <Pagination currentPage={currentPage} itemPerPage = {itemPerPage} length={invoices.length} onPageChanged = {handleCurrentPage} />

    </>);
}
 
export default InvoicesPage;