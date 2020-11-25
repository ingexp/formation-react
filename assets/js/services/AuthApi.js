import axios from 'axios';
import jwtDecode from 'jwt-decode';


function logout(){

    window.localStorage.removeItem("Authtoken");
    delete axios.defaults.headers["Authorization"] ;
}

function authenticate(credentials)
{

    
            return  axios.post("http://127.0.0.1:8000/api/login_check", credentials)
            .then(response => response.data.token)
            .then(token => {


                window.localStorage.setItem("Authtoken", token);
                axios.defaults.headers["Authorization"] = "Bearer "+ token;

            })
           ;


           
           

}

function isAuthenticated(){

    const token = window.localStorage.getItem("Authtoken");
    if(token){
            const {exp} = jwtDecode(token);
            if(exp * 1000 > new Date().getTime()){

                axios.defaults.headers["Authorization"] = "Bearer "+ token;
                return true


            }
            return false;
    }   

    return false;

}

function setUp(){

    const token = window.localStorage.getItem("Authtoken");
    if(token){
            const {exp} = jwtDecode(token);
            if(exp * 1000 > new Date().getTime()){

                axios.defaults.headers["Authorization"] = "Bearer "+ token;


            }
    
    }
}

export default {

    authenticate,
    logout,
    setUp,
    isAuthenticated
}