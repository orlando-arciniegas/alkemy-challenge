import React from "react";
import logo from './assets/images/logo.png';
import './assets/css/App.css';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const {isAuthenticated} = useAuth0();
  return (
   
    <React.Fragment>

        {isAuthenticated ? (
       <div  className="wrapper">
        <Home />
       
        </div>
        ) : (
        <div  className="wrapper">
          <header className="App-header mx-auto">
         
            <img src={logo} className="App-logo rounded-circle mb-4" style={{width: "120px", height: "120px"}} alt="logo"/>
            <Login />

          </header>
        </div>
        )}

    </React.Fragment>
  );
}

export default App;
