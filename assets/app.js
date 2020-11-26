import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from './js/components/navbar';
import PrivateRoute from './js/components/PrivateRoute';
import AuthContext from './js/contexts/AuthContext';
import CustomerPage from './js/pages/CustomerPage';
import CustomersPage from './js/pages/CustomersPage';
import HomePage from './js/pages/HomePage';
import InvoicesPage from './js/pages/InvoicesPage';
import LoginPage from './js/pages/LoginPage';
import RegisterPage from './js/pages/RegisterPage';
import AuthApi from './js/services/AuthApi';
import 'react-toastify/dist/ReactToastify.css';
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';



// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';



AuthApi.setUp();



const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());
    const NavBarWithRouter = withRouter(Navbar);
    const contextValue = {
        isAuthenticated ,
        setIsAuthenticated 
    }
    return <AuthContext.Provider value={contextValue}>
    <HashRouter>
        <NavBarWithRouter />
        <main className="container pt5">
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                
                <PrivateRoute path="/invoices"  component={InvoicesPage} />
                <PrivateRoute path="/customers/:id"  component={CustomerPage} />
                <PrivateRoute path="/customers"  component={CustomersPage} />
               
               
                <Route path="/" component={HomePage} />
                

            </Switch>
         
        </main>
    </HashRouter>
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
    </AuthContext.Provider>
}
const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
export default App;