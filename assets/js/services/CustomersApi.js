import axios from 'axios';

function findAll()
{

    return  axios.get("http://127.0.0.1:8000/api/clients")
    .then(response => response.data["hydra:member"]);
}

function deleteCustomer(id)
{

    return axios.delete("http://127.0.0.1:8000/api/clients/"+ id);
}

function findCustomer(id){

    return axios.get("http://localhost:8000/api/clients/"+ id)
    .then(response => response.data);

}
function updateCustomer(id,customer){

    return axios.put("http://localhost:8000/api/clients/"+id, customer);

}

function createCustomer(customer){

    return axios.post("http://localhost:8000/api/clients", customer);

}
export default {

    findAll,
    delete : deleteCustomer,
    updateCustomer,
    createCustomer,
    findCustomer
}