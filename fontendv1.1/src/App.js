
import React, { Suspense, lazy} from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import {Loader,Placeholder} from 'rsuite';
import { connect } from 'react-redux'


import AOS from 'aos';
import 'aos/dist/aos.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "video-react/dist/video-react.css"; 
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './App.css';
import './fontawesome'
import './assets/dist/css/adminlte.min.css'
import 'rsuite/dist/styles/rsuite-default.css';

import 'react-jquery-plugin';


import { apiConnect } from './redux/connexion/connectAction';
import { PrivateRoute } from './services/PrivateRoute';


const Accueil = lazy(() => import('./views/Accueil'));
const Login = lazy(() => import('./views/Login/login'));
const Signup = lazy(() => import('./views/Signup/Signup'));
const EventDetails = lazy(() => import('./views/EventsDetails/EventDetails'));
const EntrepriseDetail = lazy(() => import('./views/Entreprise/EntrepriseDetails'));
const Dashboard = lazy(() => import('./views/Dashboard/Dashboard'));



// loader component


const instance = (
    <Loader size="lg" content="Large"backdrop content="Chargement..." vertical />
);


function App(props) {

  AOS.init();

  return (
   <Router>
    <Suspense fallback={<div>{instance} </div>}>
      <Switch>
        <Route path="/" exact component={Accueil} />
        <Route path="/connexion" component={Login} />
        <Route path="/inscription" component={Signup} />

        
        <Route path="/event_details" component={EventDetails} />
        
        <Route path="/entreprise_details" component={EntrepriseDetail} />

        <PrivateRoute path="/dashboard" component={Dashboard} />
      
      
      
      </Switch>
    </Suspense>
    </Router>
  );
}


const mapStateToProps = state => {
  return {
    userConnectData : state.connected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    apiUserConnect : () => dispatch(apiConnect())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
